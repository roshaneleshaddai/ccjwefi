import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

// Named export for the PUT method
export async function PUT(req) {
  try {
    const body = await req.json(); // Parse the request body
    const { email, ...updateData } = body;

    // Validate email
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Update the user profile
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Match user by email
      { $set: updateData }, // Update the fields dynamically
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the updated user
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
