import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { clientIP: String(request.headers["x-forwarded-for"]).split(",").shift() },
    { status: 200 }
  );
}
