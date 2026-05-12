# DSA Notes Navigator – Deterministic Learning Platform

>Production-grade DSA platform featuring a custom GitHub API gateway with session-locked quota control, supporting structured learning via revision workflows and keyboard-first navigation.

---
# What is this project?


“It’s a production-grade DSA learning platform where I built a custom GitHub API gateway with Redis-backed session locks and quota enforcement, so external API usage is deterministic and abuse-proof.”

## Why this exists

I started writing my own DSA notes in Markdown because it was the most flexible and future-proof format for long-term learning. Naturally, those notes lived in GitHub as a repository.

Initially this worked well for storage and version control, but I eventually realized that GitHub’s interface is optimized for source code collaboration and project history — not for structured learning from large collections of Markdown notes. There is no real concept of a “starting point” or learning flow.

As my notes grew, the learning experience started breaking down. GitHub lacks next/previous navigation, split view, dry-run support, full-screen focus mode, and a table of contents for long problem notes. Managing large folders of problems also became inefficient — there’s no easy way to track how many questions exist in a section, no global search across notes, and navigation always forces you through the entire project tree.

More importantly, GitHub is not designed for revision-style learning workflows. While it works well for reading files, it does not support focused study patterns like hiding solutions, navigating between problem and approach sections, switching between different approaches, or quickly moving through problems in a sequence for active recall. Over time, I realized that continuing to use GitHub directly would make systematic revision inefficient and cognitively fragmented.

So I designed a deterministic learning platform on top of GitHub content that adds structured navigation, revision mode, split-view learning, dry-run overlays, TOC tracking, and a focused SPA experience — while keeping GitHub as the source of truth.

---

## System Capabilities

- Backend API gating (no direct GitHub access from browser)
- Token-based identity with session locking
- Redis-backed quota enforcement (daily / lifetime scopes)
- Abuse prevention via concurrent session blocking
- Admin control plane for token and quota management
- Deterministic SPA architecture with zero route remounts

---

## Architecture

```
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
GitHub REST API (Authenticated)
  (Private Repository: Trees + Raw Markdown)

```


Key invariant:

The browser never communicates with GitHub directly.  
All access is mediated through a protected backend gating layer.

---

## Demo Highlight (Revision Workflow)

Focused revision flow:

- Open any problem
- Toggle Revision Mode
- Problem remains visible
- Solution is hidden
- Attempt active recall
- Reveal solution
- Jump to next problem instantly

This demonstrates a learning workflow optimized for cognition, not browsing.

(Include one GIF or screenshot here.)

---

## System Design (How)

The platform is built as a deterministic React SPA backed by a protected Next.js API gateway. The browser never communicates with GitHub directly.

Every request includes a token for identity and a session id for browser instance. The backend validates both against Redis before allowing any GitHub access.

Redis enforces two core invariants:

- a token can only be active in one session at a time  
- every request must pass quota checks before hitting GitHub  

Quotas are only consumed after successful GitHub responses, which prevents charging for failures or cached responses.

On the frontend, the entire app runs inside a single SPA shell with shared state, ensuring no route remounts, no duplicate fetches, and fully deterministic navigation across split views and revision mode.

---

## Resume Summary

**DSA Notes Navigator – Deterministic Learning Platform**  
Personal Project | Next.js, React, Redis, GitHub API

- Designed and built a production-grade learning platform with deterministic SPA navigation, split-view, revision mode, and keyboard-first UX.
- Implemented a backend API gating layer so the browser never calls GitHub directly, ensuring controlled and secure content access.
- Built a token-based identity system with Redis-backed session locking to prevent credential sharing across browsers.
- Designed a quota enforcement system (session / token scoped, daily / lifetime) with pre-check and post-success consumption semantics.
- Implemented abuse prevention by blocking concurrent sessions and enforcing access limits before every GitHub fetch.
- Built an admin control plane to manage tokens, quotas, session scopes, and trigger cache revalidation.
- Architected the frontend as a single SPA shell with zero route remounts and no duplicate backend fetches across views.


## Resume Summary

**DSA Notes Navigator – Deterministic Learning Platform**  
Personal Project | Next.js, React, Redis, GitHub API

Architected a custom API Gateway using Next.js and Upstash Redis to gate GitHub API access, implementing session-locking and sliding-window quotas to prevent API exhaustion and unauthorized token sharing.

Engineered a zero-remount SPA shell using React state and URL hash navigation, enabling persistent split-view containers and independent scroll restoration across thousands of files without full-page reloads.

Developed a Redis-backed identity system with an administrative dashboard for real-time token management, lifecycle control, and granular quota scoping (session vs. token).

Optimized technical UX through keyboard-first navigation, Fuse.js-powered global search, and a “Revision Mode” that converts static Markdown into interactive active-recall workflows.

Optimized data fetching by implementing a Singleton-pattern Promise cache, reducing redundant GitHub API calls by 100% for concurrently rendered split-pane views.

## Resume Summary Advance

**DSA Notes Navigator – Deterministic Learning Platform**  
Personal Project | Next.js, React, Redis, GitHub API

Engineered a high-performance React SPA using Next.js and Tailwind CSS, featuring a custom-built split-pane layout engine with vertical/horizontal resizing and state persistence.

Developed a robust Markdown AST parser that powers dynamic Table of Contents, auto-expanding sidebars, and "Scroll Spy" navigation with Intersection Observer logic.

Implemented a secure, Redis-backed authorization layer featuring session locking to prevent token sharing and ensure transactional quota integrity for GitHub API fetches.

Optimized performance using a custom Promise-based caching layer (Singleton pattern), achieving zero duplicate network requests across simultaneous viewports.

Built a specialized "Revision Mode" and integrated a Canvas-based drawing overlay for interactive problem-solving and logic sketching.

