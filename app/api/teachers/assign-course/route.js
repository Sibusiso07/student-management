import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const { teacher_id, course_id } = await req.json();

    // Check if teacher is active
    const teacherCheck = await pool.query(
      "SELECT is_active FROM teachers WHERE id = $1",
      [teacher_id]
    );

    if (!teacherCheck.rows[0].is_active) {
      return NextResponse.json(
        { error: "Inactive teachers cannot be assigned to a course" },
        { status: 400 }
      );
    }

    await pool.query(
      `UPDATE teachers SET course_id = $1 WHERE id = $2`,
      [course_id, teacher_id]
    );

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}