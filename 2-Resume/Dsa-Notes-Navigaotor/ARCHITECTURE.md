# 🧠 ARCHITECTURE.md (PRIVATE)

This document explains **how and why** the system is built the way it is.
It is **not marketing**, **not a tutorial**, and **not public-facing**.

Primary goals:
- Zero GitHub API abuse
- Predictable UX under limits
- No accidental architectural drift
- Easy debugging under pressure

---

## 🧩 HIGH-LEVEL SYSTEM OVERVIEW

This is a **client-heavy SPA** with **server-enforced access control**.

Core principle:
> **Frontend never decides access. Backend always does.**

GitHub API calls are:
- Centralized
- Quota-gated
- Session-locked
- Never exposed directly to the client

---

## 🧠 MENTAL MODEL

Browser (SPA)
├─ RepoShell (state machine)
│ ├─ RepoContent → /api/markdown
│ ├─ Sidebar (static index)
│ ├─ Search (Fuse.js)
│ └─ Blocked UI / Token Modal
│
Server (Next.js API)
├─ /api/markdown ← 🔐 gatekeeper
│ ├─ authorizeRequest()
│ ├─ quota check (NO mutation)
│ ├─ GitHub fetch
│ └─ quota consume (AFTER success)
│
Redis (Upstash)
├─ token meta
├─ quota counters
└─ session locks

---

## 🧱 CORE DESIGN DECISIONS (NON-NEGOTIABLE)

### 1️⃣ SPA WITHOUT ROUTE REMOUNTS
- Navigation is hash-based
- `activePath` lives in React state
- No page-level remounts
- Prevents refetch storms
- Keeps scroll, TOC, split view stable

**Tradeoff:**  
More client-side complexity, but full control.

---

### 2️⃣ SINGLE SCROLL CONTAINER
- No `window.scroll`
- One scroll ref per pane
- TOC + keyboard shortcuts depend on this

**Why:**  
Window scroll breaks split view, TOC sync, and mobile predictability.

---

### 3️⃣ BACKEND-FIRST ACCESS CONTROL

Frontend assumptions:
- Tokens may be invalid at any time
- Quota may change mid-session
- Admin actions override client state

Backend is the source of truth.

---

## 🔐 TOKEN & ACCESS ARCHITECTURE

### Identity Model

Each request is identified by:
- `x-dev-token` → access identity
- `x-session-id` → browser instance

If no user token is present, a public token may be injected via  
`NEXT_PUBLIC_PUBLIC_TOKEN` for anonymous access.

No IP-based logic.  
No cookies for public users.

---

### Token Types (Conceptual)

There is **no special casing in code** — behavior is driven by meta.

token:<token>:meta {
name
quotaScope // session | token
resetPolicy // daily | never
limit
enabled
}


---

### Session Lock (Anti-sharing)



token:<token>:active_session = <sessionId>


- TTL-based sliding lock
- Same session refreshes TTL
- Different session → hard block

This prevents:
- Token sharing
- Parallel scraping
- Tab-spawn abuse

---

## 📊 QUOTA FLOW (CRITICAL PATH)

### ✅ Correct Flow (DO NOT CHANGE)

1. Client → `/api/markdown`
2. `authorizeRequest()`
   - load token meta  
   - validate enabled state  
   - acquire / refresh session lock  
   - check quota (NO mutation)  
3. Fetch from GitHub
4. On success → `consumeQuota()`

**Quota is NEVER consumed before GitHub succeeds.**

---

### ❌ Anti-patterns (Never Do This)
- Consuming quota before fetch
- Consuming quota in middleware
- Letting frontend decide remaining quota
- Using Redis `KEYS`
- Mixing admin logic with public routes

---

## 🔁 FRONTEND FETCH INVARIANTS

Markdown fetches MUST be triggered only by:



activePath + owner + repo + branch


Auth state, quota state, token changes, and UI handlers  
MUST NOT participate in fetch dependency logic.

**Security is a gate, not a trigger.**

---

## 🚫 BLOCKED UX ARCHITECTURE

States:



ok
blocked (with reason)
awaiting_token


Rules:
- Blocked UI overlays the app shell
- Last successful content may remain visible
- No new markdown fetches are attempted while blocked
- Retry triggers a controlled re-check
- Token entry explicitly mutates localStorage

Blocked UI exists because:
> A silent failure looks like a bug. A clear block looks intentional.

---

## 🧑‍💻 ADMIN ARCHITECTURE

### Admin Auth
- Password-based
- httpOnly cookie
- Checked via middleware
- No client-side trust

### Admin APIs
- SCAN-based iteration only  
  (KEYS is forbidden due to O(N) blocking behavior)
- Token state changes are immediate
- No cache invalidation required (Redis = source)

Admin UI is **secondary**.  
Backend correctness comes first.

---

## 🧭 ONBOARDING STRATEGY

- No forced default problem
- Empty state explains philosophy
- Guided tour explains:
  - Navigation
  - Revision mode
  - Split view
  - Draw mode
  - Fair usage limits

This avoids:
- Surprise blocks
- Confusion on first load
- Accidental quota burn

---

## ⚠️ KNOWN TRADEOFFS (ACCEPTED)

- Client code is large (RepoShell is heavy)
- No SSR for markdown content
- Redis free-tier constraints shape design
- Token system is stricter than necessary (by design)

These are intentional.

---

## 🧨 FAILURE MODES TO WATCH

1. Redis availability / TTL logic  
2. Session ID mismatch  
3. Token disabled by admin  
4. Quota key mismatch (scope / resetPolicy)  
5. Accidental double-fetch  
6. Effect dependency contamination (auth state causing refetch loops)

---

## 🔒 FINAL RULES (DO NOT VIOLATE)

- Backend decides access  
- Frontend reflects reality  
- One scroll container  
- One fetch per intent  
- No silent failures  
- No clever shortcuts  
- Auth must never cause content to re-render  

If a change violates any of these,  
**it is the wrong change.**