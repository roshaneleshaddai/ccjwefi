'use client'
import React, { useState } from "react";

const Sidebar = ({ onFilterUpdate }) => {
  const [filters, setFilters] = useState({
    profile: "",
    location: "",
    workFromHome: false,
    partTime: false,
    salary: 0,
    experience: "",
  });

  const updateFilters = () => {
    onFilterUpdate(filters);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSalaryChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      salary: e.target.value,
    }));
  };

  React.useEffect(() => {
    updateFilters();
  }, [filters]);

  return (
    <div className="w-72 bg-white shadow-lg rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-700">Filters</h2>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">Profile</label>
        <input
          type="text"
          name="profile"
          placeholder="e.g. Marketing"
          value={filters.profile}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">Location</label>
        <input
          type="text"
          name="location"
          placeholder="e.g. Delhi"
          value={filters.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="workFromHome"
          checked={filters.workFromHome}
          onChange={handleChange}
          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm text-gray-600">Work from home</label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="partTime"
          checked={filters.partTime}
          onChange={handleChange}
          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm text-gray-600">Part-time</label>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">
          Annual salary 
        </label>
        <input
          type="text"
          name="salary"
          value={filters.salary}
          onChange={handleSalaryChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* <span className="text-sm text-gray-600">{filters.salary} LPA</span> */}
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">Years of experience</label>
        <select
          name="experience"
          value={filters.experience}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select years of experience</option>
          <option value="0-2">0-2 years</option>
          <option value="3-5">3-5 years</option>
          <option value="6-10">6-10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </div>
      <button
        onClick={() =>
          setFilters({
            profile: "",
            location: "",
            workFromHome: false,
            partTime: false,
            salary: 0,
            experience: "",
          })
        }
        className="w-full bg-red-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Clear all
      </button>
    </div>
  );
};

export default Sidebar;
