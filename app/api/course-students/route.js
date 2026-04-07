import { NextResponse } from "next/server";
import pool from "@/lib/db";

// ✅ GET students in a course (WITH STATUS)
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  const result = await pool.query(
    `
    SELECT 
      students.id, 
      students.first_name, 
      students.last_name,
      course_students.status
    FROM course_students
    JOIN students ON course_students.student_id = students.id
    WHERE course_students.course_id = $1
    `,
    [courseId]
  );

  return NextResponse.json(result.rows);
}

// ✅ LINK student
export async function POST(req) {
  const { course_id, student_id, status } = await req.json();

  const finalStatus = status || "ACTIVE";

  // 🚨 Prevent duplicate same course
  const duplicate = await pool.query(
    `
    SELECT * FROM course_students
    WHERE course_id = $1 AND student_id = $2
    `,
    [course_id, student_id]
  );

  if (duplicate.rows.length > 0) {
    return NextResponse.json(
      { error: "Student already linked to this course" },
      { status: 400 }
    );
  }

  // 🚨 Prevent multiple ACTIVE courses
  if (finalStatus === "ACTIVE") {
    const activeCourse = await pool.query(
      `
      SELECT * FROM course_students
      WHERE student_id = $1 AND status = 'ACTIVE'
      `,
      [student_id]
    );

    if (activeCourse.rows.length > 0) {
      return NextResponse.json(
        { error: "Student already has an active course" },
        { status: 400 }
      );
    }
  }

  // ✅ Insert with chosen status
  await pool.query(
    `
    INSERT INTO course_students (course_id, student_id, status)
    VALUES ($1,$2,$3)
    `,
    [course_id, student_id, finalStatus]
  );

  return NextResponse.json({ message: "Linked" });
}

export async function PATCH(req) {
  const { course_id, student_id, status } = await req.json();

  const result = await pool.query(
    `
    UPDATE course_students
    SET status = $3
    WHERE course_id = $1 AND student_id = $2
    RETURNING *
    `,
    [course_id, student_id, status]
  );

  if (result.rowCount === 0) {
    return NextResponse.json(
      { error: "Record not found" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Status updated" });
}

// ✅ COMPLETE course (only ACTIVE → COMPLETED)
export async function PUT(req) {
  const { course_id, student_id } = await req.json();

  const result = await pool.query(
    `
    UPDATE course_students
    SET status = 'COMPLETED'
    WHERE course_id=$1 
      AND student_id=$2
      AND status='ACTIVE'
    RETURNING *
    `,
    [course_id, student_id]
  );

  if (result.rowCount === 0) {
    return NextResponse.json(
      { error: "No active course found to complete" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Course completed" });
}

// ✅ UNLINK student
export async function DELETE(req) {
  const { course_id, student_id } = await req.json();

  await pool.query(
    `
    DELETE FROM course_students
    WHERE course_id=$1 AND student_id=$2
    `,
    [course_id, student_id]
  );

  return NextResponse.json({ message: "Unlinked" });
}