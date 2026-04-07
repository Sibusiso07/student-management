"use client";

import { useState } from "react";

export default function AssignStudentCourseModal({
  isOpen,
  onClose,
  student,
  courses,
  onAssigned,
}) {
  const [courseId, setCourseId] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  async function handleAssign() {
    const res = await fetch("/api/course-students", {
      method: "POST",
      body: JSON.stringify({
        course_id: courseId,
        student_id: student.id,
        status,
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

  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Assign Course
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          {student.first_name} {student.last_name}
        </p>

        {/* Course */}
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-3 text-gray-800"
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800"
        >
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="DROPPED">Dropped Out</option>
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

