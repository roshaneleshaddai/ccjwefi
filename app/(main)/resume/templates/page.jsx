'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResumeTemplates() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const templates = [
    { id: "template1", image: "https://www.visualcv.com/static/e7599b84ef3cc2e749bbc489497fb9e5/46a2d/Blank_professional_resume_template_-_Arya.png", name: "Creative" },
    { id: "template2", image: "https://www.visualcv.com/static/e7599b84ef3cc2e749bbc489497fb9e5/46a2d/Blank_professional_resume_template_-_Arya.png", name: "IT" },
    { id: "template3", image: "https://www.visualcv.com/static/e7599b84ef3cc2e749bbc489497fb9e5/46a2d/Blank_professional_resume_template_-_Arya.png", name: "Marketing" },
    { id: "template4", image: "https://www.visualcv.com/static/e7599b84ef3cc2e749bbc489497fb9e5/46a2d/Blank_professional_resume_template_-_Arya.png", name: "Business" },
    { id: "template5", image: "https://www.visualcv.com/static/e7599b84ef3cc2e749bbc489497fb9e5/46a2d/Blank_professional_resume_template_-_Arya.png", name: "Intern" },
    { id: "template6", image: "https://www.visualcv.com/static/e7599b84ef3cc2e749bbc489497fb9e5/46a2d/Blank_professional_resume_template_-_Arya.png", name: "Master" },
  ];

  const handleTemplateClick = async (templateId) => {
    setLoading(true);

    try {
      const session = await fetch("/api/auth/session").then((res) => res.json());
      console.log(session?.user?.id);
      const res = await fetch('/api/user/checkFields', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session?.user?.id,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        console.log("fields exist");
        // Pass only the templateId in the router push
        router.push(`/resume/templates/${templateId}?id=${session?.user?.id}`);
      } else {
        alert(data.error || "User details incomplete. Please update your profile.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while checking fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">
          Choose Your Resume Template
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateClick(template.id)}
              className="group cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative">
                <img
                  src={template.image}
                  alt={`Template ${template.id}`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-indigo-900 mb-2">
                  {template.name}
                </h2>
                <p className="text-gray-600">
                  A professional and modern resume template for {template.name.toLowerCase()} professionals.
                </p>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                  Use This Template
                </button>
              </div>
            </div>
          ))}
        </div>
        {loading && (
          <div className="mt-8 text-center">
            <p className="text-indigo-600">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}