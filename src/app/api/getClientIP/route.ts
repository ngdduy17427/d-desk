import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const clientIP = headers().get("x-forwarded-for");

  return NextResponse.json({ clientIP }, { status: 200 });
}
