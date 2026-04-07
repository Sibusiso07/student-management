"use client";

import { useEffect, useState } from "react";
import CourseStudentsModal from "@/app/components/CourseStudentsModal";
import CreateModuleModal from "@/app/components/CreateModuleModal";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [openModuleModal, setOpenModuleModal] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchCourses = async () => {
    const res = await fetch("/api/courses");
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const createCourse = async () => {
    await fetch("/api/courses", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });

    setName("");
    setDescription("");
    fetchCourses();
  };

  const deleteCourse = async (id) => {
    await fetch("/api/courses", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    fetchCourses();
  };

  return (
    <div className="p-6">
      
      {/* Header */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Courses
      </h1>

      {/* Create Course Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid gap-4">
          <input
            placeholder="Course Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          <div>
            <button
              onClick={createCourse}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Add Course
            </button>
          </div>
        </div>
      </div>

      {/* Courses Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        <table className="w-full text-sm text-left">
          
          {/* Head */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-600 uppercase text-xs tracking-wider">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {courses.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition">
                
                <td className="px-6 py-4 font-medium text-gray-800">
                  {c.name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {c.description || "—"}
                </td>

                <td className="px-6 py-4 text-right space-x-2">
                  
                  <button
                    onClick={() => {
                      setSelectedCourse(c);
                      setOpenModal(true);
                    }}
                    className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                  >
                    Manage Students
                  </button>

                  <button
                    onClick={() => deleteCourse(c.id)}
                    className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full hover:bg-red-200"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {courses.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No courses found
          </div>
        )}
      </div>
      <div className="mt-6">
        <button
          onClick={() => setOpenModuleModal(true)}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Create Module
        </button>
      </div>
      <CreateModuleModal
        isOpen={openModuleModal}
        onClose={() => setOpenModuleModal(false)}
        courses={courses}
        />
    </div>
  );
}