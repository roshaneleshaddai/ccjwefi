import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Arjun",
    jobTitle: "Software Engineer at TechCorp",
    feedback:
      "Thanks to this platform, I found my dream job within weeks. The process was smooth and efficient!",
    avatar: "/images/john.jpg",
    rating: 5,
  },
  {
    name: "Sandy",
    jobTitle: "Marketing Manager at AdWorld",
    feedback:
      "This site connected me to amazing opportunities. I couldn't be happier with my new role!",
    avatar: "/images/jane.jpg",
    rating: 5,
  },
  {
    name: "Revi",
    jobTitle: "Data Scientist at AI Solutions",
    feedback:
      "The resources and guidance provided here were top-notch. Highly recommended!",
    avatar: "/images/carlos.jpg",
    rating: 4,
  },
  {
    name: "Anita Patel",
    jobTitle: "Product Manager at InnovateX",
    feedback:
      "A great platform with exceptional support. They truly care about job seekers.",
    avatar: "/images/anita.jpg",
    rating: 5,
  },
  {
    name: "Michael Nguyen",
    jobTitle: "UX Designer at CreativeWorks",
    feedback:
      "I landed a role that perfectly matches my skills and aspirations. Thank you!",
    avatar: "/images/michael.jpg",
    rating: 5,
  },
  {
    name: "Sara Lee",
    jobTitle: "HR Specialist at PeopleFirst",
    feedback:
      "This platform is a game-changer for job seekers. The opportunities are amazing!",
    avatar: "/images/sara.jpg",
    rating: 5,
  },
];

export default function SuccessStories() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Success Stories
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Hear from the professionals who have achieved their career goals through our platform.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">{testimonial.jobTitle}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">"{testimonial.feedback}"</p>
              <div className="mt-4 flex items-center">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-100 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900">Why Choose Us?</h2>
          <p className="mt-4 text-gray-600">
            Our platform is designed to connect job seekers with the best opportunities available. With personalized
            recommendations, expert guidance, and a wide network of trusted employers, we ensure your success is just a
            few steps away. Start your journey today and see the difference we can make!
          </p>
        </div>
      </div>
    </div>
  );
}

// import Head from 'next/head';

// export default function SuccessStories() {
//   const successStories = [
//     {
//       name: 'John Doe',
//       jobTitle: 'Software Engineer',
//       company: 'TechCorp',
//       feedback: "This platform changed my life! I landed my dream job within weeks of applying. The process was smooth and hassle-free.",
//       image: 'https://via.placeholder.com/150',
//     },
//     {
//       name: 'Jane Smith',
//       jobTitle: 'Data Scientist',
//       company: 'Data Inc.',
//       feedback: "I never thought finding a job could be this easy. The tools provided here are top-notch!",
//       image: 'https://via.placeholder.com/150',
//     },
//     {
//       name: 'Samuel Green',
//       jobTitle: 'Product Manager',
//       company: 'InnovateX',
//       feedback: "The guidance and resources on this website helped me secure a position in a highly competitive market.",
//       image: 'https://via.placeholder.com/150',
//     },
//     {
//       name: 'Emily Brown',
//       jobTitle: 'UX Designer',
//       company: 'Creative Studios',
//       feedback: "I’m so grateful for this platform. It connected me to the perfect opportunity for my skills.",
//       image: 'https://via.placeholder.com/150',
//     },
//     {
//       name: 'Michael Lee',
//       jobTitle: 'DevOps Engineer',
//       company: 'CloudNet',
//       feedback: "The website’s interface is so intuitive. I found my job within days! Highly recommend it.",
//       image: 'https://via.placeholder.com/150',
//     },
//     {
//       name: 'Sophia Wilson',
//       jobTitle: 'Marketing Specialist',
//       company: 'BrandBoost',
//       feedback: "The job recommendations matched my profile perfectly. It saved me so much time and effort.",
//       image: 'https://via.placeholder.com/150',
//     },
//   ];

//   return (
//     <>
//       <Head>
//         <title>Success Stories</title>
//         <meta name="description" content="Discover inspiring success stories from our users who found their dream jobs through our platform." />
//       </Head>
//       <main className="bg-gray-50 min-h-screen py-10">
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Success Stories</h1>
//           <p className="text-center text-gray-600 mb-10">
//             Discover how our platform has helped countless individuals achieve their career goals. Hear their inspiring stories below.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {successStories.map((story, index) => (
//               <div key={index} className="bg-white shadow-md rounded-lg p-6">
//                 <img
//                   src={story.image}
//                   alt={story.name}
//                   className="w-24 h-24 rounded-full mx-auto mb-4"
//                 />
//                 <h2 className="text-xl font-semibold text-center text-gray-800">
//                   {story.name}
//                 </h2>
//                 <p className="text-center text-gray-500 mb-2">
//                   {story.jobTitle} at {story.company}
//                 </p>
//                 <p className="text-gray-600 text-sm text-center">"{story.feedback}"</p>
//               </div>
//             ))}
//           </div>

//           {/* Additional Related Information */}
//           <section className="mt-16 bg-blue-100 py-10 rounded-lg">
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Why Choose Our Platform?</h2>
//             <ul className="list-disc list-inside text-gray-700 px-6 md:px-12 lg:px-24">
//               <li className="mb-2">Wide range of job opportunities across various industries.</li>
//               <li className="mb-2">User-friendly interface to simplify your job search.</li>
//               <li className="mb-2">Personalized job recommendations tailored to your skills and preferences.</li>
//               <li className="mb-2">Dedicated resources to help you prepare for interviews and enhance your resume.</li>
//               <li>24/7 customer support to assist you throughout your journey.</li>
//             </ul>
//           </section>
//         </div>
//       </main>
//     </>
//   );
// }