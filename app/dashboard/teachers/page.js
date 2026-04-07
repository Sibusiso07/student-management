"use client"

import { useEffect, useState } from "react"
import AssignTeacherCourseModal from "@/app/components/AssignTeacherCourseModal";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([])
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [courses, setCourses] = useState([])

  useEffect(() => {
    async function fetchTeachers() {
      const res = await fetch("/api/teachers");
      const data = await res.json();
      // If API returns { teachers: [...] }
      setTeachers(data);
    }

    fetchTeachers();
  }, []);


  return (
    <div className="p-6">
      
      {/* Header */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Teachers
      </h1>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Table */}
        <table className="w-full text-sm text-left">
          
          {/* Head */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-600 uppercase text-xs tracking-wider">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {teachers.map((teacher) => (
              <tr
                key={teacher.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {teacher.first_name} {teacher.last_name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {teacher.email}
                </td>

                {/* Course */}
                <td className="px-6 py-4 text-gray-600">
                  {teacher.course_name
                    ? teacher.course_name
                    : teacher.is_active
                    ? "No linked course"
                    : "Not employed"}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    teacher.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {teacher.is_active ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <button
                    disabled={!teacher.is_active}
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setOpenAssignModal(true);
                    }}
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      teacher.is_active
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Assign Course
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {teachers.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No teachers found
          </div>
        )}
      </div>
      <AssignTeacherCourseModal
        isOpen={openAssignModal}
        onClose={() => setOpenAssignModal(false)}
        teacher={selectedTeacher}
        courses={courses}
        onAssigned={teachers}
      />
    </div>
  )
}