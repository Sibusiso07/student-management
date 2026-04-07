"use client";

import { useState, useEffect } from "react";

export default function EditUserModal({ isOpen, onClose, user, onSuccess }) {
  const [form, setForm] = useState({});
  const [role, setRole] = useState("ADMIN");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (user) {
      setForm(user);
      setRole(user.role);
      setIsActive(user.is_active);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...form,
        role,
        is_active: isActive,
      }),
    });

    if (res.ok) {
      onSuccess && onSuccess();
      onClose();
    } else {
      alert("Failed to update user");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center text-black justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 relative">

        <h2 className="text-2xl font-bold mb-6">Edit User</h2>

        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit}>

          {/* ROLE */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 mb-4 border rounded-md"
          >
            <option value="ADMIN">Admin</option>
            <option value="TEACHER">Teacher</option>
            <option value="STUDENT">Student</option>
          </select>

          {/* EMAIL */}
          <input
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md"
          />

          {/* FIRST NAME */}
          <input
            name="first_name"
            value={form.first_name || ""}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md"
          />

          {/* LAST NAME */}
          <input
            name="last_name"
            value={form.last_name || ""}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md"
          />

          {/* PHONE */}
          <input
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-md"
          />

          {/* STATUS */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Employment Status</label>
            <select
              value={isActive ? "ACTIVE" : "INACTIVE"}
              onChange={(e) => setIsActive(e.target.value === "ACTIVE")}
              className="w-full p-3 border rounded-md"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <button className="w-full py-3 bg-black text-white rounded-md">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}