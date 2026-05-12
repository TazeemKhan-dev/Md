import { NextResponse } from "next/server";
import { authorizeRequest, consumeQuota } from "@/lib/token";

const GITHUB_API = "https://api.github.com";

function mapAuthReasonToStatus(reason: string) {
  switch (reason) {
    case "QUOTA_EXCEEDED":
      return 429;
    case "TOKEN_IN_USE":
      return 409;
    case "TOKEN_DISABLED":
      return 403;
    case "INVALID_TOKEN":
      return 401;
    default:
      return 403;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const branch = searchParams.get("branch");
  const path = searchParams.get("path");

  const token = req.headers.get("x-dev-token");
  const sessionId = req.headers.get("x-session-id");

  if (!owner || !repo || !branch || !path) {
    return NextResponse.json({ error: "MISSING_PARAMS" }, { status: 400 });
  }

  if (!token || !sessionId) {
    return NextResponse.json(
      { blocked: true, reason: "MISSING_AUTH_HEADERS" },
      { status: 401 }
    );
  }

  // 🔐 Auth + quota check (NO mutation)
  const auth = await authorizeRequest({ token, sessionId });

  if (!auth.allowed) {
    return NextResponse.json(
      { blocked: true, reason: auth.reason },
      { status: mapAuthReasonToStatus(auth.reason) }
    );
  }

  // ⬇️ GitHub fetch
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

  // ✅ Consume quota ONLY after successful fetch
  await consumeQuota(auth.quotaKey, auth.meta.resetPolicy);

  return new NextResponse(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
