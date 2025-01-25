'use client';
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

const predefinedSkills = [
  'React.js', 'Node.js', 'Python', 'Java', 'JavaScript',
  'AWS', 'Azure', 'SQL', 'MongoDB', 'Docker', 'Kubernetes',
];

const initialData = {
  name: '',
  contact: '',
  location: '',
  skills: [],
  education: [],
  workExperience: [],
  certifications: [],
  portfolioLinks: []
};

export default function RenderResume() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { templateId } = params;
  const userId = searchParams.get("id");

  const [userData, setUserData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/user/checkFields', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        const data = await res.json();
        if (res.ok) {
          const safeData = {
            name: data.data.name || '',
            contact: data.data.contact || '',
            location: data.data.location || '',
            skills: Array.isArray(data.data.skills) ? data.data.skills : [],
            education: Array.isArray(data.data.education) 
              ? data.data.education.map(edu => ({
                  institution: edu.institution || '',
                  degree: edu.degree || ''
                })) 
              : [],
            workExperience: Array.isArray(data.data.workExperience) 
              ? data.data.workExperience.map(work => ({
                  company: work.company || '',
                  position: work.position || '',
                  startDate: work.startDate || '',
                  endDate: work.endDate || '',
                  description: work.description || ''
                }))
              : [],
            certifications: Array.isArray(data.data.certifications)
              ? data.data.certifications.map(cert => ({
                  title: cert.title || '',
                  issuer: cert.issuer || '',
                  date: cert.date || ''
                }))
              : [],
            portfolioLinks: Array.isArray(data.data.portfolioLinks) 
              ? data.data.portfolioLinks 
              : []
          };
          setUserData(safeData);
          setEditedData(safeData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (field, index, key, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, [key]: value } : item
      )
    }));
  };

  // Add item handlers
  const handleAddEducation = () => {
    setEditedData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '' }]
    }));
  };

  const handleAddWorkExperience = () => {
    setEditedData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, { 
        company: '', 
        position: '', 
        startDate: '', 
        endDate: '', 
        description: '' 
      }]
    }));
  };

  const handleAddCertification = () => {
    setEditedData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { 
        title: '', 
        issuer: '', 
        date: '' 
      }]
    }));
  };

  const handleAddPortfolioLink = () => {
    setEditedData(prev => ({
      ...prev,
      portfolioLinks: [...prev.portfolioLinks, '']
    }));
  };

  const handleSkillsChange = (selectedSkills) => {
    setEditedData(prev => ({
      ...prev,
      skills: selectedSkills
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, updatedData: editedData }),
      });
      if (res.ok) {
        alert("Resume updated successfully!");
        setUserData(editedData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      const res = await fetch('/api/user/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, templateId, format: "pdf" }),
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      a.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className={`py-6 px-4 md:px-40 text-black bg-gradient-to-r from-indigo-50 to-purple-50 min-h-screen`}>
      <div className="mt-6 flex flex-wrap gap-2 justify-end">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition-all"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-black px-6 py-2 rounded-md shadow hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-600 transition-all"
            >
              Edit
            </button>
            <button
              onClick={handleGeneratePDF}
              className="bg-purple-500 text-white px-6 py-2 rounded-md shadow hover:bg-purple-600 transition-all"
            >
              Generate PDF
            </button>
          </>
        )}
      </div>

      <h1 className="text-3xl font-bold text-center text-indigo-900 mb-6 mt-8">
        Resume {isEditing ? "Edit" : "Preview"}
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Personal Information */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              {isEditing ? (
                <input
                  value={editedData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              ) : (
                <p className="text-gray-800 text-lg">{userData.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              {isEditing ? (
                <input
                  value={editedData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              ) : (
                <p className="text-gray-800 text-lg">{userData.contact}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              {isEditing ? (
                <input
                  value={editedData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              ) : (
                <p className="text-gray-800 text-lg">{userData.location}</p>
              )}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">Skills</h2>
          {isEditing ? (
            <div className="space-y-3">
              <select
                multiple
                value={editedData.skills}
                onChange={(e) => handleSkillsChange([...e.target.selectedOptions].map(o => o.value))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                {predefinedSkills.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500">Hold CTRL/CMD to select multiple skills</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill, index) => (
                <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Education Section */}
        {editedData.education.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-indigo-900 mb-4">Education</h2>
            <div className="space-y-6">
              {editedData.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        value={edu.institution}
                        onChange={(e) => handleArrayInputChange("education", index, "institution", e.target.value)}
                        placeholder="Institution"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                      <input
                        value={edu.degree}
                        onChange={(e) => handleArrayInputChange("education", index, "degree", e.target.value)}
                        placeholder="Degree"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-semibold">{edu.institution}</h3>
                      <p className="text-gray-600">{edu.degree}</p>
                    </div>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={handleAddEducation}
                  className="w-full mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                >
                  + Add Education
                </button>
              )}
            </div>
          </div>
        )}

        {/* Work Experience Section */}
        {editedData.workExperience.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-indigo-900 mb-4">Work Experience</h2>
            <div className="space-y-6">
              {editedData.workExperience.map((work, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        value={work.company}
                        onChange={(e) => handleArrayInputChange("workExperience", index, "company", e.target.value)}
                        placeholder="Company"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                      <input
                        value={work.position}
                        onChange={(e) => handleArrayInputChange("workExperience", index, "position", e.target.value)}
                        placeholder="Position"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="date"
                          value={work.startDate}
                          onChange={(e) => handleArrayInputChange("workExperience", index, "startDate", e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                          type="date"
                          value={work.endDate}
                          onChange={(e) => handleArrayInputChange("workExperience", index, "endDate", e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <textarea
                        value={work.description}
                        onChange={(e) => handleArrayInputChange("workExperience", index, "description", e.target.value)}
                        placeholder="Description"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        rows="3"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-semibold">{work.company}</h3>
                      <p className="text-gray-600">{work.position}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(work.startDate).toLocaleDateString()} - {new Date(work.endDate).toLocaleDateString()}
                      </p>
                      <p className="mt-2 text-gray-600">{work.description}</p>
                    </div>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={handleAddWorkExperience}
                  className="w-full mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                >
                  + Add Work Experience
                </button>
              )}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {editedData.certifications.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-indigo-900 mb-4">Certifications</h2>
            <div className="space-y-6">
              {editedData.certifications.map((cert, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        value={cert.title}
                        onChange={(e) => handleArrayInputChange("certifications", index, "title", e.target.value)}
                        placeholder="Certification Title"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                      <input
                        value={cert.issuer}
                        onChange={(e) => handleArrayInputChange("certifications", index, "issuer", e.target.value)}
                        placeholder="Issuing Organization"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                      <input
                        type="date"
                        value={cert.date}
                        onChange={(e) => handleArrayInputChange("certifications", index, "date", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-semibold">{cert.title}</h3>
                      <p className="text-gray-600">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(cert.date).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={handleAddCertification}
                  className="w-full mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                >
                  + Add Certification
                </button>
              )}
            </div>
          </div>
        )}

        {/* Portfolio Links Section */}
        {editedData.portfolioLinks.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-indigo-900 mb-4">Portfolio Links</h2>
            <div className="space-y-3">
              {editedData.portfolioLinks.map((link, index) => (
                <div key={index}>
                  {isEditing ? (
                    <input
                      value={link}
                      onChange={(e) => handleArrayInputChange("portfolioLinks", index, null, e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  ) : (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      {link}
                    </a>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={handleAddPortfolioLink}
                  className="mt-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                >
                  + Add Portfolio Link
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 'use client';
// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "next/navigation";

// export default function RenderResume() {
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const { templateId } = params;
//   const userId = searchParams.get("id");

//   const [userData, setUserData] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch('/api/user/checkFields', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ userId }),
//         });
//         const data = await res.json();
//         if (res.ok) {
//           const userData = {
//             ...data.data,
//             portfolioLinks: Array.isArray(data.data.portfolioLinks) ? data.data.portfolioLinks : [],
//             certifications: Array.isArray(data.data.certifications) ? data.data.certifications : [],
//             workExperience: Array.isArray(data.data.workExperience) ? data.data.workExperience : [],
//             education: Array.isArray(data.data.education) ? data.data.education : [],
//             skills: Array.isArray(data.data.skills) ? data.data.skills : [],
//           };
//           setUserData(userData);
//           setEditedData(userData);
//         } else {
//           alert(data.error || "Failed to fetch user data.");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchData();
//   }, [userId]);

//   const handleInputChange = (field, value) => {
//     setEditedData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleArrayInputChange = (field, index, key, value) => {
//     setEditedData(prev => ({
//       ...prev,
//       [field]: prev[field].map((item, i) => 
//         i === index ? { ...item, [key]: value } : item
//       )
//     }));
//   };

//   // Add item handlers
//   const handleAddSkill = () => {
//     setEditedData(prev => ({ ...prev, skills: [...prev.skills, ""] }));
//   };

//   const handleAddEducation = () => {
//     setEditedData(prev => ({
//       ...prev,
//       education: [...prev.education, { institution: "", degree: "" }]
//     }));
//   };

//   const handleAddWorkExperience = () => {
//     setEditedData(prev => ({
//       ...prev,
//       workExperience: [...prev.workExperience, { 
//         company: "", 
//         position: "", 
//         startDate: "", 
//         endDate: "", 
//         description: "" 
//       }]
//     }));
//   };

//   const handleAddCertification = () => {
//     setEditedData(prev => ({
//       ...prev,
//       certifications: [...prev.certifications, { 
//         title: "", 
//         issuer: "", 
//         date: "" 
//       }]
//     }));
//   };

//   const handleAddPortfolioLink = () => {
//     setEditedData(prev => ({
//       ...prev,
//       portfolioLinks: [...prev.portfolioLinks, ""]
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const res = await fetch('/api/user/profile', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId, updatedData: editedData }),
//       });
//       if (res.ok) {
//         alert("Resume updated successfully!");
//         setUserData(editedData);
//         setIsEditing(false);
//       } else {
//         alert("Failed to save updates.");
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };

//   const handleGeneratePDF = async () => {
//     try {
//       const res = await fetch('/api/user/export', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId, templateId, format: "pdf" }),
//       });
//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "resume.pdf";
//       a.click();
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     }
//   };

//   if (!userData) return <p className="text-center mt-8 text-gray-600">Loading...</p>;

//   return (
//     <div className={`py-6 px-4 md:px-40 text-black bg-gradient-to-r from-indigo-50 to-purple-50 min-h-screen ${isEditing ? 'border-2 border-blue-400' : ''}`}>
//       <div className="mt-6 flex flex-wrap gap-2 justify-end">
//         {isEditing ? (
//           <>
//             <button
//               onClick={handleSave}
//               className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition-all duration-300"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => setIsEditing(false)}
//               className="bg-gray-300 text-black px-6 py-2 rounded-md shadow hover:bg-gray-400 transition-all duration-300"
//             >
//               Cancel
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() => setIsEditing(true)}
//               className="bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-600 transition-all duration-300"
//             >
//               Edit
//             </button>
//             <button
//               onClick={handleGeneratePDF}
//               className="bg-purple-500 text-white px-6 py-2 rounded-md shadow hover:bg-purple-600 transition-all duration-300"
//             >
//               Generate PDF
//             </button>
//           </>
//         )}
//       </div>

//       <h1 className="text-3xl font-bold text-center text-indigo-900 mb-6 mt-8">
//         Resume {isEditing ? "Edit" : "Preview"}
//       </h1>

//       <div className="max-w-4xl mx-auto space-y-8">
//         {/* Personal Information Section */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//               {isEditing ? (
//                 <input
//                   value={editedData.name}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                 />
//               ) : (
//                 <p className="text-gray-800 text-lg">{userData.name}</p>
//               )}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
//               {isEditing ? (
//                 <input
//                   value={editedData.contact}
//                   onChange={(e) => handleInputChange("contact", e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                 />
//               ) : (
//                 <p className="text-gray-800 text-lg">{userData.contact}</p>
//               )}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//               {isEditing ? (
//                 <input
//                   value={editedData.location}
//                   onChange={(e) => handleInputChange("location", e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                 />
//               ) : (
//                 <p className="text-gray-800 text-lg">{userData.location}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Skills Section */}
//         {(isEditing || editedData.skills.length > 0) && (
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h2 className="text-xl font-semibold text-indigo-900 mb-4">Skills</h2>
//             {isEditing ? (
//               <div className="space-y-3">
//                 {editedData.skills.map((skill, index) => (
//                   <input
//                     key={index}
//                     value={skill}
//                     onChange={(e) => handleArrayInputChange("skills", index, null, e.target.value)}
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                   />
//                 ))}
//                 <button
//                   onClick={handleAddSkill}
//                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                 >
//                   + Add Skill
//                 </button>
//               </div>
//             ) : (
//               <div className="flex flex-wrap gap-2">
//                 {userData.skills.map((skill, index) => (
//                   <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Education Section */}
//         {(isEditing || editedData.education.length > 0) && (
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h2 className="text-xl font-semibold text-indigo-900 mb-4">Education</h2>
//             <div className="space-y-6">
//               {editedData.education.map((edu, index) => (
//                 <div key={index} className="border-l-4 border-indigo-500 pl-4">
//                   {isEditing ? (
//                     <div className="space-y-3">
//                       <input
//                         value={edu.institution}
//                         onChange={(e) => handleArrayInputChange("education", index, "institution", e.target.value)}
//                         placeholder="Institution"
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                       />
//                       <input
//                         value={edu.degree}
//                         onChange={(e) => handleArrayInputChange("education", index, "degree", e.target.value)}
//                         placeholder="Degree"
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                       />
//                     </div>
//                   ) : (
//                     <div>
//                       <h3 className="text-lg font-semibold">{edu.institution}</h3>
//                       <p className="text-gray-600">{edu.degree}</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//               {isEditing && (
//                 <button
//                   onClick={handleAddEducation}
//                   className="w-full mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
//                 >
//                   + Add Education
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Work Experience Section */}
//         {(isEditing || editedData.workExperience.length > 0) && (
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h2 className="text-xl font-semibold text-indigo-900 mb-4">Work Experience</h2>
//             <div className="space-y-6">
//               {editedData.workExperience.map((work, index) => (
//                 <div key={index} className="border-l-4 border-indigo-500 pl-4">
//                   {isEditing ? (
//                     <div className="space-y-3">
//                       <input
//                         value={work.company}
//                         onChange={(e) => handleArrayInputChange("workExperience", index, "company", e.target.value)}
//                         placeholder="Company"
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                       />
//                       <input
//                         value={work.position}
//                         onChange={(e) => handleArrayInputChange("workExperience", index, "position", e.target.value)}
//                         placeholder="Position"
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                       />
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                         <input
//                           type="date"
//                           value={work.startDate?.substring(0, 10)}
//                           onChange={(e) => handleArrayInputChange("workExperience", index, "startDate", e.target.value)}
//                           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                         />
//                         <input
//                           type="date"
//                           value={work.endDate?.substring(0, 10)}
//                           onChange={(e) => handleArrayInputChange("workExperience", index, "endDate", e.target.value)}
//                           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                         />
//                       </div>
//                       <textarea
//                         value={work.description}
//                         onChange={(e) => handleArrayInputChange("workExperience", index, "description", e.target.value)}
//                         placeholder="Description"
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                         rows="3"
//                       />
//                     </div>
//                   ) : (
//                     <div>
//                       <h3 className="text-lg font-semibold">{work.company}</h3>
//                       <p className="text-gray-600">{work.position}</p>
//                       <p className="text-sm text-gray-500">
//                         {new Date(work.startDate).toLocaleDateString()} - {new Date(work.endDate).toLocaleDateString()}
//                       </p>
//                       <p className="mt-2 text-gray-600">{work.description}</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//               {isEditing && (
//                 <button
//                   onClick={handleAddWorkExperience}
//                   className="w-full mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
//                 >
//                   + Add Work Experience
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Certifications Section */}
//         {(isEditing || editedData.certifications.length > 0) && (
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h2 className="text-xl font-semibold text-indigo-900 mb-4">Certifications</h2>
//             <div className="space-y-6">
//               {editedData.certifications.map((cert, index) => (
//                 <div key={index} className="border-l-4 border-indigo-500 pl-4">
//                   {isEditing ? (
//                     <div className="space-y-3">
//                       <input
//                         value={cert.title}
//                         onChange={(e) => handleArrayInputChange("certifications", index, "title", e.target.value)}
//                         placeholder="Certification Title"
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                       />
//                       <input
//                         value={cert.issuer}
//                         onChange={(e) => handleArrayInputChange("certifications", index, "issuer", e.target.value)}
//                         placeholder="Issuing Organization"
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                       />
//                       <input
//                         type="date"
//                         value={cert.date?.substring(0, 10)}
//                         onChange={(e) => handleArrayInputChange("certifications", index, "date", e.target.value)}
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                       />
//                     </div>
//                   ) : (
//                     <div>
//                       <h3 className="text-lg font-semibold">{cert.title}</h3>
//                       <p className="text-gray-600">{cert.issuer}</p>
//                       <p className="text-sm text-gray-500">
//                         {new Date(cert.date).toLocaleDateString()}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//               {isEditing && (
//                 <button
//                   onClick={handleAddCertification}
//                   className="w-full mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
//                 >
//                   + Add Certification
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Portfolio Links Section */}
//         {(isEditing || editedData.portfolioLinks.length > 0) && (
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h2 className="text-xl font-semibold text-indigo-900 mb-4">Portfolio Links</h2>
//             <div className="space-y-3">
//               {editedData.portfolioLinks.map((link, index) => (
//                 <div key={index}>
//                   {isEditing ? (
//                     <input
//                       value={link}
//                       onChange={(e) => handleArrayInputChange("portfolioLinks", index, null, e.target.value)}
//                       placeholder="https://example.com"
//                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//                     />
//                   ) : (
//                     <a
//                       href={link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-indigo-600 hover:underline"
//                     >
//                       {link}
//                     </a>
//                   )}
//                 </div>
//               ))}
//               {isEditing && (
//                 <button
//                   onClick={handleAddPortfolioLink}
//                   className="mt-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
//                 >
//                   + Add Portfolio Link
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }// 'use client';
// // import { useEffect, useState } from "react";
// // import { useParams, useSearchParams } from "next/navigation";

// // export default function RenderResume() {
// //   const params = useParams();
// //   const searchParams = useSearchParams();
// //   const { templateId } = params;
// //   const userId = searchParams.get("id");

// //   const [userData, setUserData] = useState(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editedData, setEditedData] = useState(null);

// //   const [careerObjective, setCareerObjective] = useState("");
// //   const [portfolioLinks, setPortfolioLinks] = useState([]);
// //   const [certifications, setCertifications] = useState([]);
// //   const [workExperience, setWorkExperience] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await fetch('/api/user/checkFields', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ userId }),
// //         });
// //         const data = await res.json();
// //         if (res.ok) {
// //           // Ensure portfolioLinks is an array
// //           const userData = {
// //             ...data.data,
// //             portfolioLinks: Array.isArray(data.data.portfolioLinks) ? data.data.portfolioLinks : [],
// //             certifications: Array.isArray(data.data.certifications) ? data.data.certifications : [],
// //             workExperience: Array.isArray(data.data.workExperience) ? data.data.workExperience : [],
// //             education: Array.isArray(data.data.education) ? data.data.education : [],
// //             skills: Array.isArray(data.data.skills) ? data.data.skills : [],
// //           };
// //           setUserData(userData);
// //           setEditedData(userData);
// //         } else {
// //           alert(data.error || "Failed to fetch user data.");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching user data:", error);
// //       }
// //     };

// //     fetchData();
// //   }, [userId]);

// //   const handleInputChange = (field, value) => {
// //     setEditedData((prev) => ({
// //       ...prev,
// //       [field]: value,
// //     }));
// //   };

// //   const handleArrayInputChange = (field, index, key, value) => {
// //     setEditedData((prev) => ({
// //       ...prev,
// //       [field]: prev[field].map((item, i) =>
// //         i === index ? { ...item, [key]: value } : item
// //       ),
// //     }));
// //   };

// //   const handleSave = async () => {
// //     try {
// //       const res = await fetch('/api/user/profile', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           userId,
// //           updatedData: editedData,
// //         }),
// //       });
// //       if (res.ok) {
// //         alert("Resume updated successfully!");
// //         setUserData(editedData);
// //         setIsEditing(false);
// //       } else {
// //         alert("Failed to save updates.");
// //       }
// //     } catch (error) {
// //       console.error("Error saving data:", error);
// //     }
// //   };

// //   const handleGeneratePDF = async () => {
// //     try {
// //       const res = await fetch('/api/user/export', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           userId,
// //           templateId,
// //           format: "pdf",
// //         }),
// //       });
// //       const blob = await res.blob();
// //       const url = window.URL.createObjectURL(blob);
// //       const a = document.createElement("a");
// //       a.href = url;
// //       a.download = "resume.pdf";
// //       a.click();
// //     } catch (error) {
// //       console.error("Error generating PDF:", error);
// //     }
// //   };

// //   if (!userData) return <p className="text-center mt-8 text-gray-600">Loading...</p>;

// //   const handleAddPortfolioLink = () => {
// //     setPortfolioLinks([...portfolioLinks, ""]);
// //   };

// //   const handlePortfolioChange = (index, value) => {
// //     const updatedLinks = [...portfolioLinks];
// //     updatedLinks[index] = value;
// //     setPortfolioLinks(updatedLinks);
// //   };

// //   const handleAddCertification = () => {
// //     setCertifications([...certifications, { title: "", date: "" }]);
// //   };

// //   const handleCertificationChange = (index, field, value) => {
// //     const updatedCertifications = [...certifications];
// //     updatedCertifications[index][field] = value;
// //     setCertifications(updatedCertifications);
// //   };

// //   const handleAddWorkExperience = () => {
// //     setWorkExperience([...workExperience, { role: "", company: "", duration: "" }]);
// //   };

// //   const handleWorkExperienceChange = (index, field, value) => {
// //     const updatedExperience = [...workExperience];
// //     updatedExperience[index][field] = value;
// //     setWorkExperience(updatedExperience);
// //   };

// //   return (
// //     <div className={`py-6 px-40 text-black bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-lg ${isEditing ? 'border-2 border-blue-400' : ''}`}>
// //       <div className="mt-6 flex space-x-2 justify-end">
// //         {isEditing ? (
// //           <>
// //             <button
// //               onClick={handleSave}
// //               className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition-all duration-300"
// //             >
// //               Save
// //             </button>
// //             <button
// //               onClick={() => setIsEditing(false)}
// //               className="bg-gray-300 text-black px-6 py-2 rounded-md shadow hover:bg-gray-400 transition-all duration-300"
// //             >
// //               Cancel
// //             </button>
// //           </>
// //         ) : (
// //           <>
// //             <button
// //               onClick={() => setIsEditing(true)}
// //               className="bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-600 transition-all duration-300"
// //             >
// //               Edit
// //             </button>
// //             <button
// //               onClick={handleGeneratePDF}
// //               className="bg-purple-500 text-white px-6 py-2 rounded-md shadow hover:bg-purple-600 transition-all duration-300"
// //             >
// //               Generate PDF
// //             </button>
// //           </>
// //         )}
// //       </div>
// //       <h1 className="text-3xl font-bold text-center text-indigo-900 mb-6 mx-20  ">
// //         Resume {isEditing ? "Edit" : "Preview"}
// //       </h1>
// //       <div id="resume-content" className="space-y-6">
// //         {/* Name */}
// //         <div>
// //           <label className="block font-medium text-gray-700">Name:</label>
// //           {isEditing ? (
// //             <input
// //               type="text"
// //               value={editedData.name}
// //               onChange={(e) => handleInputChange("name", e.target.value)}
// //               className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //             />
// //           ) : (
// //             <p className="text-gray-800">{userData.name}</p>
// //           )}
// //         </div>

// //         {/* Contact Information */}
// //         <div>
// //           <label className="block font-medium text-gray-700">Contact:</label>
// //           {isEditing ? (
// //             <input
// //               type="text"
// //               value={editedData.contact}
// //               onChange={(e) => handleInputChange("contact", e.target.value)}
// //               className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //             />
// //           ) : (
// //             <p className="text-gray-800">{userData.contact}</p>
// //           )}
// //         </div>

// //         {/* Location */}
// //         <div>
// //           <label className="block font-medium text-gray-700">Location:</label>
// //           {isEditing ? (
// //             <input
// //               type="text"
// //               value={editedData.location}
// //               onChange={(e) => handleInputChange("location", e.target.value)}
// //               className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //             />
// //           ) : (
// //             <p className="text-gray-800">{userData.location}</p>
// //           )}
// //         </div>

// //         {/* Skills */}
// //         {(isEditing || (editedData.skills && editedData.skills.length > 0)) && (
// //           <div>
// //             <label className="block font-medium text-gray-700">Skills:</label>
// //             {isEditing ? (
// //               <>
// //                 <input
// //                   type="text"
// //                   value={editedData.skills.join(", ")}
// //                   onChange={(e) => handleInputChange("skills", e.target.value.split(","))}
// //                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //                 />
// //                 <button
// //                   onClick={() => handleInputChange("skills", [...editedData.skills, ""])}
// //                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all duration-300"
// //                 >
// //                   Add Skill
// //                 </button>
// //               </>
// //             ) : (
// //               <p className="text-gray-800">{userData.skills.join(", ")}</p>
// //             )}
// //           </div>
// //         )}

// //         {/* Education */}
// //         {(isEditing || (editedData.education && editedData.education.length > 0)) && (
// //           <div>
// //             <h3 className="text-lg font-semibold text-gray-800">Education</h3>
// //             <div className="space-y-4">
// //               {editedData.education.map((edu, index) => (
// //                 <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
// //                   {isEditing ? (
// //                     <>
// //                       <input
// //                         type="text"
// //                         value={edu.institution}
// //                         onChange={(e) => handleArrayInputChange("education", index, "institution", e.target.value)}
// //                         placeholder="Institution"
// //                         className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //                       />
// //                       <input
// //                         type="text"
// //                         value={edu.degree}
// //                         onChange={(e) => handleArrayInputChange("education", index, "degree", e.target.value)}
// //                         placeholder="Degree"
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //                       />
// //                     </>
// //                   ) : (
// //                     <>
// //                       <p className="text-gray-700 font-medium">{edu.institution}</p>
// //                       <p className="text-gray-600">{edu.degree}</p>
// //                     </>
// //                   )}
// //                 </div>
// //               ))}
// //               {isEditing && (
// //                 <button
// //                   onClick={() => handleArrayInputChange("education", editedData.education.length, { institution: "", degree: "" })}
// //                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all duration-300"
// //                 >
// //                   Add Education
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Work Experience */}
// //         {(isEditing || (editedData.workExperience && editedData.workExperience.length > 0)) && (
// //           <div>
// //             <h3 className="text-lg font-semibold text-gray-800">Work Experience</h3>
// //             <div className="space-y-4">
// //               {editedData.workExperience.map((work, index) => (
// //                 <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
// //                   {isEditing ? (
// //                     <>
// //                       <input
// //                         type="text"
// //                         value={work.company}
// //                         onChange={(e) => handleArrayInputChange("workExperience", index, "company", e.target.value)}
// //                         placeholder="Company"
// //                         className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //                       />
// //                       <input
// //                         type="text"
// //                         value={work.position}
// //                         onChange={(e) => handleArrayInputChange("workExperience", index, "position", e.target.value)}
// //                         placeholder="Position"
// //                         className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //                       />
// //                       <input
// //                         type="date"
// //                         value={work.startDate?.substring(0, 10)}
// //                         onChange={(e) => handleArrayInputChange("workExperience", index, "startDate", e.target.value)}
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //                       />
// //                       <input
// //                         type="date"
// //                         value={work.endDate?.substring(0, 10)}
// //                         onChange={(e) => handleArrayInputChange("workExperience", index, "endDate", e.target.value)}
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //                       />
// //                       <textarea
// //                         value={work.description}
// //                         onChange={(e) => handleArrayInputChange("workExperience", index, "description", e.target.value)}
// //                         placeholder="Description"
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //                       />
// //                     </>
// //                   ) : (
// //                     <>
// //                       <p className="text-gray-700 font-medium">{work.company}</p>
// //                       <p className="text-gray-600">{work.position}</p>
// //                       <p className="text-gray-600">{work.startDate} - {work.endDate}</p>
// //                       <p className="text-gray-500">{work.description}</p>
// //                     </>
// //                   )}
// //                 </div>
// //               ))}
// //               {isEditing && (
// //                 <button
// //                   onClick={() => handleArrayInputChange("workExperience", editedData.workExperience.length, { company: "", position: "", startDate: "", endDate: "", description: "" })}
// //                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all duration-300"
// //                 >
// //                   Add Work Experience
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Certifications */}
// //         {(isEditing || (editedData.certifications && editedData.certifications.length > 0)) && (
// //           <div>
// //             <h3 className="text-lg font-semibold text-gray-800">Certifications</h3>
// //             <div className="space-y-4">
// //               {editedData.certifications.map((cert, index) => (
// //                 <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
// //                   {isEditing ? (
// //                     <>
// //                       <input
// //                         type="text"
// //                         value={cert.title}
// //                         onChange={(e) => handleArrayInputChange("certifications", index, "title", e.target.value)}
// //                         placeholder="Title"
// //                         className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //                       />
// //                       <input
// //                         type="text"
// //                         value={cert.issuer}
// //                         onChange={(e) => handleArrayInputChange("certifications", index, "issuer", e.target.value)}
// //                         placeholder="Issuer"
// //                         className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //                       />
// //                       <input
// //                         type="date"
// //                         value={cert.date?.substring(0, 10)}
// //                         onChange={(e) => handleArrayInputChange("certifications", index, "date", e.target.value)}
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //                       />
// //                     </>
// //                   ) : (
// //                     <>
// //                       <p className="text-gray-700 font-medium">{cert.title}</p>
// //                       <p className="text-gray-600">{cert.issuer}</p>
// //                       <p className="text-gray-500">{cert.date}</p>
// //                     </>
// //                   )}
// //                 </div>
// //               ))}
// //               {isEditing && (
// //                 <button
// //                   onClick={() => handleArrayInputChange("certifications", editedData.certifications.length, { title: "", issuer: "", date: "" })}
// //                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all duration-300"
// //                 >
// //                   Add Certification
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Portfolio Links */}
// //         {(isEditing || (editedData.portfolioLinks && editedData.portfolioLinks.length > 0)) && (
// //           <div>
// //             <h3 className="text-lg font-semibold text-gray-800">Portfolio Links</h3>
// //             <div className="space-y-4">
// //               {editedData.portfolioLinks.map((link, index) => (
// //                 <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
// //                   {isEditing ? (
// //                     <input
// //                       type="text"
// //                       value={link}
// //                       onChange={(e) => handleArrayInputChange("portfolioLinks", index, null, e.target.value)}
// //                       placeholder="Portfolio Link"
// //                       className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //                     />
// //                   ) : (
// //                     <p className="text-gray-800">{link}</p>
// //                   )}
// //                 </div>
// //               ))}
// //               {isEditing && (
// //                 <button
// //                   onClick={() => handleArrayInputChange("portfolioLinks", editedData.portfolioLinks.length, "")}
// //                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all duration-300"
// //                 >
// //                   Add Portfolio Link
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Career Objective */}
// //         <div className="mb-6">
// //           <h2 className="text-xl font-semibold mb-2">Career Objective</h2>
// //           <textarea
// //             value={careerObjective}
// //             onChange={(e) => setCareerObjective(e.target.value)}
// //             placeholder="Write your career objective here..."
// //             className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// //           ></textarea>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // // 'use client';
// // // import { useEffect, useState } from "react";
// // // import { useParams, useSearchParams } from "next/navigation";

// // // export default function RenderResume() {
// // //   const params = useParams();
// // //   const searchParams = useSearchParams();
// // //   const { templateId } = params;
// // //   const userId = searchParams.get("id");

// // //   const [userData, setUserData] = useState(null);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [editedData, setEditedData] = useState(null);

// // //   const [careerObjective, setCareerObjective] = useState("");
// // //   const [portfolioLinks, setPortfolioLinks] = useState([]);
// // //   const [certifications, setCertifications] = useState([]);
// // //   const [workExperience, setWorkExperience] = useState([]);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const res = await fetch('/api/user/checkFields', {
// // //           method: 'POST',
// // //           headers: { 'Content-Type': 'application/json' },
// // //           body: JSON.stringify({ userId }),
// // //         });
// // //         const data = await res.json();
// // //         if (res.ok) {
// // //           // Ensure portfolioLinks is an array
// // //           const userData = {
// // //             ...data.data,
// // //             portfolioLinks: Array.isArray(data.data.portfolioLinks) ? data.data.portfolioLinks : [],
// // //             certifications: Array.isArray(data.data.certifications) ? data.data.certifications : [],
// // //             workExperience: Array.isArray(data.data.workExperience) ? data.data.workExperience : [],
// // //             education: Array.isArray(data.data.education) ? data.data.education : [],
// // //             skills: Array.isArray(data.data.skills) ? data.data.skills : [],
// // //           };
// // //           setUserData(userData);
// // //           setEditedData(userData);
// // //         } else {
// // //           alert(data.error || "Failed to fetch user data.");
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching user data:", error);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [userId]);

// // //   const handleInputChange = (field, value) => {
// // //     setEditedData((prev) => ({
// // //       ...prev,
// // //       [field]: value,
// // //     }));
// // //   };

// // //   const handleArrayInputChange = (field, index, key, value) => {
// // //     setEditedData((prev) => ({
// // //       ...prev,
// // //       [field]: prev[field].map((item, i) =>
// // //         i === index ? { ...item, [key]: value } : item
// // //       ),
// // //     }));
// // //   };

// // //   const handleSave = async () => {
// // //     try {
// // //       const res = await fetch('/api/user/profile', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({
// // //           userId,
// // //           updatedData: editedData,
// // //         }),
// // //       });
// // //       if (res.ok) {
// // //         alert("Resume updated successfully!");
// // //         setUserData(editedData);
// // //         setIsEditing(false);
// // //       } else {
// // //         alert("Failed to save updates.");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error saving data:", error);
// // //     }
// // //   };

// // //   const handleGeneratePDF = async () => {
// // //     try {
// // //       const res = await fetch('/api/user/export', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({
// // //           userId,
// // //           templateId,
// // //           format: "pdf",
// // //         }),
// // //       });
// // //       const blob = await res.blob();
// // //       const url = window.URL.createObjectURL(blob);
// // //       const a = document.createElement("a");
// // //       a.href = url;
// // //       a.download = "resume.pdf";
// // //       a.click();
// // //     } catch (error) {
// // //       console.error("Error generating PDF:", error);
// // //     }
// // //   };

// // //   if (!userData) return <p className="text-center mt-8 text-gray-600">Loading...</p>;

// // //   const handleAddPortfolioLink = () => {
// // //     setPortfolioLinks([...portfolioLinks, ""]);
// // //   };

// // //   const handlePortfolioChange = (index, value) => {
// // //     const updatedLinks = [...portfolioLinks];
// // //     updatedLinks[index] = value;
// // //     setPortfolioLinks(updatedLinks);
// // //   };

// // //   const handleAddCertification = () => {
// // //     setCertifications([...certifications, { title: "", date: "" }]);
// // //   };

// // //   const handleCertificationChange = (index, field, value) => {
// // //     const updatedCertifications = [...certifications];
// // //     updatedCertifications[index][field] = value;
// // //     setCertifications(updatedCertifications);
// // //   };

// // //   const handleAddWorkExperience = () => {
// // //     setWorkExperience([...workExperience, { role: "", company: "", duration: "" }]);
// // //   };

// // //   const handleWorkExperienceChange = (index, field, value) => {
// // //     const updatedExperience = [...workExperience];
// // //     updatedExperience[index][field] = value;
// // //     setWorkExperience(updatedExperience);
// // //   };

// // //   return (
// // //     <div className={`py-6 px-40 text-black bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-lg ${isEditing ? 'border-2 border-blue-400' : ''}`}>
// // //       <div className="mt-6 flex space-x-2 justify-end">
// // //         {isEditing ? (
// // //           <>
// // //             <button
// // //               onClick={handleSave}
// // //               className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition-all duration-300"
// // //             >
// // //               Save
// // //             </button>
// // //             <button
// // //               onClick={() => setIsEditing(false)}
// // //               className="bg-gray-300 text-black px-6 py-2 rounded-md shadow hover:bg-gray-400 transition-all duration-300"
// // //             >
// // //               Cancel
// // //             </button>
// // //           </>
// // //         ) : (
// // //           <>
// // //             <button
// // //               onClick={() => setIsEditing(true)}
// // //               className="bg-purple-500 text-white px-6 py-2 rounded-md shadow hover:bg-purple-600 transition-all duration-300"
// // //             >
// // //               Edit
// // //             </button>
// // //             <button
// // //               onClick={handleGeneratePDF}
// // //               className="bg-purple-500 text-white px-6 py-2 rounded-md shadow hover:bg-purple-600 transition-all duration-300"
// // //             >
// // //               Generate PDF
// // //             </button>
// // //           </>
// // //         )}
// // //       </div>
// // //       <h1 className="text-3xl font-bold text-center text-indigo-900 mb-6 mx-20  ">
// // //         Resume {isEditing ? "Edit" : "Preview"}
// // //       </h1>
// // //       <div id="resume-content" className="space-y-6">
// // //         {/* Name */}
// // //         <div>
// // //           <label className="block font-medium text-gray-700">Name:</label>
// // //           {isEditing ? (
// // //             <input
// // //               type="text"
// // //               value={editedData.name}
// // //               onChange={(e) => handleInputChange("name", e.target.value)}
// // //               className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
// // //             />
// // //           ) : (
// // //             <p className="text-gray-800">{userData.name}</p>
// // //           )}
// // //         </div>

// // //         {/* Contact Information */}
// // //         <div>
// // //           <label className="block font-medium text-gray-700">Contact:</label>
// // //           {isEditing ? (
// // //             <input
// // //               type="text"
// // //               value={editedData.contact}
// // //               onChange={(e) => handleInputChange("contact", e.target.value)}
// // //               className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // //             />
// // //           ) : (
// // //             <p className="text-gray-800">{userData.contact}</p>
// // //           )}
// // //         </div>

// // //         {/* Location */}
// // //         <div>
// // //           <label className="block font-medium text-gray-700">Location:</label>
// // //           {isEditing ? (
// // //             <input
// // //               type="text"
// // //               value={editedData.location}
// // //               onChange={(e) => handleInputChange("location", e.target.value)}
// // //               className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // //             />
// // //           ) : (
// // //             <p className="text-gray-800">{userData.location}</p>
// // //           )}
// // //         </div>

// // //         {/* Skills */}
// // //         {(isEditing || (editedData.skills && editedData.skills.length > 0)) && (
// // //           <div>
// // //             <label className="block font-medium text-gray-700">Skills:</label>
// // //             {isEditing ? (
// // //               <>
// // //                 <input
// // //                   type="text"
// // //                   value={editedData.skills.join(", ")}
// // //                   onChange={(e) => handleInputChange("skills", e.target.value.split(","))}
// // //                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // //                 />
// // //                 <button
// // //                   onClick={() => handleInputChange("skills", [...editedData.skills, ""])}
// // //                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
// // //                 >
// // //                   Add Skill
// // //                 </button>
// // //               </>
// // //             ) : (
// // //               <p className="text-gray-800">{userData.skills.join(", ")}</p>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* Education */}
// // //         {(isEditing || (editedData.education && editedData.education.length > 0)) && (
// // //           <div>
// // //             <h3 className="text-lg font-semibold text-gray-800">Education</h3>
// // //             <div className="space-y-4">
// // //               {editedData.education.map((edu, index) => (
// // //                 <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
// // //                   {isEditing ? (
// // //                     <>
// // //                       <input
// // //                         type="text"
// // //                         value={edu.institution}
// // //                         onChange={(e) => handleArrayInputChange("education", index, "institution", e.target.value)}
// // //                         placeholder="Institution"
// // //                         className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // //                       />
// // //                       <input
// // //                         type="text"
// // //                         value={edu.degree}
// // //                         onChange={(e) => handleArrayInputChange("education", index, "degree", e.target.value)}
// // //                         placeholder="Degree"
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // //                       />
// // //                     </>
// // //                   ) : (
// // //                     <>
// // //                       <p className="text-gray-700 font-medium">{edu.institution}</p>
// // //                       <p className="text-gray-600">{edu.degree}</p>
// // //                     </>
// // //                   )}
// // //                 </div>
// // //               ))}
// // //               {isEditing && (
// // //                 <button
// // //                   onClick={() => handleArrayInputChange("education", editedData.education.length, { institution: "", degree: "" })}
// // //                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
// // //                 >
// // //                   Add Education
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Work Experience */}
// // //         {(isEditing || (editedData.workExperience && editedData.workExperience.length > 0)) && (
// // //           <div>
// // //             <h3 className="text-lg font-semibold text-gray-800">Work Experience</h3>
// // //             <div className="space-y-4">
// // //               {editedData.workExperience.map((work, index) => (
// // //                 <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
// // //                   {isEditing ? (
// // //                     <>
// // //                       <input
// // //                         type="text"
// // //                         value={work.company}
// // //                         onChange={(e) => handleArrayInputChange("workExperience", index, "company", e.target.value)}
// // //                         placeholder="Company"
// // //                         className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // //                       />
// // //                       <input
// // //                         type="text"
// // //                         value={work.position}
// // //                         onChange={(e) => handleArrayInputChange("workExperience", index, "position", e.target.value)}
// // //                         placeholder="Position"
// // //                         className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // //                       />
// // //                       <input
// // //                         type="date"
// // //                         value={work.startDate?.substring(0, 10)}
// // //                         onChange={(e) => handleArrayInputChange("workExperience", index, "startDate", e.target.value)}
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // //                       />
// // //                       <input
// // //                         type="date"
// // //                         value={work.endDate?.substring(0, 10)}
// // //                         onChange={(e) => handleArrayInputChange("workExperience", index, "endDate", e.target.value)}
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // //                       />
// // //                       <textarea
// // //                         value={work.description}
// // //                         onChange={(e) => handleArrayInputChange("workExperience", index, "description", e.target.value)}
// // //                         placeholder="Description"
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // //                       />
// // //                     </>
// // //                   ) : (
// // //                     <>
// // //                       <p className="text-gray-700 font-medium">{work.company}</p>
// // //                       <p className="text-gray-600">{work.position}</p>
// // //                       <p className="text-gray-600">{work.startDate} - {work.endDate}</p>
// // //                       <p className="text-gray-500">{work.description}</p>
// // //                     </>
// // //                   )}
// // //                 </div>
// // //               ))}
// // //               {isEditing && (
// // //                 <button
// // //                   onClick={() => handleArrayInputChange("workExperience", editedData.workExperience.length, { company: "", position: "", startDate: "", endDate: "", description: "" })}
// // //                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
// // //                 >
// // //                   Add Work Experience
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Certifications */}
// // //         {(isEditing || (editedData.certifications && editedData.certifications.length > 0)) && (
// // //           <div>
// // //             <h3 className="text-lg font-semibold text-gray-800">Certifications</h3>
// // //             <div className="space-y-4">
// // //               {editedData.certifications.map((cert, index) => (
// // //                 <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
// // //                   {isEditing ? (
// // //                     <>
// // //                       <input
// // //                         type="text"
// // //                         value={cert.title}
// // //                         onChange={(e) => handleArrayInputChange("certifications", index, "title", e.target.value)}
// // //                         placeholder="Title"
// // //                         className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // //                       />
// // //                       <input
// // //                         type="text"
// // //                         value={cert.issuer}
// // //                         onChange={(e) => handleArrayInputChange("certifications", index, "issuer", e.target.value)}
// // //                         placeholder="Issuer"
// // //                         className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // //                       />
// // //                       <input
// // //                         type="date"
// // //                         value={cert.date?.substring(0, 10)}
// // //                         onChange={(e) => handleArrayInputChange("certifications", index, "date", e.target.value)}
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // //                       />
// // //                     </>
// // //                   ) : (
// // //                     <>
// // //                       <p className="text-gray-700 font-medium">{cert.title}</p>
// // //                       <p className="text-gray-600">{cert.issuer}</p>
// // //                       <p className="text-gray-500">{cert.date}</p>
// // //                     </>
// // //                   )}
// // //                 </div>
// // //               ))}
// // //               {isEditing && (
// // //                 <button
// // //                   onClick={() => handleArrayInputChange("certifications", editedData.certifications.length, { title: "", issuer: "", date: "" })}
// // //                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
// // //                 >
// // //                   Add Certification
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Portfolio Links */}
// // //         {(isEditing || (editedData.portfolioLinks && editedData.portfolioLinks.length > 0)) && (
// // //           <div>
// // //             <h3 className="text-lg font-semibold text-gray-800">Portfolio Links</h3>
// // //             <div className="space-y-4">
// // //               {editedData.portfolioLinks.map((link, index) => (
// // //                 <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
// // //                   {isEditing ? (
// // //                     <input
// // //                       type="text"
// // //                       value={link}
// // //                       onChange={(e) => handleArrayInputChange("portfolioLinks", index, null, e.target.value)}
// // //                       placeholder="Portfolio Link"
// // //                       className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // //                     />
// // //                   ) : (
// // //                     <p className="text-gray-800">{link}</p>
// // //                   )}
// // //                 </div>
// // //               ))}
// // //               {isEditing && (
// // //                 <button
// // //                   onClick={() => handleArrayInputChange("portfolioLinks", editedData.portfolioLinks.length, "")}
// // //                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
// // //                 >
// // //                   Add Portfolio Link
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Career Objective */}
// // //         <div className="mb-6">
// // //           <h2 className="text-xl font-semibold mb-2">Career Objective</h2>
// // //           <textarea
// // //             value={careerObjective}
// // //             onChange={(e) => setCareerObjective(e.target.value)}
// // //             placeholder="Write your career objective here..."
// // //             className="w-full p-2 border rounded-lg"
// // //           ></textarea>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // 'use client'; 
// // // // import { useEffect, useState } from "react";
// // // // import { useParams, useSearchParams } from "next/navigation";

// // // // export default function RenderResume() {
// // // //   const params = useParams();
// // // //   const searchParams = useSearchParams();
// // // //   const { templateId } = params;
// // // //   const userId = searchParams.get("id");

// // // //   const [userData, setUserData] = useState(null);
// // // //   const [isEditing, setIsEditing] = useState(false);
// // // //   const [editedData, setEditedData] = useState(null);

// // // //   const [careerObjective, setCareerObjective] = useState("");
// // // //   const [portfolioLinks, setPortfolioLinks] = useState([]);
// // // //   const [certifications, setCertifications] = useState([]);
// // // //   const [workExperience, setWorkExperience] = useState([]);

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         const res = await fetch('/api/user/checkFields', {
// // // //           method: 'POST',
// // // //           headers: { 'Content-Type': 'application/json' },
// // // //           body: JSON.stringify({ userId }),
// // // //         });
// // // //         const data = await res.json();
// // // //         if (res.ok) {
// // // //           setUserData(data.data);
// // // //           setEditedData(data.data);
// // // //         } else {
// // // //           alert(data.error || "Failed to fetch user data.");
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Error fetching user data:", error);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, [userId]);

// // // //   const handleInputChange = (field, value) => {
// // // //     setEditedData((prev) => ({
// // // //       ...prev,
// // // //       [field]: value,
// // // //     }));
// // // //   };

// // // //   const handleArrayInputChange = (field, index, key, value) => {
// // // //     setEditedData((prev) => ({
// // // //       ...prev,
// // // //       [field]: prev[field].map((item, i) =>
// // // //         i === index ? { ...item, [key]: value } : item
// // // //       ),
// // // //     }));
// // // //   };

// // // //   const handleSave = async () => {
// // // //     try {
// // // //       const res = await fetch('/api/user/profile', {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify({
// // // //           userId,
// // // //           updatedData: editedData,
// // // //         }),
// // // //       });
// // // //       if (res.ok) {
// // // //         alert("Resume updated successfully!");
// // // //         setUserData(editedData);
// // // //         setIsEditing(false);
// // // //       } else {
// // // //         alert("Failed to save updates.");
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error saving data:", error);
// // // //     }
// // // //   };

// // // //   const handleGeneratePDF = async () => {
// // // //     try {
// // // //       const res = await fetch('/api/user/export', {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify({
// // // //           userId,
// // // //           templateId,
// // // //           format: "pdf",
// // // //         }),
// // // //       });
// // // //       const blob = await res.blob();
// // // //       const url = window.URL.createObjectURL(blob);
// // // //       const a = document.createElement("a");
// // // //       a.href = url;
// // // //       a.download = "resume.pdf";
// // // //       a.click();
// // // //     } catch (error) {
// // // //       console.error("Error generating PDF:", error);
// // // //     }
// // // //   };

// // // //   if (!userData) return <p className="text-center mt-8 text-gray-600">Loading...</p>;

// // // //   const handleAddPortfolioLink = () => {
// // // //     setPortfolioLinks([...portfolioLinks, ""]);
// // // //   };

// // // //   const handlePortfolioChange = (index, value) => {
// // // //     const updatedLinks = [...portfolioLinks];
// // // //     updatedLinks[index] = value;
// // // //     setPortfolioLinks(updatedLinks);
// // // //   };

// // // //   const handleAddCertification = () => {
// // // //     setCertifications([...certifications, { title: "", date: "" }]);
// // // //   };

// // // //   const handleCertificationChange = (index, field, value) => {
// // // //     const updatedCertifications = [...certifications];
// // // //     updatedCertifications[index][field] = value;
// // // //     setCertifications(updatedCertifications);
// // // //   };

// // // //   const handleAddWorkExperience = () => {
// // // //     setWorkExperience([...workExperience, { role: "", company: "", duration: "" }]);
// // // //   };

// // // //   const handleWorkExperienceChange = (index, field, value) => {
// // // //     const updatedExperience = [...workExperience];
// // // //     updatedExperience[index][field] = value;
// // // //     setWorkExperience(updatedExperience);
// // // //   };


// // // //   return (
// // // //     <div className={`p-6 mx-auto text-black mb-20 bg-gray-50 rounded-lg shadow-md ${isEditing ? 'border-2 border-blue-400' : ''}`}>
// // // //       <div className="mt-6 flex space-x-2 justify-end flex-end ">
// // // //         {isEditing ? (
// // // //           <>
// // // //             <button
// // // //               onClick={handleSave}
// // // //               className="bg-blue-500 text-black px-6 py-2 rounded-md shadow hover:bg-blue-600"
// // // //             >
// // // //               Save
// // // //             </button>
// // // //             <button
// // // //               onClick={() => setIsEditing(false)}
// // // //               className="bg-gray-300 text-black px-6 py-2 rounded-md shadow hover:bg-gray-400"
// // // //             >
// // // //               Cancel
// // // //             </button>
// // // //           </>
// // // //         ) : (
// // // //           <>
// // // //             <button
// // // //               onClick={() => setIsEditing(true)}
// // // //               className="bg-green-500 text-black px-6 py-2 rounded-md shadow hover:bg-green-600"
// // // //             >
// // // //               Edit
// // // //             </button>
// // // //             <button
// // // //               onClick={handleGeneratePDF}
// // // //               className="bg-purple-500 text-black px-6 py-2 rounded-md shadow hover:bg-purple-600"
// // // //             >
// // // //               Generate PDF
// // // //             </button>
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //       <h1 className="text-2xl font-semibold text-gray-800 mb-4">
// // // //         Resume {isEditing ? "Edit" : "Preview"}
// // // //       </h1>
// // // //       <div id="resume-content" className="space-y-6">
// // // //         <div>
// // // //           <label className="block font-medium text-gray-700">Name:</label>
// // // //           {isEditing ? (
// // // //             <input
// // // //               type="text"
// // // //               value={editedData.name}
// // // //               onChange={(e) => handleInputChange("name", e.target.value)}
// // // //               className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //             />
// // // //           ) : (
// // // //             <p className="text-gray-800">{userData.name}</p>
// // // //           )}
// // // //         </div>
        
// // // //         {/* Contact Information */}
// // // //         <div>
// // // //           <label className="block font-medium text-gray-700">Contact:</label>
// // // //           {isEditing ? (
// // // //             <input
// // // //               type="text"
// // // //               value={editedData.contact}
// // // //               onChange={(e) => handleInputChange("contact", e.target.value)}
// // // //               className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //             />
// // // //           ) : (
// // // //             <p className="text-gray-800">{userData.contact}</p>
// // // //           )}
// // // //         </div>

// // // //         <div>
// // // //           <label className="block font-medium text-gray-700">Location:</label>
// // // //           {isEditing ? (
// // // //             <input
// // // //               type="text"
// // // //               value={editedData.location}
// // // //               onChange={(e) => handleInputChange("location", e.target.value)}
// // // //               className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //             />
// // // //           ) : (
// // // //             <p className="text-gray-800">{userData.location}</p>
// // // //           )}
// // // //         </div>

// // // //         {/* Skills */}
// // // //         <div>
// // // //           <label className="block font-medium text-gray-700">Skills:</label>
// // // //           {isEditing ? (
// // // //             <input
// // // //               type="text"
// // // //               value={editedData.skills.join(", ")}
// // // //               onChange={(e) => handleInputChange("skills", e.target.value.split(","))}
// // // //               className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //             />
// // // //           ) : (
// // // //             <p className="text-gray-800">{userData.skills.join(", ")}</p>
// // // //           )}
// // // //         </div>

// // // //         {/* Education */}
// // // //         <div>
// // // //           <h3 className="text-lg font-semibold text-gray-800">Education</h3>
// // // //           <div className="space-y-4">
// // // //             {editedData.education.map((edu, index) => (
// // // //               <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
// // // //                 {isEditing ? (
// // // //                   <>
// // // //                     <input
// // // //                       type="text"
// // // //                       value={edu.institution}
// // // //                       onChange={(e) => handleArrayInputChange("education", index, "institution", e.target.value)}
// // // //                       placeholder="Institution"
// // // //                       className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //                     />
// // // //                     <input
// // // //                       type="text"
// // // //                       value={edu.degree}
// // // //                       onChange={(e) => handleArrayInputChange("education", index, "degree", e.target.value)}
// // // //                       placeholder="Degree"
// // // //                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //                     />
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <p className="text-gray-700 font-medium">{edu.institution}</p>
// // // //                     <p className="text-gray-600">{edu.degree}</p>
// // // //                   </>
// // // //                 )}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         {/* Work Experience */}
// // // //         <div>
// // // //           <h3 className="text-lg font-semibold text-gray-800">Work Experience</h3>
// // // //           <div className="space-y-4">
// // // //             {editedData.workExperience.map((work, index) => (
// // // //               <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
// // // //                 {isEditing ? (
// // // //                   <>
// // // //                     <input
// // // //                       type="text"
// // // //                       value={work.company}
// // // //                       onChange={(e) => handleArrayInputChange("workExperience", index, "company", e.target.value)}
// // // //                       placeholder="Company"
// // // //                       className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //                     />
// // // //                     <input
// // // //                       type="text"
// // // //                       value={work.position}
// // // //                       onChange={(e) => handleArrayInputChange("workExperience", index, "position", e.target.value)}
// // // //                       placeholder="Position"
// // // //                       className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //                     />
// // // //                     <input
// // // //                       type="date"
// // // //                       value={work.startDate?.substring(0, 10)}
// // // //                       onChange={(e) => handleArrayInputChange("workExperience", index, "startDate", e.target.value)}
// // // //                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //                     />
// // // //                     <input
// // // //                       type="date"
// // // //                       value={work.endDate?.substring(0, 10)}
// // // //                       onChange={(e) => handleArrayInputChange("workExperience", index, "endDate", e.target.value)}
// // // //                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //                     />
// // // //                     <textarea
// // // //                       value={work.description}
// // // //                       onChange={(e) => handleArrayInputChange("workExperience", index, "description", e.target.value)}
// // // //                       placeholder="Description"
// // // //                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //                     />
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <p className="text-gray-700 font-medium">{work.company}</p>
// // // //                     <p className="text-gray-600">{work.position}</p>
// // // //                     <p className="text-gray-600">{work.startDate} - {work.endDate}</p>
// // // //                     <p className="text-gray-500">{work.description}</p>
// // // //                   </>
// // // //                 )}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         {/* Certifications */}
// // // //         <div>
// // // //           <h3 className="text-lg font-semibold text-gray-800">Certifications</h3>
// // // //           <div className="space-y-4">
// // // //             {editedData.certifications.map((cert, index) => (
// // // //               <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
// // // //                 {isEditing ? (
// // // //                   <>
// // // //                     <input
// // // //                       type="text"
// // // //                       value={cert.title}
// // // //                       onChange={(e) => handleArrayInputChange("certifications", index, "title", e.target.value)}
// // // //                       placeholder="Title"
// // // //                       className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //                     />
// // // //                     <input
// // // //                       type="text"
// // // //                       value={cert.issuer}
// // // //                       onChange={(e) => handleArrayInputChange("certifications", index, "issuer", e.target.value)}
// // // //                       placeholder="Issuer"
// // // //                       className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //                     />
// // // //                     <input
// // // //                       type="date"
// // // //                       value={cert.date?.substring(0, 10)}
// // // //                       onChange={(e) => handleArrayInputChange("certifications", index, "date", e.target.value)}
// // // //                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //                     />
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <p className="text-gray-700 font-medium">{cert.title}</p>
// // // //                     <p className="text-gray-600">{cert.issuer}</p>
// // // //                     <p className="text-gray-500">{cert.date}</p>
// // // //                   </>
// // // //                 )}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         {/* Portfolio Links */}
// // // //         <div>
// // // //           <h3 className="text-lg font-semibold text-gray-800">Portfolio Links</h3>
// // // //           <div className="space-y-4">
// // // //           {Array.isArray(editedData.portfolioLinks) && editedData.portfolioLinks.length > 0 && 
// // // //           editedData.portfolioLinks.map((link, index) => (
// // // //             <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
// // // //               {isEditing ? (
// // // //                 <input
// // // //                   type="text"
// // // //                   value={link}
// // // //                   onChange={(e) => handleArrayInputChange("portfolioLinks", index, null, e.target.value)}
// // // //                   placeholder="Portfolio Link"
// // // //                   className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400"
// // // //                   />
// // // //                 ) : (
// // // //                   <p className="text-gray-800">{link}</p>
// // // //                 )}
// // // //               </div>
// // // //             ))
// // // //           }
// // // //           </div>

// // // //           <div className="mb-6">
// // // //         <h2 className="text-xl font-semibold mb-2">Career Objective</h2>
// // // //         <textarea
// // // //           value={careerObjective}
// // // //           onChange={(e) => setCareerObjective(e.target.value)}
// // // //           placeholder="Write your career objective here..."
// // // //           className="w-full p-2 border rounded-lg"
// // // //         ></textarea>
// // // //       </div>

// // // //       {/* Portfolio Links Section */}
// // // //       <div className="mb-6">
// // // //         <h2 className="text-xl font-semibold mb-2">Portfolio Links</h2>
// // // //         {portfolioLinks.length === 0 ? (
// // // //           <button
// // // //             onClick={handleAddPortfolioLink}
// // // //             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
// // // //           >
// // // //             Add Portfolio Link
// // // //           </button>
// // // //         ) : (
// // // //           portfolioLinks.map((link, index) => (
// // // //             <input
// // // //               key={index}
// // // //               type="text"
// // // //               value={link}
// // // //               onChange={(e) => handlePortfolioChange(index, e.target.value)}
// // // //               placeholder={`Portfolio Link ${index + 1}`}
// // // //               className="w-full p-2 border rounded-lg mb-2"
// // // //             />
// // // //           ))
// // // //         )}
// // // //       </div>

// // // //       {/* Certifications Section */}
// // // //       <div className="mb-6">
// // // //         <h2 className="text-xl font-semibold mb-2">Certifications</h2>
// // // //         {certifications.length === 0 ? (
// // // //           <button
// // // //             onClick={handleAddCertification}
// // // //             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
// // // //           >
// // // //             Add Certification
// // // //           </button>
// // // //         ) : (
// // // //           certifications.map((cert, index) => (
// // // //             <div key={index} className="mb-4">
// // // //               <input
// // // //                 type="text"
// // // //                 value={cert.title}
// // // //                 onChange={(e) => handleCertificationChange(index, "title", e.target.value)}
// // // //                 placeholder="Certification Title"
// // // //                 className="w-full p-2 border rounded-lg mb-2"
// // // //               />
// // // //               <input
// // // //                 type="text"
// // // //                 value={cert.date}
// // // //                 onChange={(e) => handleCertificationChange(index, "date", e.target.value)}
// // // //                 placeholder="Date"
// // // //                 className="w-full p-2 border rounded-lg"
// // // //               />
// // // //             </div>
// // // //           ))
// // // //         )}
// // // //       </div>

// // // //       {/* Work Experience Section */}
// // // //       <div className="mb-6">
// // // //         <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
// // // //         {workExperience.length === 0 ? (
// // // //           <button
// // // //             onClick={handleAddWorkExperience}
// // // //             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
// // // //           >
// // // //             Add Work Experience
// // // //           </button>
// // // //         ) : (
// // // //           workExperience.map((exp, index) => (
// // // //             <div key={index} className="mb-4">
// // // //               <input
// // // //                 type="text"
// // // //                 value={exp.role}
// // // //                 onChange={(e) => handleWorkExperienceChange(index, "role", e.target.value)}
// // // //                 placeholder="Role"
// // // //                 className="w-full p-2 border rounded-lg mb-2"
// // // //               />
// // // //               <input
// // // //                 type="text"
// // // //                 value={exp.company}
// // // //                 onChange={(e) => handleWorkExperienceChange(index, "company", e.target.value)}
// // // //                 placeholder="Company"
// // // //                 className="w-full p-2 border rounded-lg mb-2"
// // // //               />
// // // //               <input
// // // //                 type="text"
// // // //                 value={exp.duration}
// // // //                 onChange={(e) => handleWorkExperienceChange(index, "duration", e.target.value)}
// // // //                 placeholder="Duration"
// // // //                 className="w-full p-2 border rounded-lg"
// // // //               />
// // // //             </div>
// // // //           ))
// // // //         )}
// // // //       </div>

// // // //         </div>
// // // //       </div>

      
// // // //     </div>
// // // //   );
// // // // }
