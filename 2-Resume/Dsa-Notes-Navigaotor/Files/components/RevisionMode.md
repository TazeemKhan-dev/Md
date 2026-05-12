"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { fetchMarkdownFile, BlockedError } from "@/lib/github";
import { CodeBlock as MarkdownCodeBlock } from "./MarkdownViewer";

/* ================= TYPES ================= */

interface RevisionModeProps {
  owner: string;
  repo: string;
  branch: string;
  path: string;
  onExit: () => void;
}

type CardSide = "front" | "back";

type Approach = {
  title: string;
  raw: string;
};

/* ================= COMPONENT ================= */

export default function RevisionMode({
  owner,
  repo,
  branch,
  path,
  onExit,
}: RevisionModeProps) {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [side, setSide] = useState<CardSide>("front");
  const [approachIndex, setApproachIndex] = useState(0);

  /* ---------- Scroll Helper ---------- */
  const scrollToTop = useCallback(() => {
    requestAnimationFrame(() => {
      const scroller = document.querySelector("main");
      if (scroller) {
        scroller.scrollTo({ top: 0, behavior: "auto" });
      }
    });
  }, []);

  /* ---------- Fetch Markdown ---------- */
  useEffect(() => {
    if (!path) return;

    let cancelled = false;
    setLoading(true);

    async function load() {
      try {
        const md = await fetchMarkdownFile(owner, repo, branch, path);
        if (!cancelled) {
          setMarkdown(md);
          setSide("front");
          setApproachIndex(0);
        }
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof BlockedError ? "BLOCKED" : "FAILED");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [owner, repo, branch, path]);

  /* ---------- Scroll Trigger ---------- */
  useEffect(() => {
    scrollToTop();
  }, [side, approachIndex, scrollToTop]);

  /* ---------- Parsing ---------- */
  const sections = useMemo(() => {
    if (!markdown) return {};
    return extractSections(markdown);
  }, [markdown]);

  const frontSection = useMemo(() => {
    return (
      sections["problem"] ||
      sections["problem statement"] ||
      sections["problem understanding"] ||
      sections["understand the problem"] ||
      getSectionBeforeExamples(sections)
    );
  }, [sections]);

  const examplesSection =
    sections["example"] ||
    sections["examples"] ||
    sections["examples & edge cases"];

  const approaches = useMemo<Approach[]>(() => {
    const raw = sections["approach"] || sections["approaches"];
    if (!raw) return [];
    return splitApproaches(raw);
  }, [sections]);

  const currentApproach = approaches[approachIndex];

  const approachResult = useMemo(() => {
    if (!currentApproach) return null;
    return extractPreferredCode(currentApproach.raw);
  }, [currentApproach]);

  /* ---------- Controls ---------- */
  const nextApproach = () => {
    if (approachIndex < approaches.length - 1) {
      setApproachIndex((i) => i + 1);
    }
  };

  const prevApproach = () => {
    if (approachIndex > 0) {
      setApproachIndex((i) => i - 1);
    }
  };

  const toggleSide = () => {
    setSide((s) => (s === "front" ? "back" : "front"));
  };

  /* ---------- Keybinds ---------- */
  useEffect(() => {
    if (approaches.length === 0) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prevApproach();
      if (e.key === "ArrowRight") nextApproach();
      if (e.key === " ") {
        e.preventDefault();
        toggleSide();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [approaches.length, approachIndex, side]);

  /* ---------- States ---------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] opacity-60">
        Preparing revision cards…
      </div>
    );
  }

  if (error || !markdown) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-sm opacity-70">Unable to load this note.</p>
        <button onClick={onExit} className="px-4 py-2 rounded-md border">
          Back to Reading
        </button>
      </div>
    );
  }

  /* ---------- Render ---------- */
  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 pb-[20vh]">
        <article className="markdown-body">
          {side === "front" ? (
            <>
              {frontSection && (
                <SectionBlock title="Problem">{frontSection}</SectionBlock>
              )}
              {examplesSection && (
                <SectionBlock title="Examples">{examplesSection}</SectionBlock>
              )}
            </>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between border-b pb-2">
                <h2 className="text-2xl font-bold">{currentApproach?.title}</h2>

                {approaches.length > 1 && (
                  <span
                    className="ml-2 rounded-md px-2 py-0.5 text-[11px] sm:text-sm"
                    style={{
                      backgroundColor: "var(--ui-hover)",
                      color: "var(--ui-text-muted)",
                      border: "1px solid var(--ui-border)",
                    }}
                  >
                    {approachIndex + 1} / {approaches.length}
                  </span>
                )}
              </div>

              {approachResult ? (
                <div className="not-prose">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{ code: MarkdownCodeBlock }}
                  >
                    {`\`\`\`${approachResult.lang}\n${approachResult.code}\n\`\`\``}
                  </ReactMarkdown>
                </div>
              ) : (
                <EmptyBlock label="No solution code found" />
              )}
            </>
          )}
        </article>
      </div>

      {/* ---------- FOOTER ---------- */}
      <div
        className="fixed bottom-0 inset-x-0 z-[200] backdrop-blur-md"
        style={{
          backgroundColor: "var(--content-bg)",
          borderTop: "1px solid var(--ui-border)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-12 py-3 flex items-center gap-3">
          <button
            onClick={prevApproach}
            disabled={side !== "back" || approachIndex === 0}
            className="px-4 py-2 rounded-md disabled:opacity-20 active:scale-95 transition-transform"
            style={{
              backgroundColor: "var(--content-bg)",
              color: "var(--ui-text)",
              border: "1px solid var(--ui-border)",
            }}
          >
            ← Prev
          </button>

          <button
            onClick={toggleSide}
            className="flex-1 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {side === "front" ? "Show Solution" : "Show Problem"}
          </button>

          <button
            onClick={nextApproach}
            disabled={
              side !== "back" || approachIndex === approaches.length - 1
            }
            className="px-4 py-2 rounded-md disabled:opacity-20 active:scale-95 transition-transform"
            style={{
              backgroundColor: "var(--content-bg)",
              color: "var(--ui-text)",
              border: "1px solid var(--ui-border)",
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function getSectionBeforeExamples(sections: Record<string, string>) {
  const keys = Object.keys(sections);
  const idx = keys.findIndex((k) => k.includes("example"));
  return idx > 0 ? sections[keys[idx - 1]] : null;
}

function normalizeHeading(raw: string) {
  return raw
    .toLowerCase()
    .replace(/^\s*\d+[\.\)\-:]*\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSections(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const map: Record<string, string> = {};
  let key: string | null = null;
  let buf: string[] = [];

  for (const line of lines) {
    const m = line.match(/^##\s+(.*)/);
    if (m) {
      if (key) map[key] = buf.join("\n").trim();
      key = normalizeHeading(m[1]);
      buf = [];
    } else if (key) {
      buf.push(line);
    }
  }
  if (key) map[key] = buf.join("\n").trim();
  return map;
}

function splitApproaches(raw: string): Approach[] {
  return raw.split(/\n(?=#+\s*approach\s*\d+)/i).map((b, i) => {
    const lines = b.trim().split(/\r?\n/);
    const m = lines[0].match(/approach\s*(\d+)\s*[:\-]?\s*(.*)/i);
    const num = m?.[1] ?? i + 1;
    const name = m?.[2]?.trim();
    return {
      title: name ? `Approach ${num}: ${name}` : `Approach ${num}`,
      raw: b,
    };
  });
}

function extractPreferredCode(block: string) {
  const matches = [...block.matchAll(/```(\w*)\s*\n([\s\S]*?)```/g)];
  if (!matches.length) return null;

  const java = matches.find((m) => m[1]?.toLowerCase().includes("java"));
  if (java) return { lang: "java", code: java[2].trim() };

  return {
    lang: matches[0][1] || "text",
    code: matches[0][2].trim(),
  };
}

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: string;
}) {
  return (
    <div className="mb-8">
      <h3 className="font-semibold mb-4 text-xl border-b pb-2">{title}</h3>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{ code: MarkdownCodeBlock }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

function EmptyBlock({ label }: { label: string }) {
  return (
    <div className="text-sm opacity-60 italic py-12 text-center border rounded-lg border-dashed">
      {label}
    </div>
  );
}
