import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(req){

  const { id } = await req.json();

  await pool.query(
    `DELETE FROM users WHERE id=$1`,
    [id]
  );

  return NextResponse.json({message:"deleted"});
}