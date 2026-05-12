import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import { generateToken } from "@/lib/token";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type QuotaScope = "session" | "token";
export type ResetPolicy = "daily" | "never";

export type TokenMeta = {
  name: string;
  quotaScope: QuotaScope;
  resetPolicy: ResetPolicy;
  limit: number;
  enabled: boolean;
  sessionLock: boolean;   
  createdAt: number;
};


/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
async function resetAllTokenQuotas(token: string) {
  let cursor = 0;
  do {
    const [next, keys] = await redis.scan(cursor, {
      match: `quota:token:${token}:*`,
      count: 50,
    });
    cursor = Number(next);
    if (keys.length) await redis.del(...keys);
  } while (cursor !== 0);
}
function sessionLockKey(token: string) {
  return `token:${token}:active_session`;
}

function metaKey(token: string) {
  return `token:${token}:meta`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Admin-visible quota key.
 * Session-scoped quotas are not globally visible.
 */
function adminQuotaKey(token: string, meta: TokenMeta) {
  if (meta.quotaScope === "session") return null;

  if (meta.resetPolicy === "daily") {
    return `quota:token:${token}:${today()}`;
  }

  return `quota:token:${token}:lifetime`;
}

/* ------------------------------------------------------------------ */
/* GET – List all tokens                                               */
/* ------------------------------------------------------------------ */

export async function GET() {
  const tokens: any[] = [];
  let cursor = 0;

  do {
    const [next, keys] = await redis.scan(cursor, {
      match: "token:*:meta",
      count: 50,
    });

    cursor = Number(next);

    for (const key of keys) {
      const meta = await redis.get<TokenMeta>(key);
      if (!meta) continue;

      const token = key.replace("token:", "").replace(":meta", "");

      const quotaKey = adminQuotaKey(token, meta);
      const used = quotaKey
        ? Number((await redis.get(quotaKey)) ?? 0)
        : null; // session-scoped: not globally visible

      tokens.push({
        token,
        used,
        ...meta,
      });
    }
  } while (cursor !== 0);

  return NextResponse.json(tokens);
}

/* ------------------------------------------------------------------ */
/* POST – Create new token                                             */
/* ------------------------------------------------------------------ */

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "INVALID_BODY" }, { status: 400 });
  }

  const { name, quotaScope, resetPolicy, limit, sessionLock } = body;
if (
  typeof name !== "string" ||
  (quotaScope !== "session" && quotaScope !== "token") ||
  (resetPolicy !== "daily" && resetPolicy !== "never") ||
  typeof limit !== "number" ||
  limit <= 0 ||
  typeof sessionLock !== "boolean"
) {
  return NextResponse.json({ error: "INVALID_FIELDS" }, { status: 400 });
}


const token = generateToken();

const meta: TokenMeta = {
  name,
  quotaScope,
  resetPolicy,
  limit,
  enabled: true,
  sessionLock,
  createdAt: Date.now(),
};


  await redis.set(metaKey(token), meta);

  return NextResponse.json({ token, meta });
}

/* ------------------------------------------------------------------ */
/* PATCH – Update token (name / limit / policies / enable)             */
/* ------------------------------------------------------------------ */

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || !body.token) {
    return NextResponse.json({ error: "INVALID_BODY" }, { status: 400 });
  }

const {
  token,
  name,
  quotaScope,
  resetPolicy,
  limit,
  enabled,
  resetUsage,
  sessionLock
} = body;


  const key = metaKey(token);
  const meta = await redis.get<TokenMeta>(key);

  if (!meta) {
    return NextResponse.json({ error: "INVALID_TOKEN" }, { status: 404 });
  }
const oldScope = meta.quotaScope;

  if (typeof name === "string") meta.name = name;
  if (typeof limit === "number" && limit > 0) meta.limit = limit;
if (typeof enabled === "boolean") {
  const wasDisabled = meta.enabled === false;
  meta.enabled = enabled;

  // 🔓 IMPORTANT: clear session lock when re-enabling token
  if (enabled === true && wasDisabled) {
    await redis.del(sessionLockKey(token));
  }
}

  if (quotaScope === "session" || quotaScope === "token") {
    meta.quotaScope = quotaScope;
  }
if (typeof sessionLock === "boolean") {
  meta.sessionLock = sessionLock;
  await redis.del(sessionLockKey(token)); // clear existing lock
}

  if (resetPolicy === "daily" || resetPolicy === "never") {
    meta.resetPolicy = resetPolicy;
  }
  await redis.set(key, meta);
let quotaReset = false;

if (oldScope === "token" && meta.quotaScope === "session") {
  quotaReset = true;
}

if (resetUsage === true && meta.quotaScope === "token") {
  quotaReset = true;
}

if (quotaReset) {
  await resetAllTokenQuotas(token);
}



  return NextResponse.json({ success: true, meta });
}

/* ------------------------------------------------------------------ */
/* DELETE – Hard delete token                                          */
/* ------------------------------------------------------------------ */

export async function DELETE(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || !body.token) {
    return NextResponse.json({ error: "INVALID_BODY" }, { status: 400 });
  }

  const { token } = body;

const meta = await redis.get<TokenMeta>(metaKey(token));

if (meta && meta.quotaScope === "token") {
  await resetAllTokenQuotas(token);
}

await redis.del(metaKey(token));


  return NextResponse.json({ success: true });
}
