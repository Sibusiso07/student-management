// "use client";

// import { useEffect, useState } from "react";

// export default function CourseStudentsModal({
//   isOpen,
//   onClose,
//   course,
// }) {
//   const [students, setStudents] = useState([]);
//   const [linkedStudents, setLinkedStudents] = useState([]);

//   useEffect(() => {
//     if (!course) return;

//     fetch("/api/students")
//       .then((res) => res.json())
//       .then(setStudents);

//     refresh();
//   }, [course]);

//   const getStatus = (studentId) =>
//     linkedStudents.find((s) => s.id === studentId)?.status;

//   const linkStudent = async (studentId) => {
//     await fetch("/api/course-students", {
//       method: "POST",
//       body: JSON.stringify({
//         course_id: course.id,
//         student_id: studentId,
//       }),
//     });

//     refresh();
//   };

//   const completeStudent = async (studentId) => {
//     await fetch("/api/course-students/complete", {
//       method: "PUT",
//       body: JSON.stringify({
//         course_id: course.id,
//         student_id: studentId,
//       }),
//     });

//     refresh();
//   };

//   const unlinkStudent = async (studentId) => {
//     await fetch("/api/course-students", {
//       method: "DELETE",
//       body: JSON.stringify({
//         course_id: course.id,
//         student_id: studentId,
//       }),
//     });

//     refresh();
//   };

//   const refresh = async () => {
//     const res = await fetch(
//       `/api/course-students?courseId=${course.id}`
//     );
//     const data = await res.json();
//     setLinkedStudents(data);
//   };

//   if (!isOpen || !course) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 relative max-h-[80vh] overflow-y-auto">

//         {/* Header */}
//         <h2 className="text-2xl font-extrabold mb-6">
//           Manage Students - {course.name}
//         </h2>

//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-black"
//         >
//           ✕
//         </button>

//         {/* Students List */}
//         <div className="space-y-3">
//           {students.map((s) => {
//             const status = getStatus(s.id);

//             return (
//               <div
//                 key={s.id}
//                 className="bg-gray-50 p-4 rounded flex justify-between items-center"
//               >
//                 <span>
//                   {s.first_name} {s.last_name}
//                 </span>

//                 <div className="flex gap-2 items-center">

//                   {/* ACTIVE */}
//                   {status === "ACTIVE" && (
//                     <>
//                       <span className="text-green-600 font-semibold">
//                         Active
//                       </span>

//                       <button
//                         onClick={() => completeStudent(s.id)}
//                         className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                       >
//                         Complete
//                       </button>
//                     </>
//                   )}

//                   {/* COMPLETED */}
//                   {status === "COMPLETED" && (
//                     <>
//                       <span className="text-gray-500 font-medium">
//                         Completed
//                       </span>

//                       <button
//                         onClick={() => unlinkStudent(s.id)}
//                         className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                       >
//                         Remove
//                       </button>
//                     </>
//                   )}

//                   {/* NOT LINKED */}
//                   {!status && (
//                     <button
//                       onClick={() => linkStudent(s.id)}
//                       className="px-4 py-1 bg-black text-white rounded hover:bg-[#D2B48C] hover:text-black"
//                     >
//                       Link
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

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
          className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-3"
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
          className="w-full px-4 py-3 border border-gray-200 rounded-lg"
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

