"use client";

import { useState } from "react";
import CreateUserModal from "./CreateUserModal";

export default function DashboardClient({
  role,
  name,
  studentCount,
  teacherCount,
  coursesCount,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* 🔥 HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-black">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back{ name ? `, ${name}` : "" } 👋
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Add User Button (only for admin) */}
          {role === "ADMIN" || "SUPER_ADMIN" && (
            <button
              onClick={() => setOpen(true)}
              className="px-5 py-2 bg-black text-white rounded-lg shadow hover:bg-[#D2B48C] hover:text-black transition"
            >
              + Add User
            </button>
          )}

          {/* Role Badge */}
          <div className="bg-black text-white px-4 py-2 rounded-lg shadow">
            <span className="text-sm font-medium">
              {role || "User"}
            </span>
          </div>
        </div>
      </div>

      {/* 🔢 CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-[#D2B48C]">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Students
          </h2>
          <p className="text-3xl font-bold mt-3 text-black">
            {studentCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Teachers
          </h2>
          <p className="text-3xl font-bold mt-3 text-black">
            {teacherCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
          <h2 className="text-lg font-semibold text-gray-700">
            Courses
          </h2>
          <p className="text-3xl font-bold mt-3 text-black">
            {coursesCount}
          </p>
        </div>
      </div>

      {/* ✅ MODAL */}
      <CreateUserModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={() => window.location.reload()}
      />
    </div>
  );
}