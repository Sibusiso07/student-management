import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const { name, description, course_id } = await req.json();

    if (!course_id) {
      return NextResponse.json(
        { error: "Course is required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      INSERT INTO modules (name, description, course_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, description, course_id]
    );

    return NextResponse.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}