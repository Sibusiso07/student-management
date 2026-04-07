// "use client";

// import { useRouter } from "next/navigation";

// export default function LandingPage() {
//   const router = useRouter();

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-[#F5F5DC] to-[#FFD700]">
//       <h1 className="text-6xl font-extrabold mb-6 text-white tracking-wide drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
//         Welcome to <span className="text-[#FFD700]">MyApp</span>
//       </h1>
//       <p className="text-lg mb-12 text-center max-w-md text-black font-medium bg-white/70 px-6 py-4 rounded-lg shadow-lg">
//         Manage your account securely and access your dashboard. Please log in to continue.
//       </p>
//       <button
//         onClick={() => router.push("/login")}
//         className="px-10 py-4 rounded-full shadow-xl font-bold text-lg transition transform hover:scale-105 bg-[#FFD700] text-black hover:bg-black hover:text-[#FFD700]"
//         aria-label="Go to login page"
//       >
//         Go to Login
//       </button>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      {/* Title */}
      <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
        <span className="text-black">Welcome to</span>{" "}
        <span className="text-[#D2B48C]">MyApp</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg mb-12 text-center max-w-md text-[#333] font-light leading-relaxed">
        A simple and secure way to manage students, courses, and reports.
      </p>

      {/* Call to Action */}
      <button
        onClick={() => router.push("/login")}
        className="px-8 py-3 rounded-md shadow-md font-semibold transition bg-black text-white hover:bg-[#FFD700] hover:text-black"
        aria-label="Go to login page"
      >
        Go to Login
      </button>
    </div>
  );
}