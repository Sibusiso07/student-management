import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET all courses
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM courses ORDER BY id DESC");
    return NextResponse.json(result.rows);
  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// CREATE course
export async function POST(req) {
  try {
    const { name, description } = await req.json();

    const result = await pool.query(
      "INSERT INTO courses (name, description) VALUES ($1,$2) RETURNING *",
      [name, description]
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// UPDATE course
export async function PUT(req) {
  try {
    const { id, name, description } = await req.json();

    await pool.query(
      "UPDATE courses SET name=$1, description=$2 WHERE id=$3",
      [name, description, id]
    );

    return NextResponse.json({ message: "Updated" });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// DELETE course
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    await pool.query("DELETE FROM courses WHERE id=$1", [id]);

    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}