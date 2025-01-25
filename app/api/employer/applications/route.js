import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Application from "@/lib/models/application";
import User from "@/lib/models/User";
import Job from "@/lib/models/job";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Fetch applications where employerId matches the userId
    const applications = await Application.find({ employerId: userId });

    // Fetch related user and job details using separate queries
    const userIds = applications.map(app => app.userId);
    const jobIds = applications.map(app => app.jobId);

    // Fetch users
    const users = await User.find({ '_id': { $in: userIds } });

    // Fetch jobs
    const jobs = await Job.find({ 'jobId': { $in: jobIds } });

    // Combine the data
    const detailedApplications = applications.map(application => {
      const user = users.find(u => u._id.toString() === application.userId.toString());
      const job = jobs.find(j => j.jobId.toString() === application.jobId.toString());

      return {
        applicationId: application._id,
        status: application.status,
        user: user ? { name: user.name, email: user.email } : null,
        job: job ? { title: job.title, location: job.location } : null,
        appliedAt: application.createdAt,
      };
    });

    return NextResponse.json({
      success: true,
      applications: detailedApplications,
      message: "Fetched applications successfully",
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
