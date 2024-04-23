import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      markdown: fs.readFileSync(
        path.join(
          process.cwd(),
          `/src/assets/markdown${new URL(request.url).searchParams.get("markdown")}`
        ),
        "utf-8"
      ),
    },
    { status: 200 }
  );
}
