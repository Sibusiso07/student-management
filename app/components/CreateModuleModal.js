"use client";

import { useState } from "react";

export default function CreateModuleModal({
  isOpen,
  onClose,
  courses,
  onCreated,
}) {
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");

  async function handleCreate() {
    if (!selectedCourseId) {
      alert("Please select a course first");
      return;
    }

    const res = await fetch("/api/modules", {
      method: "POST",
      body: JSON.stringify({
        name: moduleName,
        description: moduleDescription,
        course_id: selectedCourseId,
      }),
    });

    if (res.ok) {
      // reset + close
      setModuleName("");
      setModuleDescription("");
      setSelectedCourseId("");
      onClose();
      onCreated && onCreated();
    } else {
      const err = await res.json();
      alert(err.error || "Failed to create module");
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Create Module
        </h2>

        <div className="space-y-4">
          
          {/* Course Select */}
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Module Name */}
          <input
            placeholder="Module Name"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800"
          />

          {/* Description */}
          <input
            placeholder="Description"
            value={moduleDescription}
            onChange={(e) => setModuleDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800"
          />

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600"
            >
              Cancel
            </button>

            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}