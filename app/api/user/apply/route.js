import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import Application from "@/lib/models/application";

export async function POST(request) {
  try {
    await connectToDatabase();
    console.log("db connected");

    const body = await request.json(); 
   
    const { userId,jobId,employerId } = body;
   
    const application = new Application({
        userId,
        jobId,
        employerId,
    });

    await application.save();

    return NextResponse.json({
        success: true,
        message: "User found successfully",
    });
  } catch (error) {
    console.error("Error checking user fields:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}