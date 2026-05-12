# DSA Notes Navigator – Deterministic Learning Platform


# Why this exists

I started writing my own DSA notes in Markdown because it was the most flexible and future-proof format for long-term learning. Naturally, those notes lived in GitHub as a repository.

Initially this worked well for storage and version control, but I eventually realized that GitHub’s interface is optimized for source code collaboration and project history — not for structured learning from large collections of Markdown notes. There is no real concept of a “starting point” or learning flow.

As my notes grew, the learning experience started breaking down. GitHub lacks next/previous navigation, split view, dry-run support, full-screen focus mode, and a table of contents for long problem notes. Managing large folders of problems also became inefficient — there’s no easy way to track how many questions exist in a section, no global search across notes, and navigation always forces you through the entire project tree.

More importantly, GitHub is not designed for revision-style learning workflows. While it works well for reading files, it does not support focused study patterns like hiding solutions, navigating between problem and approach sections, switching between different approaches, or quickly moving through problems in a sequence for active recall. Over time, I realized that continuing to use GitHub directly would make systematic revision inefficient and cognitively fragmented.

So I designed a deterministic learning platform on top of GitHub content that adds structured navigation, revision mode, split-view learning, dry-run overlays, TOC tracking, and a focused SPA experience — while keeping GitHub as the source of truth.

# For resume
DSA Notes Navigator – Deterministic Learning Platform

Personal Project | Next.js, React, Redis, GitHub API

Designed and built a production-grade learning platform with deterministic SPA navigation, split-view, revision mode, and keyboard-first UX.

Implemented a backend API gating layer so the browser never calls GitHub directly, ensuring controlled and secure content access.

Built a token-based identity system with Redis-backed session locking to prevent credential sharing across browsers.

Designed a quota enforcement system (session / token scoped, daily / lifetime) with pre-check and post-success consumption semantics.

Implemented abuse prevention by blocking concurrent sessions and enforcing access limits before every GitHub fetch.

Built an admin control plane to manage tokens, quotas, session scopes, and trigger cache revalidation.

Architected the frontend as a single SPA shell with zero route remounts and no duplicate backend fetches across views.



# 1. Architecture Diagram (copy into README / portfolio)

You can render this as ASCII, or convert it to an image later.

User Browser (React SPA)
  |
  |  x-dev-token
  |  x-session-id
  |
  v
Next.js API Gateway
  (/api/markdown, /api/journal)
  |
  |  Pre-check quota
  |  Enforce session lock
  |
  v
Redis (Upstash)
  - token:<token>:meta
  - token:<token>:active_session
  - quota:session:<sessionId>:<date>
  - quota:token:<token>:<date|lifetime>
  |
  v
GitHub Public API
  (Trees + Raw Markdown)

# 2. One Visible “Wow” (your demo moment)

This is what you show live.

Demo Script (30 seconds)

You literally say this:

Let me show you the revision workflow.

Then:

Open any problem

Toggle Revision Mode

Show:

Problem visible

Solution hidden

Reveal solution

Jump to next problem instantly

What the recruiter sees:

This is not a viewer

This is a learning system

This is designed for cognition, not browsing

This is your killer UX moment.


# 3. System Capabilities (short block)

Put this on your portfolio landing.

System Capabilities

Backend API gating (no direct GitHub access from browser)

Token-based identity with session locking

Redis-backed quota enforcement (daily / lifetime scopes)

Abuse prevention via concurrent session blocking

Admin control plane for token and quota management

Deterministic SPA architecture with zero route remounts

This primes the reader before they even open your resume.


# 4. Strong System Story (How)
This is what you say when asked:

“How is this system built?”

System Story (How)

The platform is built as a deterministic React SPA backed by a protected Next.js API gateway. The browser never communicates with GitHub directly.

Every request includes a token for identity and a session id for browser instance. The backend validates both against Redis before allowing any GitHub access.

Redis enforces two core invariants:
a token can only be active in one session at a time, and
every request must pass quota checks before hitting GitHub.

Quotas are only consumed after successful GitHub responses, which prevents charging for failures or cached responses.

On the frontend, the entire app runs inside a single SPA shell with shared state, ensuring no route remounts, no duplicate fetches, and fully deterministic navigation across split views and revision mode.



DSA Notes Navigator – Deterministic Learning Platform

A deterministic learning platform built on top of GitHub, designed for structured DSA learning with revision workflows, API gating, and quota-safe access.

Why this exists

(your full “why” section, unchanged)

System Capabilities

Backend API gating
Token-based identity with session locking
Redis-backed quota enforcement
Abuse prevention via concurrent session blocking
Admin control plane
Deterministic SPA architecture

Architecture

(your diagram)

Demo Highlight

Revision workflow:

Hide solution

Active recall

Reveal

Jump to next

(one GIF / screenshot)

System Design (How)

(your full system story)

Resume Summary

(your resume bullets)



The one sentence you should say to your sir

When you meet him, say:

“First I want you to look at my resume and tell me honestly if this project feels strong. Then I’ll explain why I built it, and finally I’ll show you the system.”

This makes you look very mature and professional.




What to do in that moment (this is key)

If he says that, you respond with:

“That’s fair. Please read the bullets — the name hides the system behind it.”

Then let him read the resume bullets.

This is the real test:

Does the project become impressive after bullets?

If yes → your resume is doing its job.

If no → then we adjust wording.

If the name alone feels weak (2 options)
Option 1 (what I recommend)

Keep the name, strengthen the subtitle everywhere:

On resume:

DSA Notes Navigator – Deterministic Learning Platform

The subtitle is doing 80% of the work.

Most recruiters will read:

Deterministic Learning Platform
not
DSA Notes Navigator

Option 2 (if your sir is very blunt)

Slightly elevate the name:

Deterministic Learning Platform (DSA Notes Navigator)

Deterministic Learning System for DSA

But honestly, this is optional. Your current one is already fine.

The important insight (this is senior-level)

Your sir is judging surface perception.
You care about depth of engineering.

Real hiring works like this:

Name catches eye (weak signal)

Bullets decide shortlist (strong signal)

Story + demo decides offer (strongest signal)

So even if step 1 is mediocre,
you still win at step 2 and 3.

And that’s what actually matters.

The real success condition

The real question is not:

“Does the name sound cool?”

The real question is:

“After reading the bullets, does he say:
‘Okay, this is actually a serious system.’?”

If the answer is yes → you’re done.

Final mental model (lock this)

Name = packaging

Resume bullets = credibility

Why + website = conversion

Your project is already strong at the two that matter most.

So if your sir says the name feels weak, that’s not a failure —
that’s just feedback on branding, not engineering.

And branding is the easiest thing to tweak if needed.




Final, honest answer

Your next steps are not technical anymore. They are:

Practice the pitch

Practice the demo

Do mock system interviews

Start a new, different system