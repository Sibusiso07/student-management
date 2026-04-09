"use client";

import { useState } from "react";

export default function CreateUserModal({ isOpen, onClose, onSuccess }) {
  const [role, setRole] = useState("ADMIN");
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    date_of_birth: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      role,
      password: role === "STUDENT" ? "" : form.password,
    };

    const res = await fetch("/api/users/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      onSuccess && onSuccess();
      onClose();
    } else {
      alert("Failed to create user");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 relative">
        
        {/* Header */}
        <h2 className="text-2xl font-extrabold mb-6 text-black">
          Create User
        </h2>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit}>
          {/* ROLE */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 mb-4 border rounded-md border-black text-black focus:ring-2 focus:ring-[#D2B48C]"
          >
            <option value="ADMIN">Admin</option>
            <option value="TEACHER">Teacher</option>
            <option value="STUDENT">Student</option>
          </select>

          {/* EMAIL */}
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md border-black text-black focus:ring-2 focus:ring-[#D2B48C]"
          />

          {/* PASSWORD (disabled for students) */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            disabled={role === "STUDENT"}
            className={`w-full p-3 mb-4 border rounded-md border-black text-black focus:ring-2 focus:ring-[#D2B48C] ${
              role === "STUDENT" ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
          />

          {/* FIRST NAME */}
          <input
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md border-black text-black"
          />

          {/* LAST NAME */}
          <input
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md border-black text-black"
          />

          {/* CONDITIONAL FIELDS */}

          {/* Admin & Teacher */}
          {(role === "ADMIN" || role === "TEACHER" || role === "STUDENT") && (
            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-md border-black text-black"
            />
          )}

          {/* Student only */}
          {role === "STUDENT" && (
            <input
              type="date"
              name="date_of_birth"
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-md border-black text-black"
            />
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-md font-semibold bg-black text-white hover:bg-[#D2B48C] hover:text-black transition"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}