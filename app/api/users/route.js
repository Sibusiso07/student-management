import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET() {
  try {

    const result = await pool.query(`
      SELECT 
      id,
      email,
      role,
      is_active
      FROM users
      WHERE role != 'SUPER_ADMIN'
    `);

    console.log(result.rows)
    return NextResponse.json(result.rows)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch Users" },
      { status: 500 }
    )

  }
}