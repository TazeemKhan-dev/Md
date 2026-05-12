@import "tailwindcss";
@import "github-markdown-css/github-markdown.css";

/* ================================
   THEME ROOT
================================ */

:root {
  color-scheme: light;
}

/* ================================
   LIGHT / DARK BODY
================================ */

html[data-theme="light"] body {
  background-color: #ffffff;
  color: #24292f;
}

html[data-theme="dark"] body {
  background-color: #0d1117;
  color: #c9d1d9;
}

/* ================================
   SCROLLBAR (HIDDEN)
================================ */

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* ================================
   ALLOW SCROLLBAR FOR CODE BLOCKS
================================ */

  .markdown-body pre code::-webkit-scrollbar {

  height: 8px;
}
.markdown-body pre code::-webkit-scrollbar-thumb {
  background-color: var(--ui-border);
  border-radius: 6px;
}

.markdown-body pre code::-webkit-scrollbar-track {
  background: transparent;
}

/* Firefox */
.markdown-body pre code {
  scrollbar-width: thin;
}


/* ✅ Code scroll container */
.markdown-body pre code {
  display: block;
  overflow-x: auto;
  white-space: pre;
  padding-right: 48px; /* space for copy button */
}

/* Mobile touch stability */
@media (hover: none) {
  .markdown-body pre code {
    -webkit-overflow-scrolling: touch;
  }
}

/* ================================
   MARKDOWN BASE (GITHUB OWNED)
================================ */

.markdown-body {
  background: transparent;
  margin: 0;
  padding: 0;
  max-width: 100%;
}

.markdown-body > * {
  max-width: 100%;
}

/* ================================
   DARK MODE — TEXT ONLY
================================ */

html[data-theme="dark"] .markdown-body {
  color: #c9d1d9;
}

html[data-theme="dark"] .markdown-body h1,
html[data-theme="dark"] .markdown-body h2,
html[data-theme="dark"] .markdown-body h3,
html[data-theme="dark"] .markdown-body h4,
html[data-theme="dark"] .markdown-body h5,
html[data-theme="dark"] .markdown-body h6 {
  color: #e6edf3;
  border-color: #30363d;
}

html[data-theme="dark"] .markdown-body p,
html[data-theme="dark"] .markdown-body li {
  color: #c9d1d9;
}

html[data-theme="dark"] .markdown-body a {
  color: #58a6ff;
}

html[data-theme="dark"] .markdown-body a:hover {
  color: #79c0ff;
}

html[data-theme="dark"] .markdown-body blockquote {
  color: #8b949e;
  border-left-color: #30363d;
  background-color: #0d1117;
}

html[data-theme="dark"] .markdown-body hr {
  border-color: #30363d;
}

html[data-theme="dark"] .markdown-body table tr {
  background-color: #0d1117;
}

html[data-theme="dark"] .markdown-body table tr:nth-child(2n) {
  background-color: #161b22;
}

html[data-theme="dark"] .markdown-body table th,
html[data-theme="dark"] .markdown-body table td {
  border-color: #30363d;
}

/* ================================
   INLINE CODE ONLY
================================ */

html[data-theme="dark"] .markdown-body code:not(pre code) {
  background-color: #30363d;
  color: #e6edf3;
  padding: 0.2em 0.4em;
  border-radius: 6px;
}

/* ================================
   UI VARIABLES
================================ */

html[data-theme="light"] {
  --content-bg: #ffffff;
  --ui-bg: #ffffff;
  --ui-bg-soft: #f6f8fa;
  --ui-border: #d0d7de;
  --ui-text: #24292f;
  --ui-text-muted: #57606a;
  --ui-hover: #f3f4f6;
  --ui-active: #eaeef2;
}

html[data-theme="dark"] {
  --content-bg: #0d1117;
  --ui-bg: #161b22;
  --ui-bg-soft: #0d1117;
  --ui-border: #30363d;
  --ui-text: #c9d1d9;
  --ui-text-muted: #8b949e;
  --ui-hover: #21262d;
  --ui-active: #30363d;
}

/* ================================
   MARKDOWN SPACING
================================ */

.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  margin-top: 1.6em;
  margin-bottom: 0.6em;
}

.markdown-body p {
  margin: 0.6em 0;
}

.markdown-body hr {
  margin: 1.5em 0;
  height: 1px;
  background-color: var(--ui-border);
}


.markdown-body ul,
.markdown-body ol {
  margin: 0.6em 0;
  padding-left: 1.25em; /* base indent */
}

.markdown-body ul ul,
.markdown-body ol ol,
.markdown-body ul ol,
.markdown-body ol ul {
  padding-left: 1em;
}
.markdown-body li {
  padding-left: 0.25em;
  line-height: 1.6;
}
@media (max-width: 640px) {
  .markdown-body ul,
  .markdown-body ol {
    padding-left: 1em;
  }

  .markdown-body ul ul,
  .markdown-body ol ol,
  .markdown-body ul ol,
  .markdown-body ol ul {
    padding-left: 0.75em;
  }
}
.markdown-body li::marker {
  font-weight: 500;
}

