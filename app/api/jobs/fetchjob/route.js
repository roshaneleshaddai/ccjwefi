import { NextResponse } from "next/server";
import Job from "@/lib/models/job";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('id'); // Retrieve the 'id' parameter
    console.log("Job ID from URL:", jobId);

    if (!jobId) {
      return NextResponse.json(
        { message: "Job ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    console.log("Connected to database");
    const job = await Job.findOne({ jobId });
    console.log("Fetched job:", job); // Log the job details

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (error) {
    console.error("Error fetching job details:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
