"use client"; // Mark this as a Client Component
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { FaHome, FaBriefcase, FaFileAlt, FaUser } from "react-icons/fa";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [session, setSession] = useState(null); // State to store session data
  const dropdownRef = useRef(null); // Reference to the dropdown element
  const router = useRouter(); // For programmatic navigation

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        setSession(data);
      } catch (err) {
        console.error("Failed to fetch session:", err);
      }
    };

    fetchSession();
  }, []); // Empty dependency array ensures it runs only once on component mount

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to the main sign-in page
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left Side: Logo and Name */}
        <div className="flex items-center space-x-2">
          <img
            src="/images/logo.png" // Replace with your logo path
            alt="Logo"
            className="h-10 w-10"
          />
          <span className="text-xl font-bold text-[#04bab1]">Job Seeker</span>
        </div>

        {/* Right Side: Navigation Options */}
        <nav className="flex items-center space-x-6 relative">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 text-gray-700 hover:text-[#04bab1] transition-colors"
          >
            <FaHome className="text-lg" />
            <span>Home</span>
          </Link>
          <Link
            href="/jobs"
            className="flex items-center space-x-2 text-gray-700 hover:text-[#04bab1] transition-colors"
          >
            <FaBriefcase className="text-lg" />
            <span>Jobs</span>
          </Link>
          <Link
            href="/summarize"
            className="flex items-center space-x-2 text-gray-700 hover:text-[#04bab1] transition-colors"
          >
            <FaFileAlt className="text-lg" />
            <span>Know about yourself</span>
          </Link>
          <Link
            href="/resume/templates"
            className="flex items-center space-x-2 text-gray-700 hover:text-[#04bab1] transition-colors"
          >
            <FaFileAlt className="text-lg" />
            <span>Resume</span>
          </Link>
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 text-gray-700 hover:text-[#04bab1] transition-colors focus:outline-none"
          >
            <FaUser className="text-lg" />
            <span>Profile</span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              ref={dropdownRef} // Attach ref to the dropdown menu
              className="absolute right-0 mt-80 bg-white rounded-md shadow-lg z-10 p-4"
            >
              <h3 className="text-lg font-bold text-gray-800">Employer Profile</h3>
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Name:</span>{" "}
                {session?.user?.name || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span>{" "}
                {session?.user?.email || "N/A"}
              </p>

              <button
                className="mt-4 block w-full bg-blue-600 text-white py-2 rounded-md text-center font-semibold "
                onClick={() => router.push("/profile")} // Navigate to Edit Profile page
              >
                Edit Profile
              </button>

              <button
                className="mt-2 block w-full bg-[#04bab1] text-white py-2 rounded-md text-center font-semibold "
                onClick={handleSignOut}
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
