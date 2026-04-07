import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET() {
  try {

    const query = `
      SELECT 
        teachers.id,
        teachers.first_name,
        teachers.last_name,
        users.email,
        teachers.phone,
        teachers.is_active,
        courses.name AS course_name
      FROM teachers
      JOIN users ON teachers.user_id = users.id
      JOIN courses ON teachers.course_id = courses.id
      WHERE users.role = 'TEACHER'
    `

    const result = await pool.query(query)
    console.log(result.rows)

    return NextResponse.json(result.rows)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch teachers" },
      { status: 500 }
    )

  }
}