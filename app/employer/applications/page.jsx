"use client";

import React, { useEffect, useState } from "react";
import { toast,ToastContainer } from "react-toastify";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Fetch user session details
        const session = await fetch("/api/auth/session").then((res) =>
          res.json()
        );

        if (!session?.user?.id) {
          throw new Error("User not authenticated");
        }

        // Fetch applications for the authenticated user
        const response = await fetch("/api/employer/applications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: session.user.id }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        setApplications(data.applications);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      const response = await fetch("/api/employer/applications/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ applicationId, status }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to update application status"); 
      }else{
        setApplications(applications);
        toast.success("Application status updated successfully");
      }

      // Update the local state to reflect the status change
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === applicationId
            ? { ...application, status }
            : application
        )
      );
    } catch (err) {
      console.error("Error updating application status:", err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <ToastContainer/>
      <h1 className="text-xl font-bold mb-4">Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {applications.map((application) => (
            console.log(application),
            <div
              key={application._id}
              className="border p-4 rounded shadow-sm"
            >
              <h2 className="font-bold text-lg">
                {application.job?.title || "No Title"}
              </h2>
              <p className="text-sm text-gray-600">
                Location: {application.job?.location || "N/A"}
              </p>
              <p>
                <strong>Applicant:</strong> {application.user?.name || "Unknown"}
              </p>
              <p>
                <strong>Email:</strong> {application.user?.email || "Unknown"}
              </p>
              <p>
                <strong>Status:</strong> {application.status || "Pending"}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() =>
                    handleUpdateStatus(application.applicationId, "Accepted")
                  }
                >
                  Accept
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() =>
                    handleUpdateStatus(application.applicationId, "Rejected")
                  }
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// export default ApplicationsPage;

// "use client";

// import React, { useEffect, useState } from "react";

// const ApplicationsPage = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         // Fetch user session details
//         const session = await fetch("/api/auth/session").then((res) => res.json());

//         if (!session?.user?.id) {
//           throw new Error("User not authenticated");
//         }

//         // Fetch applications for the authenticated user
//         const response = await fetch("/api/employer/applications", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ userId: session.user.id }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch applications");
//         }

//         const data = await response.json();
//         setApplications(data.applications);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Applications</h1>
//       {applications.length === 0 ? (
//         <p>No applications found.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-4">
//           {applications.map((application) => (
//             <div
//               key={application._id}
//               className="border p-4 rounded shadow-sm"
//             >
//               <h2 className="font-bold text-lg">
//                 {application.job?.title || "No Title"}
//               </h2>
//               <p className="text-sm text-gray-600">
//                 Location: {application.job?.location || "N/A"}
//               </p>
//               <p>
//                 <strong>Applicant:</strong> {application.user?.name || "Unknown"}
//               </p>
//               <p>
//                 <strong>Email:</strong> {application.user?.email || "Unknown"}
//               </p>
//               <p>
//                 <strong>Status:</strong> {application.status || "Unknown"}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApplicationsPage;
