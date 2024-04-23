import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientIP = String(request.headers["x-forwarded-for"]).split(",").shift();

  console.log(request.headers["x-forwarded-for"]);

  return NextResponse.json({ clientIP }, { status: 200 });
}
