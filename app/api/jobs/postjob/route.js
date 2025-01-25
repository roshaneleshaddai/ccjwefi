import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Job from "@/lib/models/job";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    console.log(body);

    // Validate required fields
    // const requiredFields = [
    //   "employerId",
    //   "jobTitle",
    //   "jobDescription",
    //   "jobLocation",
    //   "employmentType",
    //   "industry",
    //   "minSalary",
    //   "maxSalary", // Adding salary fields for validation
    // ];

    // for (const field of requiredFields) {
    //   if (!body[field]) {
    //     return NextResponse.json(
    //       { message: `Missing required field: ${field}` },
    //       { status: 400 }
    //     );
    //   }
    // }

    // Connect to the database
    await connectToDatabase();
    console.log("db connected");

    // Generate unique jobId
    const jobId = uuidv4();

    // Create a new job document
    
    const newJob = await Job.create({
      jobId,
      employerId: body.employerId,
      title: body.jobTitle,
      description: body.jobDescription,
      location: body.jobLocation,
      type: body.employmentType,
      industry: body.industry,
      skillsRequired: body.skills || [],
      experienceRequired: body.experienceRequired || "Not specified",
      salaryRange: {
        min: body.minSalary,
        max: body.maxSalary,
      },
      applicationDeadline: body.applicationDeadline || null,
      companyName: body.companyName,
    });

    return NextResponse.json(
      { message: "Job posted successfully!", job: newJob },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error posting job:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
