import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";


export async function POST(request) {
  try {
    const {  name,email,password,role,contact,dob} = await request.json();
    console.log(name,email,password,role,contact,dob)

    // Validate the input
    if (!email || !password || !name || !role || !dob || !contact) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to the database
    await connectToDatabase();

    // Check if the email or username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists." },
        { status: 409 }
      );
    }

    // Generate a new user_id
    const lastUser = await User.findOne().sort({ userId: -1 });
    
    function generateTicketId() {
      const date = new Date();
    
      // Extract year, month, and day as strings
      const year = date.getFullYear().toString().slice(2); // Last two digits of the year
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month, zero-padded
      const day = date.getDate().toString().padStart(2, '0'); // Day, zero-padded
    
      // Generate a unique sequence number (e.g., based on the current time)
      const sequence = Date.now().toString().slice(-5); // Last 5 digits of current timestamp
    
      // Combine all components into a number
      const ticketId = `${year}${month}${day}${sequence}`;
      
      return Number(ticketId); // Convert to a number
    }
    // Create a new user
    const newUser = await User.create({
      userId: generateTicketId(),
      name,
      email,
      password: hashedPassword,
      role,
      contact,
      location:"",
      skills:  [], // Default to an empty array if not provided
      education: [], // Default to an empty array if not provided
      workExperience:  [], // Default to an empty array if not provided
      certifications:  [], // Default to an empty array if not provided
      portfolioLinks: {
        github: "",
        linkedin: "",
        website: "",
      }, 
      address:"",
      dob,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json({
      success: true,
      message: "User and customer created  successfully!",
    });
  } catch (error) {
    console.error("Error during sign-up:", error.stack || error);
    return NextResponse.json(
      { success: false, message: "Sign-up failed. Try again." },
      { status: 500 }
    );
  }
}
