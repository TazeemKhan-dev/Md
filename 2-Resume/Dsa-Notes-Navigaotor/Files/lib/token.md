import { Redis } from "@upstash/redis";
import crypto from "crypto";

const redis = Redis.fromEnv();

/* ------------------------------------------------------------------ */
/* TYPES                                                               */
/* ------------------------------------------------------------------ */

export type QuotaScope = "session" | "token";
export type ResetPolicy = "daily" | "never";
export interface TokenMeta {
  name: string;
  quotaScope: QuotaScope;
  resetPolicy: ResetPolicy;
  limit: number;
  enabled: boolean;
  sessionLock: boolean;  
  createdAt: number;
}


/* ------------------------------------------------------------------ */
/* UTILS                                                               */
/* ------------------------------------------------------------------ */

export function generateToken(): string {
  return crypto.randomBytes(24).toString("hex");
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function endOfDayTTL(): number {
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return Math.max(1, Math.floor((end.getTime() - now.getTime()) / 1000));
}

function metaKey(token: string) {
  return `token:${token}:meta`;
}

function sessionLockKey(token: string) {
  return `token:${token}:active_session`;
}

/* ------------------------------------------------------------------ */
/* TOKEN META                                                          */
/* ------------------------------------------------------------------ */

export async function getTokenMeta(token: string): Promise<TokenMeta | null> {
  return redis.get<TokenMeta>(metaKey(token));
}

/* ------------------------------------------------------------------ */
/* SESSION LOCK (ANTI-SHARING)                                         */
/* ------------------------------------------------------------------ */

const SESSION_LOCK_TTL_SECONDS = 300; 


export async function acquireSessionLock(
  token: string,
  sessionId: string
): Promise<boolean> {
  const key = sessionLockKey(token);
  const existing = await redis.get<string>(key);

  if (!existing) {
    await redis.set(key, sessionId, { ex: SESSION_LOCK_TTL_SECONDS });
    return true;
  }

  if (existing === sessionId) {
    await redis.expire(key, SESSION_LOCK_TTL_SECONDS);
    return true;
  }

  return false;
}

/* ------------------------------------------------------------------ */
/* QUOTA                                                               */
/* ------------------------------------------------------------------ */
export async function checkQuota(
  meta: TokenMeta,
  token: string,
  sessionId: string
): Promise<{ allowed: boolean; remaining?: number; key: string }> {
  const key = quotaKey(meta, token, sessionId);
  const current = (await redis.get<number>(key)) ?? 0;

  if (current >= meta.limit) {
    return { allowed: false, key };
  }

  return {
    allowed: true,
    remaining: meta.limit - current,
    key,
  };
}

export async function consumeQuota(
  key: string,
  resetPolicy: ResetPolicy
): Promise<void> {
  const next = await redis.incr(key);

  if (next === 1 && resetPolicy === "daily") {
    await redis.expire(key, endOfDayTTL());
  }
}

function quotaKey(
  meta: TokenMeta,
  token: string,
  sessionId: string
) {
  const scope =
    meta.quotaScope === "session"
      ? `session:${sessionId}`
      : `token:${token}`;

  if (meta.resetPolicy === "daily") {
    return `quota:${scope}:${today()}`;
  }

  return `quota:${scope}:lifetime`;
}

/* ------------------------------------------------------------------ */
/* AUTH GATE                                                           */
/* ------------------------------------------------------------------ */
export type AuthResult =
  | {
      allowed: true;
      remaining?: number;
      meta: TokenMeta;
      quotaKey: string;
    }
  | { allowed: false; reason: string };


export async function authorizeRequest(params: {
  token: string;
  sessionId: string;
}): Promise<AuthResult> {
  const { token, sessionId } = params;

  // 1️⃣ Load token
  const meta = await getTokenMeta(token);
  if (!meta) {
    return { allowed: false, reason: "INVALID_TOKEN" };
  }

  if (!meta.enabled) {
    return { allowed: false, reason: "TOKEN_DISABLED" };
  }

  // 2️⃣ Session lock (prevents sharing)
if (meta.sessionLock) {
  const sessionOk = await acquireSessionLock(token, sessionId);
  if (!sessionOk) {
    return { allowed: false, reason: "TOKEN_IN_USE" };
  }
}


  // 3️⃣ Quota
  // 3️⃣ Quota (CHECK ONLY — do NOT consume here)
if (meta.limit <= 0) {
  return { allowed: false, reason: "TOKEN_DISABLED" };
}
const quota = await checkQuota(meta, token, sessionId);
if (!quota.allowed) {
  return { allowed: false, reason: "QUOTA_EXCEEDED" };
}

return {
  allowed: true,
  remaining: quota.remaining,
  meta,
  quotaKey: quota.key,
};



}
