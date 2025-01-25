"use client";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const session = await fetch("/api/auth/session").then((res) => res.json());
        const res = await fetch("/api/user/getuser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session?.user?.id }),
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfile(data.user);
        setFormData(data.user); // Pre-fill form
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center text-gray-500 mt-10">Loading...</div>;


  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
      <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            value={formData.email || ""}
            disabled
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact:</label>
          <input
            type="text"
            value={formData.contact || ""}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location:</label>
          <input
            type="text"
            value={formData.location || ""}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Skills:</label>
          {formData.skills?.map((skill, index) => (
            <div key={index} className=" space-x-2 items-center mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: formData.skills.map((s, i) =>
                      i === index ? e.target.value : s
                    ),
                  })
                }
                className=" border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    skills: formData.skills.filter((_, i) => i !== index),
                  })
                }
                className="text-red-500 hover:text-red-700"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                skills: [...(formData.skills || []), ""],
              })
            }
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Add Skill
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Education:</label>
          {formData.education?.map((edu, index) => (
            <div key={index} className="space-y-2 mb-4">
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: formData.education.map((item, i) =>
                      i === index ? { ...item, institution: e.target.value } : item
                    ),
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: formData.education.map((item, i) =>
                      i === index ? { ...item, degree: e.target.value } : item
                    ),
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={edu.fieldOfStudy || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: formData.education.map((item, i) =>
                      i === index ? { ...item, fieldOfStudy: e.target.value } : item
                    ),
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Year"
                value={edu.year || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    education: formData.education.map((item, i) =>
                      i === index ? { ...item, year: e.target.value } : item
                    ),
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    education: formData.education.filter((_, i) => i !== index),
                  })
                }
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove Education
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                education: [
                  ...(formData.education || []),
                  { institution: "", degree: "", fieldOfStudy: "", year: "" },
                ],
              })
            }
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Add Education
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Work Experience:</label>
          {formData.workExperience?.map((exp, index) => (
            <div key={index} className="space-y-2 mb-4">
              <input
                type="text"
                placeholder="Company"
                value={exp.company || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workExperience: formData.workExperience.map((item, i) =>
                      i === index ? { ...item, company: e.target.value } : item
                    ),
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="Position"
                value={exp.position || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workExperience: formData.workExperience.map((item, i) =>
                      i === index ? { ...item, position: e.target.value } : item
                    ),
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <label className="block text-sm font-medium text-gray-700">Start Date:</label>
              <input
                type="date"
                value={exp.startDate || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workExperience: formData.workExperience.map((item, i) =>
                      i === index ? { ...item, startDate: e.target.value } : item
                    ),
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <label className="block text-sm font-medium text-gray-700">End Date:</label>
              <input
                type="date"
                value={exp.endDate || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workExperience: formData.workExperience.map((item, i) =>
                      i === index ? { ...item, endDate: e.target.value } : item
                    ),
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <textarea
                placeholder="Description"
                value={exp.description || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workExperience: formData.workExperience.map((item, i) =>
                      i === index ? { ...item, description: e.target.value } : item
                    ),
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                workExperience: [...(formData.workExperience || []), { company: "", position: "", startDate: "", endDate: "", description: "" }],
              })
            }
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Add Work Experience
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Certifications:</label>
          <textarea
            value={formData.certifications ? formData.certifications.join(", ") : ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                certifications: e.target.value.split(",").map((cert) => cert.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Portfolio Links:</label>
          {["github", "linkedin", "website"].map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{key}:</label>
              <input
                type="url"
                value={formData.portfolioLinks?.[key] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    portfolioLinks: {
                      ...formData.portfolioLinks,
                      [key]: e.target.value,
                    },
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
