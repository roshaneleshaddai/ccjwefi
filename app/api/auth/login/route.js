
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.NEXTAUTH_SECRET;

export const dynamic = "force-dynamic"

export async function POST(req) {
  try {
    // Connect to the database\
    console.log("hi")
    await connectToDatabase();

    // Parse request body
    const { email, password } = await req.json();
   console.log(email,password)
    // Find user in the database
    const user = await User.findOne({ email:email });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid password" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Handle support agent logic
    const user_id = user.user_id;
    // Generate JWT
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    // Create cookies
    const cookies = [
      serialize("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 3600, // 1 hour
      }),
      serialize("user_id", user_id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 3600, // 1 hour
      }),
    ];

    // Construct the response
    const response = NextResponse.json({ message: "Login successful" });
    cookies.forEach((cookie) => response.headers.append("Set-Cookie", cookie));

    return response;
  } catch (error) {
    console.error("Error in login handler:", error);
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }
}
