import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(request) {
  try {
    await connectToDatabase();
    console.log("db connected");

    const body = await request.json(); // Parse JSON body from the POST request
   
    const { userId } = body;
   

    if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    console.log(user);
    return NextResponse.json({
        success: true,
        user,
        message: "User found successfully",
    });
  } catch (error) {
    console.error("Error checking user fields:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}