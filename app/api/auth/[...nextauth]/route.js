import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { setCookie } from "cookies-next"; 
const SECRET_KEY = process.env.NEXTAUTH_SECRET || "your_secret_key";
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "email", type: "email", placeholder: "example@example.com" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        console.log("hi")
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
    
        // Ensure database connection
        await connectToDatabase();
    
        // Fetch the user by email
        const user = await User.findOne({ email: credentials.email });
        console.log(user.role)
        
        if (!user) {
          throw new Error("Invalid email or password");
        }
        
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }
        console.log("hi")
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role, // Pass the role here
        };
      },
    }),
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role; // Add the role to the token
      }
      return token;
    },
    async session({ session, token }) {
      // Include user details in the session object
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: SECRET_KEY,
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",

  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
