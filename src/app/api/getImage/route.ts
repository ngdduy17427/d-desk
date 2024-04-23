import fs from "fs";
import { NextRequest } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  return new Response(
    fs.readFileSync(
      path.join(
        process.cwd(),
        `/src/assets/images${new URL(request.url).searchParams.get("image")}`
      )
    )
  );
}
