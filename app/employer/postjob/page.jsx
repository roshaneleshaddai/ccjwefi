'use client';

import { useState } from 'react';

const PostJobForm = ({ setIsDialogOpen }) => {
  const [jobDetails, setJobDetails] = useState({
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    skills: [],
    employmentType: '',
    minSalary: '',
    maxSalary: '',
    jobLocation: '',
    isRemote: false,
    applicationDeadline: '',
    openings: 0,
    experienceRequired: '',
    industry: '',
    employerId: '',
  });

  
  const [skillInput, setSkillInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const predefinedSkills = [
    'React.js', 'Node.js', 'Python', 'Java', 'JavaScript',
    'AWS', 'Azure', 'SQL', 'MongoDB', 'Docker', 'Kubernetes',
  ];

  const filteredSkills = predefinedSkills.filter((skill) =>
    skill.toLowerCase().includes(skillInput.toLowerCase())
  );

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
    setShowDropdown(true);
  };

  const handleSkillSelect = (skill) => {
    if (!jobDetails.skills.includes(skill)) {
      setJobDetails({ ...jobDetails, skills: [...jobDetails.skills, skill] });
    }
    setSkillInput('');
    setShowDropdown(false);
  };

  const removeSkill = (skill) => {
    setJobDetails({
      ...jobDetails,
      skills: jobDetails.skills.filter((s) => s !== skill),
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(jobDetails);  // Log to ensure correct job details are passed
    try {
        const session = await fetch("/api/auth/session").then((res) => res.json());
        jobDetails.employerId = session.user.id;
        const response = await fetch('/api/jobs/postjob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobDetails),
      });
      if (response.ok) {
        alert('Job posted successfully!');
        setIsDialogOpen(false);
      } else {
        alert('Failed to post job. Please try again.');
      }
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };
  
  return (
    <div className="max-h-[96vh] overflow-y-auto p-6 border border-gray-300 rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Post a Job</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          value={jobDetails.companyName}
          onChange={handleChange}
          placeholder="Company Name"
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="jobTitle"
          value={jobDetails.jobTitle}
          onChange={handleChange}
          placeholder="Job Title"
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <textarea
          name="jobDescription"
          value={jobDetails.jobDescription}
          onChange={handleChange}
          placeholder="Job Description"
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          type="text"
          name="industry"
          value={jobDetails.industry}
          onChange={handleChange}
          placeholder="Industry"
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <div className="space-y-2">
          <label className="font-medium">Skills Required:</label>
          <div className="relative">
            <input
              type="text"
              value={skillInput}
              onChange={handleSkillInputChange}
              placeholder="Type a skill..."
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {showDropdown && (
              <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto mt-1 z-10">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => (
                    <li
                      key={skill}
                      onClick={() => handleSkillSelect(skill)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {skill}
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-gray-500 cursor-default">
                    No matching skills found
                  </li>
                )}
              </ul>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {jobDetails.skills.map((skill) => (
              <span key={skill} className="bg-blue-500 text-white py-1 px-3 rounded-lg flex items-center">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-white bg-transparent border-0 cursor-pointer"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        <select
          name="employmentType"
          value={jobDetails.employmentType}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        >
          <option value="">Select Employment Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>

        <div className="flex space-x-4">
          <input
            type="number"
            name="minSalary"
            value={jobDetails.minSalary}
            onChange={handleChange}
            placeholder="Min Salary"
            required
            className="w-1/2 p-3 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="maxSalary"
            value={jobDetails.maxSalary}
            onChange={handleChange}
            placeholder="Max Salary"
            required
            className="w-1/2 p-3 border border-gray-300 rounded-md"
          />
        </div>

        <input
          type="text"
          name="jobLocation"
          value={jobDetails.jobLocation}
          onChange={handleChange}
          placeholder="Job Location"
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isRemote"
            checked={jobDetails.isRemote}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span>Remote</span>
        </label>

        <input
          type="number"
          name="experienceRequired"
          value={jobDetails.experienceRequired}
          onChange={handleChange}
          placeholder="Experience Required (in years)"
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <p className="mt-2">Last Date to Apply:</p>
        <input
          type="date"
          name="applicationDeadline"
          value={jobDetails.applicationDeadline}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobForm;

// 'use client';

// import { useState } from 'react';

// const PostJobForm = ({ setIsDialogOpen }) => {
//   const [jobDetails, setJobDetails] = useState({
//     companyName: '',
//     jobTitle: '',
//     jobDescription: '',
//     skills: [],
//     employmentType: '',
//     minSalary: '',
//     maxSalary: '',
//     jobLocation: '',
//     isRemote: false,
//     applicationDeadline: '',
//     openings: 0,
//     experienceRequired: '',
//     industry: '',
//   });

//   const [skillInput, setSkillInput] = useState('');
//   const [showDropdown, setShowDropdown] = useState(false);

//   const predefinedSkills = [
//     'React.js', 'Node.js', 'Python', 'Java', 'JavaScript',
//     'AWS', 'Azure', 'SQL', 'MongoDB', 'Docker', 'Kubernetes',
//   ];

//   const filteredSkills = predefinedSkills.filter((skill) =>
//     skill.toLowerCase().includes(skillInput.toLowerCase())
//   );

//   const handleSkillInputChange = (e) => {
//     setSkillInput(e.target.value);
//     setShowDropdown(true);
//   };

//   const handleSkillSelect = (skill) => {
//     if (!jobDetails.skills.includes(skill)) {
//       setJobDetails({ ...jobDetails, skills: [...jobDetails.skills, skill] });
//     }
//     setSkillInput('');
//     setShowDropdown(false);
//   };

//   const removeSkill = (skill) => {
//     setJobDetails({
//       ...jobDetails,
//       skills: jobDetails.skills.filter((s) => s !== skill),
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setJobDetails({
//       ...jobDetails,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         console.log(jobDetails);
//       const response = await fetch("/api/jobs/postjob", {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(jobDetails),
//       });
//       if (response.ok) {
//         alert('Job posted successfully!');
//         setIsDialogOpen(false);
//       } else {
//         alert('Failed to post job. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error posting job:', error);
//     }
//   };

//   return (
//     <div className="max-h-[96vh] overflow-y-auto p-6 border border-gray-300 rounded-lg">
//       <h1 className="text-2xl font-semibold mb-6">Post a Job</h1>
//       <form className="space-y-6" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="companyName"
//           value={jobDetails.companyName}
//           onChange={handleChange}
//           placeholder="Company Name"
//           required
//           className="w-full p-3 border border-gray-300 rounded-md"
//         />
//         <input
//           type="text"
//           name="jobTitle"
//           value={jobDetails.jobTitle}
//           onChange={handleChange}
//           placeholder="Job Title"
//           required
//           className="w-full p-3 border border-gray-300 rounded-md"
//         />
//         <textarea
//           name="jobDescription"
//           value={jobDetails.jobDescription}
//           onChange={handleChange}
//           placeholder="Job Description"
//           required
//           className="w-full p-3 border border-gray-300 rounded-md"
//         />

//         <input
//           type="text"
//           name="industry"
//           value={jobDetails.industry}
//           onChange={handleChange}
//           placeholder="Industry"
//           required
//           className="w-full p-3 border border-gray-300 rounded-md"
//         />

//         <div className="space-y-2">
//           <label className="font-medium">Skills Required:</label>
//           <div className="relative">
//             <input
//               type="text"
//               value={skillInput}
//               onChange={handleSkillInputChange}
//               placeholder="Type a skill..."
//               className="w-full p-3 border border-gray-300 rounded-md"
//             />
//             {showDropdown && (
//               <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto mt-1 z-10">
//                 {filteredSkills.length > 0 ? (
//                   filteredSkills.map((skill) => (
//                     <li
//                       key={skill}
//                       onClick={() => handleSkillSelect(skill)}
//                       className="px-3 py-2 cursor-pointer hover:bg-gray-100"
//                     >
//                       {skill}
//                     </li>
//                   ))
//                 ) : (
//                   <li className="px-3 py-2 text-gray-500 cursor-default">
//                     No matching skills found
//                   </li>
//                 )}
//               </ul>
//             )}
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {jobDetails.skills.map((skill) => (
//               <span key={skill} className="bg-blue-500 text-white py-1 px-3 rounded-lg flex items-center">
//                 {skill}
//                 <button
//                   type="button"
//                   onClick={() => removeSkill(skill)}
//                   className="ml-2 text-white bg-transparent border-0 cursor-pointer"
//                 >
//                   x
//                 </button>
//               </span>
//             ))}
//           </div>
//         </div>

//         <select
//           name="employmentType"
//           value={jobDetails.employmentType}
//           onChange={handleChange}
//           required
//           className="w-full p-3 border border-gray-300 rounded-md"
//         >
//           <option value="">Select Employment Type</option>
//           <option value="Full-time">Full-time</option>
//           <option value="Part-time">Part-time</option>
//           <option value="Internship">Internship</option>
//         </select>

//         <div className="flex space-x-4">
//           <input
//             type="number"
//             name="minSalary"
//             value={jobDetails.minSalary}
//             onChange={handleChange}
//             placeholder="Min Salary"
//             required
//             className="w-1/2 p-3 border border-gray-300 rounded-md"
//           />
//           <input
//             type="number"
//             name="maxSalary"
//             value={jobDetails.maxSalary}
//             onChange={handleChange}
//             placeholder="Max Salary"
//             required
//             className="w-1/2 p-3 border border-gray-300 rounded-md"
//           />
//         </div>

//         <input
//           type="text"
//           name="jobLocation"
//           value={jobDetails.jobLocation}
//           onChange={handleChange}
//           placeholder="Job Location"
//           required
//           className="w-full p-3 border border-gray-300 rounded-md"
//         />

//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="isRemote"
//             checked={jobDetails.isRemote}
//             onChange={handleChange}
//             className="w-5 h-5"
//           />
//           <span>Remote</span>
//         </label>

//         <input
//           type="number"
//           name="experienceRequired"
//           value={jobDetails.experienceRequired}
//           onChange={handleChange}
//           placeholder="Experience Required (in years)"
//           required
//           className="w-full p-3 border border-gray-300 rounded-md"
//         />
//         <p className='mt-2'>Last Date to Apply:</p>
//         <input
//           type="date"
//           name="applicationDeadline"
//           value={jobDetails.applicationDeadline}
//           onChange={handleChange}
//           required
//           className="w-full p-3 border border-gray-300 rounded-md"
//         />

//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={() => setIsDialogOpen(false)}
//             className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
//             Post Job
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PostJobForm;
