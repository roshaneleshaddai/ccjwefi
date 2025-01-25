'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PostJobForm from './postjob/page';
import { signOut } from 'next-auth/react';

export default function EmployerHome() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      

      <div className="min-h-[555px] text-center mt-10">
        <h1 className="text-4xl font-bold">Welcome to JobSeek!</h1>
        <p className="text-gray-600 mt-4">
          Your dream job is just a click away. Let us help you find the best candidates and grow your business!
        </p>

        <h2 className="text-2xl font-semibold mt-8">Key Features</h2>
        <div className="flex justify-center mt-6 space-x-6">
          <button 
            className="min-h-[250px] bg-orange-500 text-white p-6 rounded-lg shadow-md hover:bg-orange-600"
            onClick={() => setIsDialogOpen(true)}  // Open dialog
          >
            <h3 className="text-xl font-bold">Post a Job</h3>
            <p className="mt-2">Easily post job openings to find the right candidates.</p>
          </button>

          <button 
            className="bg-orange-500 text-white p-6 rounded-lg shadow-md hover:bg-orange-600"
            onClick={() => router.push('/employer/applications')}
          >
            <h3 className="text-xl font-bold">Applications Received</h3>
            <p className="mt-2">Manage and review job applications effortlessly.</p>
          </button>
        </div>
      </div>

      {/* Post Job Form Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 mx-4 max-w-3xl rounded-lg shadow-lg">
            <PostJobForm setIsDialogOpen={setIsDialogOpen} />
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white text-center py-4 mt-10">
        <div className="space-x-4">
          <a href="#" className="hover:text-blue-400">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400">Terms of Service</a>
          <a href="#" className="hover:text-blue-400">Help</a>
        </div>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-blue-400">Facebook</a>
          <a href="#" className="hover:text-blue-400">Twitter</a>
          <a href="#" className="hover:text-blue-400">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
