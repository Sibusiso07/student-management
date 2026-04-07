import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  const {
    email,
    first_name,
    last_name,
    phone,
    role,
    is_active
  } = body;

  await pool.query(
    `
    UPDATE users
    SET email = $1,
        first_name = $2,
        last_name = $3,
        phone = $4,
        role = $5,
        is_active = $6
    WHERE id = $7
    `,
    [email, first_name, last_name, phone, role, is_active, id]
  );

  return NextResponse.json({ success: true });
}