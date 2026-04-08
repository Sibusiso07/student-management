import { headers } from "next/headers";
import DashboardClient from "../components/DashboardClient";

export default async function DashboardPage() {
  const headerList = await headers();
  const role = headerList.get("x-user-role");
  const name = headerList.get("x-user-name");

  const fetchData = async (url) => {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  };

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const [students, teachers, courses] = await Promise.all([
    fetchData(`${baseUrl}/api/students`),
    fetchData(`${baseUrl}/api/teachers`),
    fetchData(`${baseUrl}/api/courses`),
  ]);

  return (
    <DashboardClient
      role={role}
      name={name}
      studentCount={students.length || 0}
      teacherCount={teachers.length || 0}
      coursesCount={courses.length || 0}
    />
  );
}

