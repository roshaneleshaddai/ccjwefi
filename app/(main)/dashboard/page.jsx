'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  const handleRedirect = (path) => {
    router.push(path);
  };

  return (
    <div className="text-black flex flex-col min-h-screen bg-gradient-to-br from-[#2d3e50] to-[#4a6b84] animate-gradient">
      <main className="flex-1 py-10 bg-white ">
        {/* Hero Section with Background Image */}
        <section className="px-16 text-center mb-20 relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: 'url("/images/hero-bg.jpg")' }}></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold text-[#2d3e50] text-[#f39c12] mb-6">Welcome to JobSeek!</h1>
            <p className="text-xl text-black">
              Your dream job is just a click away. Let us help you find the best job opportunities and build your career!
            </p>
          </div>
        </section>

        {/* Key Features Section with Icons */}
        <section className="px-16 text-center mb-20">
          <h2 className="text-3xl font-semibold text-[#2d3e50] mb-10">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            <div
              className="text-black flex flex-col items-center bg-[#04bab1] p-8 rounded-lg text-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => handleRedirect('/jobs')}
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-4">Job Search</h3>
              <hr className='items-center w-1/4 mb-4 border-2'></hr>
              <p className="text-lg">Browse through hundreds of job listings and filter them based on your preferences.</p>
            </div>
            <div
              className="text-black flex flex-col items-center bg-[#04bab1] p-8 rounded-lg text-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => handleRedirect('/resume')}
            >
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-4">Resume Builder</h3>
              <hr className='items-center w-1/4 mb-4 border-2'></hr>
              <p className="text-lg">Create a professional resume with our easy-to-use resume builder.</p>
            </div>
            <div
              className="text-black flex flex-col items-center bg-[#04bab1] p-8 rounded-lg text-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => handleRedirect('/jobs')}
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4">Apply with One Click</h3>
              <hr className='items-center w-1/4 mb-4 border-2'></hr>
              <p className="text-lg">Apply to jobs quickly with just one click and track your applications.</p>
            </div>
            <div
              className="text-black flex flex-col items-center bg-[#04bab1] p-8 rounded-lg text-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => handleRedirect('/success')}
            >
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-4">Success Stories</h3>
              <hr className='items-center w-1/4 mb-4 border-2'></hr>
              <p className="text-lg">See how we’ve transformed lives with our unique approach and dedication.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section with Carousel/Interactive */}
        <section className="text-center flex flex-col items-center justify-center mb-20">
        <h2 className="text-3xl font-semibold text-[#2d3e50] mb-10">What Our Users Say</h2>
        <div className="flex flex-col w-3/4 space-y-10">
          {/* Card 1 - Image on the left */}
          <div className="flex items-center gap-10 flex-col md:flex-row">
            <img 
              src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" 
              alt="User Testimonial" 
              className="w-36 h-36 rounded-full object-cover shadow-md"
            />
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex-1">
              <p className="text-lg italic">
                "JobSeek helped me land my dream job in just two weeks!"
              </p>
              <p className="mt-4 font-bold">- George L.</p>
            </div>
          </div>

          {/* Card 2 - Image on the right */}
          <div className="flex items-center gap-10 flex-col md:flex-row-reverse">
            <img 
              src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" 
              alt="User Testimonial" 
              className="w-36 h-36 rounded-full object-cover shadow-md"
            />
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex-1">
              <p className="text-lg italic">
                "The resume builder is so easy to use and professional."
              </p>
              <p className="mt-4 font-bold">- Mark T.</p>
            </div>
          </div>

          {/* Card 3 - Image on the left */}
          <div className="flex items-center gap-10 flex-col md:flex-row">
            <img 
              src="https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg" 
              alt="User Testimonial" 
              className="w-36 h-36 rounded-full object-cover shadow-md"
            />
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex-1">
              <p className="text-lg italic">
                "Applying with one click saved me so much time!"
              </p>
              <p className="mt-4 font-bold">- Sarah M.</p>
            </div>
          </div>
        </div>
      </section>


        {/* About Us Section with Soft Gradient */}
        <section className=" text-center mb-20 relative">
          <div className="rounded-2xl justify-center mx-16 py-10 absolute inset-0 bg-gradient-to-r from-[#4a6b84] to-[#2d3e50] opacity-60"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold text-[#fff] my-10 pt-5">About Us</h2>
            <p className="text-lg text-[#fff] max-w-5xl mx-auto my-5">
  At JobSeek, we believe in empowering job seekers to achieve their dreams and reach new heights in their professional 
  journeys. Our platform is designed to not only simplify job searching but also to make it an exciting and rewarding 
  experience. Whether you’re a recent graduate taking your first steps into the workforce or an experienced professional 
  exploring new opportunities, we are here to guide you every step of the way.
  <br /><br />
  With tools like a one-click application process, a user-friendly resume builder, and advanced job filters, 
  JobSeek takes the hassle out of finding your dream job. We also provide insightful career resources, tips from industry 
  experts, and a dedicated support team to ensure you’re always on track.
  <br /><br />
  Join our ever-growing community of ambitious professionals, connect with top employers, and discover the opportunities 
  that match your goals. Your future starts with JobSeek—because your career deserves the best.
</p>
<br></br>
          </div>
        </section>

        {/* FAQs Section with Accordion Style */}
        <section className="text-center mb-20">
  <h2 className="text-4xl font-bold text-[#2d3e50] mb-12">
    Frequently Asked Questions
  </h2>
  <div className="space-y-8 max-w-4xl mx-auto px-6">
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-md transition hover:shadow-lg">
      <h3 className="text-2xl font-bold text-blue-700 mb-2">
        1. How do I create an account?
      </h3>
      <p className="text-lg text-gray-600">
        You can create an account by clicking on the <span className="font-medium text-blue-600">"Sign Up"</span> button at the top right corner of the page.
      </p>
    </div>
    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-md transition hover:shadow-lg">
      <h3 className="text-2xl font-bold text-green-700 mb-2">
        2. Is JobSeek free to use?
      </h3>
      <p className="text-lg text-gray-600">
        Yes, JobSeek is completely free for job seekers.
      </p>
    </div>
    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg shadow-md transition hover:shadow-lg">
      <h3 className="text-2xl font-bold text-yellow-700 mb-2">
        3. Can I save job listings for later?
      </h3>
      <p className="text-lg text-gray-600">
        Absolutely! Just click on the <span className="font-medium text-yellow-600">"Save"</span> button next to any job listing.
      </p>
    </div>
  </div>
</section>
      </main>
    </div>
  );
}