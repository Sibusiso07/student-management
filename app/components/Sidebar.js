"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Users", href: "/dashboard/users" },
    { name: "Students", href: "/dashboard/students" },
    { name: "Teachers", href: "/dashboard/teachers" },
    { name: "Courses", href: "/dashboard/courses" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-6">
      <h2 className="text-xl text-black text-center font-bold mb-8 my-10">Phemphetse Training Academy</h2>

      <nav className="space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block p-2 rounded ${
              pathname === link.href
                ? "bg-[#D2B48C] text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <button
        onClick={async () => {
          await fetch("/api/auth/logout", { method: "POST" });
          window.location.href = "/login";
        }}
        className="mt-8 w-full bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </aside>
  );
}