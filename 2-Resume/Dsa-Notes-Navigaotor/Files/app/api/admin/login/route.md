import { NextResponse } from "next/server";
import crypto from "crypto";
import redis from "@/lib/redis";

const ADMIN_SESSION_TTL = 60 * 60 * 6; // 6 hours

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password required" },
        { status: 400 }
      );
    }

const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminPassword) {
  return NextResponse.json(
    { error: "ADMIN_PASSWORD not configured" },
    { status: 500 }
  );
}

const passwordBuf = Buffer.from(password);
const adminBuf = Buffer.from(adminPassword);

if (
  passwordBuf.length !== adminBuf.length ||
  !crypto.timingSafeEqual(passwordBuf, adminBuf)
) {
  return NextResponse.json(
    { error: "Invalid password" },
    { status: 401 }
  );
}


    // 🔐 Create secure admin session
    const sessionId = crypto.randomBytes(32).toString("hex");
    const redisKey = `admin:session:${sessionId}`;

    await redis.set(redisKey, "true", {
      ex: ADMIN_SESSION_TTL,
    });

    const res = NextResponse.json({ success: true });

    res.cookies.set("admin-auth", sessionId, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ADMIN_SESSION_TTL,
    });

    return res;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
