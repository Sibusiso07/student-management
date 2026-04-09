"use client"

import { useEffect, useState } from "react"
import AssignStudentCourseModal from "@/app/components/CourseStudentsModal"

export default function StudentsPage() {
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [openAssignModal, setOpenAssignModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  // ✅ Fetch students
  async function fetchStudents() {
    const res = await fetch("/api/students")
    const data = await res.json()
    setStudents(data)
  }

  // ✅ Fetch courses (needed for modal)
  async function fetchCourses() {
    const res = await fetch("/api/courses")
    const data = await res.json()
    setCourses(data)
  }

  useEffect(() => {
    fetchStudents()
    fetchCourses()
  }, [])

  return (
    <div className="p-6">
      
      {/* Header */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Students
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
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Course Name</th>
              <th className="px-6 py-4">Course Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {student.first_name} {student.last_name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {student.email}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {student.phone || "—"}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {student.course_name || "—"}
                </td>

                {/* ✅ Status Badge */}
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    student.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : student.status === "COMPLETED"
                      ? "bg-blue-100 text-blue-700"
                      : student.status === "DROPPED"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {student.status || "Not Assigned"}
                  </span>
                </td>

                {/* ✅ Action Button (correct place) */}
                <td className="px-2 py-4 text-right">
                  <button
                    onClick={() => {
                      setSelectedStudent(student)
                      setOpenAssignModal(true)
                    }}
                    className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                  >
                    Assign Course
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {students.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No students found
          </div>
        )}
      </div>

      {/* ✅ Modal */}
      <AssignStudentCourseModal
        isOpen={openAssignModal}
        onClose={() => setOpenAssignModal(false)}
        student={selectedStudent}
        courses={courses}
        onAssigned={fetchStudents}
      />
    </div>
  )
}
