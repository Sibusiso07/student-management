import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req){

  const { id, email } = await req.json();

  await pool.query(
    `UPDATE users SET email=$1 WHERE id=$2`,
    [email,id]
  );

  return NextResponse.json({message:"updated"});
}