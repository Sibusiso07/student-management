import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const {
      email,
      password,
      role,
      first_name,
      last_name,
      phone,
      date_of_birth,
    } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await pool.query(
      `INSERT INTO users (email, password, role)
       VALUES ($1,$2,$3)
       RETURNING id`,
      [email, hashedPassword, role]
    );

    const userId = userResult.rows[0].id;

    if (role === "ADMIN") {
      await pool.query(
        `INSERT INTO admins (user_id, first_name, last_name, phone)
         VALUES ($1,$2,$3,$4)`,
        [userId, first_name, last_name, phone]
      );
    }

    if (role === "TEACHER") {
      await pool.query(
        `INSERT INTO teachers (user_id, first_name, last_name, phone)
         VALUES ($1,$2,$3,$4)`,
        [userId, first_name, last_name, phone]
      );
    }

    if (role === "STUDENT") {
      await pool.query(
        `INSERT INTO students (user_id, first_name, last_name, date_of_birth, phone)
         VALUES ($1,$2,$3,$4, $5)`,
        [userId, first_name, last_name, date_of_birth, phone]
      );
    }

    return NextResponse.json({ message: "User created" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}