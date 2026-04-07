"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@school.com");
  const [password, setPassword] = useState("admin@123");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("Login success:", data);
      router.push("/dashboard"); // Redirect after login
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-[#F9F9F9] p-10 rounded-lg shadow-lg w-full max-w-md"
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold mb-6 text-center tracking-tight">
          <span className="text-black">Login to</span>{" "}
          <span className="text-[#D2B48C]">MyApp</span>
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md border-black focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded-md border-black focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 rounded-md shadow-md font-semibold transition bg-black text-white hover:bg-[#FFD700] hover:text-black"
        >
          Login
        </button>

        {/* Back to Landing */}
        <p className="mt-6 text-center text-sm text-[#333]">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/")}
            className="cursor-pointer text-[#D2B48C] font-semibold hover:underline"
          >
            Go Back
          </span>
        </p>
      </form>
    </div>
  );
}