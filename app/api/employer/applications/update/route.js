import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Application from "@/lib/models/application"; // Your Mongoose schema for applications

export async function POST(request) {
  try {
    const { applicationId, status } = await request.json();
    console.log(applicationId, status);
    if (!applicationId || !status) {
      return NextResponse.json(
        { message: "Application ID and status are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
