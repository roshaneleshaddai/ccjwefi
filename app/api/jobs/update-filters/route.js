import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Job from '@/lib/models/job';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request) {
  try {
    // Ensure the database is connected
    await connectToDatabase();

    // Parse the incoming filters from the request body
    const filters = await request.json();
    const query = {};

    // Add filters dynamically

    // Filter by job title or profile (case-insensitive regex search)
    if (filters.profile) {
      query.title = { $regex: filters.profile, $options: 'i' };
    }

    // Filter by location (case-insensitive regex search)
    if (filters.location) {
      query.location = { $regex: filters.location, $options: 'i' };
    }

    // Handle work-from-home filter by setting location to "Remote"
    if (filters.workFromHome) {
      query.location = 'Remote'; // Assume 'Remote' denotes work-from-home
    }

    // Filter by job type (part-time)
    if (filters.partTime) {
      query.type = 'part-time';
    }

    // Filter by salary range (ensure salary is a number)
    if (filters.salary) {
      query['salaryRange.max'] = { $gte: filters.salary }; 
    }

    // Filter by experience (ensure it’s handled appropriately, if numeric)
    if (filters.experience) {
      query.experienceRequired = filters.experience;
    }

    // Query the database for jobs matching the filters
    const jobs = await Job.find(query);

    return NextResponse.json({
      message: 'Jobs fetched successfully',
      jobs,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);

    return NextResponse.json(
      { message: 'Failed to fetch jobs', error: error.message },
      { status: 500 }
    );
  }
}

// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import Job from '@/lib/models/job';
// import { connectToDatabase } from '@/lib/mongodb';

// export async function POST(request) {
//   try {
//     await connectToDatabase(); // Ensure the database is connected

//     const filters = await request.json(); // Parse the incoming filters
//     const query = {};

//     // Add filters dynamically
//     if (filters.profile) {
//       query.title = { $regex: filters.profile, $options: 'i' }; // Case-insensitive regex search
//     }
//     if (filters.location) {
//       query.location = { $regex: filters.location, $options: 'i' };
//     }
//     if (filters.workFromHome) {
//       query.location = 'Remote'; // Example: assume 'Remote' denotes work from home
//     }
//     if (filters.partTime) {
//       query.type = 'part-time';
//     }
//     if (filters.salary) {
//       query['salaryRange.max'] = { $gte: filters.salary }; 
//     }
//     if (filters.experience) {
//       query.experienceRequired = filters.experience; 
//     }

   
//     const jobs = await Job.find(query);
    
//     return NextResponse.json({
//       message: 'Jobs fetched successfully',
//       jobs,
//     });
//   } catch (error) {
//     console.error('Error fetching jobs:', error);

//     return NextResponse.json(
//       { message: 'Failed to fetch jobs', error: error.message },
//       { status: 500 }
//     );
//   }
// }
