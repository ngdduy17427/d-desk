import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const image = await fs.readFile(process.cwd() + `/src/assets/images${searchParams.get("image")}`);

  const response = new NextResponse(image);
  response.headers.set("content-type", "image/png");

  return response;
}
