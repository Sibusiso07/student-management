import Sidebar from "./components/Sidebar";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import "./globals.css";

export const metadata = {
  title: "Student App",
  description: "Student Dashboard",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies(); // ✅ FIX: await here

  let token = null;
  try {
    const tokenCookie = cookieStore.get("token");
    token = tokenCookie ? tokenCookie.value : null;
  } catch (e) {
    token = null;
  }

  const user = token ? verifyToken(token) : null;

  return (
    <html lang="en">
      <body className="flex">
        {/* Sidebar only if logged in */}
        {user && <Sidebar user={user} />}

        {/* Main content */}
        <main className="flex-1 min-h-screen p-6 bg-gray-100">
          {children}
        </main>
      </body>
    </html>
  );
}
