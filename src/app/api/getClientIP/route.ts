import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<any>> {
  return NextResponse.json({ clientIP: headers().get("x-forwarded-for") }, { status: 200 });
}
