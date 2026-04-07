"use client";

import { useState } from "react";

export default function AssignTeacherCourseModal({
  isOpen,
  onClose,
  teacher,
  courses,
  onAssigned,
}) {
  const [selectedCourse, setSelectedCourse] = useState("");

  async function handleAssign() {
    const res = await fetch("/api/teachers/assign-course", {
      method: "POST",
      body: JSON.stringify({
        teacher_id: teacher.id,
        course_id: selectedCourse,
      }),
    });

    if (res.ok) {
      onClose();
      onAssigned && onAssigned();
    } else {
      const err = await res.json();
      alert(err.error);
    }
  }

  if (!isOpen || !teacher) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Assign Course
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          {teacher.first_name} {teacher.last_name}
        </p>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800"
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 text-gray-600">
            Cancel
          </button>

          <button
            onClick={handleAssign}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}