/* ================================
   🔥 KILL GITHUB HIGHLIGHT WRAPPER
   (THIS FIXES DOUBLE BOX)
================================ */

.markdown-body .highlight {
  background: none !important;
  border: none !important;
  padding: 0 !important;
}

.markdown-body .highlight pre {
  margin: 0;
}

/* ================================
   SINGLE CUSTOM CODE BLOCK
================================ */

.markdown-body pre {
  position: relative;
  border-radius: 12px;
  padding: 16px;
  overflow: hidden; /* ✅ FIX */
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  color: #24292f;
}


/* Dark mode */
html[data-theme="dark"] .markdown-body pre {
  background-color: #161b22;
  border: 1px solid #30363d;
  color: #c9d1d9;
}

html[data-theme="dark"] .markdown-body pre code {
  background: transparent;
  color: inherit;
}

/* ================================
   LIGHT MODE MOBILE SAFETY
================================ */

html[data-theme="light"] .markdown-body,
html[data-theme="light"] .markdown-body p,
html[data-theme="light"] .markdown-body li {
  color: #24292f;
}

html[data-theme="light"] .markdown-body h1,
html[data-theme="light"] .markdown-body h2,
html[data-theme="light"] .markdown-body h3,
html[data-theme="light"] .markdown-body h4,
html[data-theme="light"] .markdown-body h5,
html[data-theme="light"] .markdown-body h6 {
  color: #24292f;
}

/* ================================
   PREV / NEXT NAV
================================ */

.md-nav-links a {
  color: #24292f;
  font-weight: 500;
}

.md-nav-links a:hover {
  background-color: var(--ui-hover);
}

html[data-theme="dark"] .md-nav-links a {
  color: #e6edf3;
}

html[data-theme="dark"] .md-nav-links a:hover {
  color: #79c0ff;
}

/* ================================
   TOUR HIGHLIGHT
================================ */

.tour-highlight {
  position: relative;
  z-index: 350;
  border-radius: 10px;
}

html[data-theme="light"] .tour-highlight::after {
  content: "";
  position: absolute;
  inset: -8px;
  border-radius: 12px;
  box-shadow:
    0 0 0 9999px rgba(0, 0, 0, 0.55),
    0 0 0 3px rgba(37, 99, 235, 0.9);
  pointer-events: none;
}

html[data-theme="dark"] .tour-highlight::after {
  content: "";
  position: absolute;
  inset: -8px;
  border-radius: 12px;
  box-shadow:
    0 0 0 9999px rgba(0, 0, 0, 0.35),
    0 0 0 2px #ffffff,
    0 0 0 4px rgba(147, 197, 253, 0.95),
    0 0 20px rgba(147, 197, 253, 0.7);
  pointer-events: none;
}

/* ================================
   PAGE BACKGROUND
================================ */

html,
body {
  background-color: var(--ui-bg-soft);
  color: var(--ui-text);
}

/* ================================
   SINGLE CODE BLOCK (FINAL FIX)
================================ */

/* GitHub wrapper */
.markdown-body .highlight {
  position: relative;
}
/* ================================
   COPY BUTTON — FINAL FIX
================================ */

/* Anchor positioning */
.markdown-body pre {
  position: relative;
}

/* Button base */
.markdown-body pre .copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;

  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid var(--ui-border);

  background: var(--content-bg);
  color: var(--ui-text);

  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease, background-color 0.15s ease;
}

/* Show on hover (desktop) */
.markdown-body pre:hover .copy-btn {
  opacity: 1;
}

/* Always visible on touch devices */
@media (hover: none) {
  .markdown-body pre .copy-btn {
    opacity: 1;
  }
}

/* Hover feedback */
.markdown-body pre .copy-btn:hover {
  background-color: var(--ui-hover);
}

/* Dark mode code block */
html[data-theme="dark"] .markdown-body pre {
  background-color: #161b22;
  border: 1px solid #30363d;
}

/* Light mode code block */
html[data-theme="light"] .markdown-body pre {
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
}
/* ================================
   DRAWING OVERLAY FIXES
================================ */

/* Ensure the canvas container is truly transparent */
.react-sketch-canvas {
  background-color: transparent !important;
}

/* Fix for potential invisible strokes due to SVG resets */
.react-sketch-canvas svg {
  background: transparent !important;
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}

/* Ensure drawing strokes are not affected by GitHub Markdown color overrides */
.react-sketch-canvas path {
  fill: none; /* Strokes must not have a fill */
}

pre code {
  display: block;
  white-space: pre;
}


