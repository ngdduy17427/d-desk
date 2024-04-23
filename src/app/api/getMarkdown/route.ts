import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const markdownQuery = await fs.readFile(
    process.cwd() + `/src/assets/markdown${searchParams.get("markdown")}`,
    "utf8"
  );

  return NextResponse.json({ markdown: markdownQuery }, { status: 200 });
}
