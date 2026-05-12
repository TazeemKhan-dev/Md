import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const repo = searchParams.get("repo");

  if (!repo) {
    return NextResponse.json({ error: "MISSING_REPO" }, { status: 400 });
  }

  const owner = "TazeemKhan-dev";

  revalidateTag(`tree:${owner}/${repo}`, {});


  return NextResponse.json({ ok: true });
}
