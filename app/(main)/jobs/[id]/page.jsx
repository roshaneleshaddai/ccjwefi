'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { toast,ToastContainer } from 'react-toastify';

const JobDetailsPage = () => {
  const params = useParams();
  const { id } = params;
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [apply,setApply] = useState(false);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  
  console.log("Job ID from URL:", id);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/api/jobs/fetchjob?id=${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setJob(data.job);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!job) {
    return <div className="text-center mt-10">Loading...</div>;
  }

const router = useRouter();

const handleApplyWithOneClick= async (jobId,employerId) => {
    setApply(true);
    try {
        const session = await fetch("/api/auth/session").then((res) => res.json());
        const res = await fetch("/api/user/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session?.user?.id, jobId,employerId }),
        });

        if (!res.ok) throw new Error("Failed to fetch profile")
        else{
            toast.success("Successfully applied to job and redirected to jobs page");
            await new Promise(resolve => setTimeout(resolve, 5000));
            router.push("/jobs");
    }

        const data = await res.json();
        
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
};

// const handleApplyWithOneClick = async () => {
//     try {
//         const response = await fetch(`/api/jobs/apply?id=${id}`, {
//             method: 'POST',
//         });
//         if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//         }
//         alert(`Successfully applied to job: ${job.title}`);
//     } catch (err) {
//         alert(`Failed to apply: ${err.message}`);
//     }
// };

return (
    <div className="w-full mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl">
        <ToastContainer/>
        <h1 className="text-4xl font-bold text-blue-600 mb-6">{job.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Job Details */}
            <div>
                <p className="text-lg text-gray-700 mb-2">
                    <strong>Location:</strong> {job.location}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                    <strong>Job Type:</strong> {job.type}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                    <strong>Industry:</strong> {job.industry}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                    <strong>Experience Required:</strong> {job.experienceRequired}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                    <strong>Salary Range:</strong> ${job.salaryRange.min} - ${job.salaryRange.max} per year
                </p>
            </div>

            {/* Employer Details */}
            <div>
                <p className="text-lg text-gray-700 mb-2">
                    <strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                    <strong>Application Deadline:</strong>{' '}
                    {new Date(job.applicationDeadline).toLocaleDateString()}
                </p>
            </div>
        </div>

        {/* Skills Required */}
        <div className="mt-6">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Skills Required</h2>
            <ul className="list-disc pl-6">
                {job.skillsRequired.map((skill, index) => (
                    <li key={index} className="text-lg text-gray-700">
                        {skill}
                    </li>
                ))}
            </ul>
        </div>

        {/* Job Description */}
        <div className="mt-6">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Job Description</h2>
            <p className="text-lg text-gray-700">{job.description}</p>
        </div>

        {/* Apply Button */}
        <div className="mt-8 gap-4 text-center">
            <button
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                onClick={() => handleApplyWithOneClick(job.jobId,job.employerId)}
            >
                Apply With One Click
            </button>
        </div>
    </div>
);
};

export default JobDetailsPage;
