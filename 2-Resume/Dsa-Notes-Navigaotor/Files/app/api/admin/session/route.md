import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import redis from "@/lib/redis";

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("admin-auth")?.value;

  if (!sessionId) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const redisKey = `admin:session:${sessionId}`;
  const exists = await redis.get(redisKey);

  if (!exists) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}
