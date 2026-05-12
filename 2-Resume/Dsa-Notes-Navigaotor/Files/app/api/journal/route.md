import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const branch = searchParams.get("branch");
  const path = searchParams.get("path");

  if (!owner || !repo || !branch || !path) {
    return NextResponse.json({ error: "MISSING_PARAMS" }, { status: 400 });
  }

  // 🔐 Admin auth is already enforced by middleware
  // If this handler is running, user is authenticated

  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.raw",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "UPSTREAM_GITHUB_ERROR", status: res.status },
      { status: 502 }
    );
  }

  const text = await res.text();

  return new NextResponse(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
