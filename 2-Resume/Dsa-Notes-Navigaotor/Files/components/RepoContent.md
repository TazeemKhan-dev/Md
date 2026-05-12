"use client";

import { useContext, useEffect, useState } from "react";
import { FileContext } from "./RepoShell";
import MarkdownViewer from "./MarkdownViewer";
import { fetchMarkdownFile, BlockedError } from "@/lib/github";

import MarkdownSkeleton from "./MarkdownSkeleton";

type Props = {
  owner: string;
  repo: string;
  branch: string;
  prevFile?: { path: string; title: string };
  nextFile?: { path: string; title: string };
  onNavigate: (path: string) => void;
  accessVersion: number;
  onBlocked: (reason: string) => void;
  onMarkdownLoaded?: (md: string) => void;
  apiBase?: string;
  containerRef?: React.RefObject<HTMLDivElement | null>;

  activeScrollRef?: React.RefObject<HTMLDivElement | null>;
  hideTopButton?: boolean;
  scrollId?: "single" | "left" | "right";
};


export default function RepoContent({
  owner,
  repo,
  branch,
  prevFile,
  nextFile,
  onNavigate,
  accessVersion,
  onBlocked,
  onMarkdownLoaded,
  apiBase = "/api/markdown",
  containerRef,
  activeScrollRef,
  hideTopButton,
  scrollId = "single",
}: Props) {
  const fileCtx = useContext(FileContext);
  const activePath = fileCtx?.activePath ?? null;

  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (activePath == null) {
      setContent(null);
      return;
    }

    const path = activePath;
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const md = await fetchMarkdownFile(owner, repo, branch, path, apiBase);

        if (!cancelled) {
          setContent(md);
          onMarkdownLoaded?.(md);
        }
      } catch (err) {
        if (cancelled) return;

        if (err instanceof BlockedError) {
          onBlocked(err.reason);
          return;
        }

        setError("Failed to load note");
        setContent(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [activePath, owner, repo, branch]);

  if (!activePath) {
    return (
      <div className="mt-24 flex justify-center px-4">
        <div className="max-w-md w-full text-center space-y-5 opacity-70">
          <h2 className="text-lg font-semibold tracking-tight">
            Learning Mode Ready
          </h2>
          <p className="text-sm text-[var(--ui-text-muted)] leading-relaxed">
            Pick a problem from the sidebar to begin. Each note is designed for
            clarity, recall, and interview readiness.
          </p>
          <p className="text-[11px] opacity-65">Start anywhere.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-24 text-center text-red-500">
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <>
      {(prevFile || nextFile) && (
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs">
          {prevFile ? (
            <button
              onClick={() => onNavigate(prevFile.path)}
              className="group flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-[var(--ui-hover)]"
            >
              ← {prevFile.title}
            </button>
          ) : (
            <span />
          )}

          {nextFile ? (
            <button
              onClick={() => onNavigate(nextFile.path)}
              className="group flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-[var(--ui-hover)]"
            >
              {nextFile.title} →
            </button>
          ) : (
            <span />
          )}
        </div>
      )}

      {loading ? (
        <MarkdownSkeleton />
      ) : content ? (
        <MarkdownViewer
          content={content}
          containerRef={containerRef}
          activeScrollRef={activeScrollRef}
          hideTopButton={hideTopButton}
          scrollId={scrollId}
        />
      ) : null}
    </>
  );
}
