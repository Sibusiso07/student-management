import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET() {
  try {

    const query = `
      SELECT 
        students.id,
        students.first_name,
        students.last_name,
        students.phone,
        users.email,
        course_students.status
      FROM students
      JOIN users ON students.user_id = users.id
      JOIN course_students ON course_students.student_id = students.id
      WHERE users.role = 'STUDENT'
    `

    const result = await pool.query(query)

    return NextResponse.json(result.rows)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    )

  }
}