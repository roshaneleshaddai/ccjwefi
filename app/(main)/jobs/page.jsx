'use client'
import React, { useState, useEffect } from "react";
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillAlt, FaClock } from "react-icons/fa";
import Sidebar from "./components/sidebar/page";
import { useRouter } from "next/navigation";

function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const router = useRouter();

  // Function to fetch jobs based on filters
  const fetchJobs = async (filters) => {
    try {
      const response = await fetch("/api/jobs/update-filters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      setJobs(data.jobs); // Update jobs
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Trigger fetch whenever filters change
  useEffect(() => {
    fetchJobs(filters);
  }, [filters]);

  // Update filters from Sidebar
  const handleFilterUpdate = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  return (
    <div className="flex">
      {/* Sidebar for Filters */}
      <div className="w-1/4">
        <Sidebar onFilterUpdate={handleFilterUpdate} />
      </div>

      {/* Job Listings */}
      <div className="w-3/4 max-w-4xl mx-auto p-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="mb-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                <p className="text-gray-600 mt-1">{job.employerId}</p>
              </div>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                Actively hiring
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                {job.location}
              </div>
              <div className="flex items-center">
                <FaBriefcase className="mr-2 text-blue-500" />
                {job.experienceRequired}
              </div>
              <div className="flex items-center">
                <FaMoneyBillAlt className="mr-2 text-blue-500" />
                ₹ {job.salaryRange.min.toLocaleString()} - ₹ {job.salaryRange.max.toLocaleString()}
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2 text-blue-500" />
                {Math.floor((new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24))} days ago
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex space-x-2">
                {job.skillsRequired.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Apply Now
              </button> */}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => router.push(`/jobs/${job.jobId}`)}
            >
              View Details
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobListings;
