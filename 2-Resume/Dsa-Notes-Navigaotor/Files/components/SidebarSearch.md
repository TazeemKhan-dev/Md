"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { X } from "lucide-react";

type Props = {
  index: any;
  onClose: () => void;
  onNavigate: (path: string) => void;
};
function flattenTree(nodes: any[], acc: any[] = []) {
  for (const node of nodes) {
    if (node.type === "file") {
      acc.push(node);
    }

    if (node.type === "folder") {
      flattenTree(node.children ?? [], acc);
    }
  }
  return acc;
}

export default function SidebarSearch({ index, onClose, onNavigate }: Props) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
const files = useMemo(() => {
  if (!Array.isArray(index)) return [];

  const flat = flattenTree(index);

  return flat.map((file: any) => {
    const parts = file.path.split("/");
    const topic =
      parts.length > 1
        ? parts[parts.length - 2] // parent folder
        : "Root";

    return {
      title: file.title,
      path: file.path,
      topic: topic.replace(/-/g, " "),
    };
  });
}, [index]);


  const fuse = useMemo(
    () =>
      new Fuse(files, {
        keys: ["title", "topic"],
        threshold: 0.3,
      }),
    [files]
  );

  const results = useMemo(
    () => (query ? fuse.search(query).slice(0, 10) : []),
    [fuse, query]
  );

  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % Math.max(results.length, 1));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(
          (i) => (i - 1 + results.length) % Math.max(results.length, 1)
        );
        return;
      }

      if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        onNavigate(results[activeIndex].item.path);
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [results, activeIndex, onNavigate, onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[500] bg-black/40 flex items-start justify-center pt-24 backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={panelRef}
        className="w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border"
        style={{
          backgroundColor: "var(--ui-bg)",
          borderColor: "var(--ui-border)",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center border-b p-1"
          style={{ borderColor: "var(--ui-border)" }}
        >
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes..."
            className="flex-1 px-4 py-3 text-base outline-none bg-transparent"
            style={{ color: "var(--ui-text)" }}
          />

          <button
            onClick={onClose}
            className="p-2 mr-2 rounded-lg"
            style={{ color: "var(--ui-text-muted)" }}
          >
            <X size={20} />
          </button>
        </div>

        <ul className="max-h-[400px] overflow-y-auto p-2">
          {results.map(({ item }, index) => {
            const isActive = index === activeIndex;

            return (
              <li key={item.path}>
                <button
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  onClick={() => {
                    onNavigate(item.path);
                    onClose();
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "hover:bg-[var(--ui-hover)]"
                  }`}
                >
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-xs opacity-70">{item.topic}</div>
                </button>
              </li>
            );
          })}

          {query && results.length === 0 && (
            <li className="px-6 py-10 text-center opacity-60">
              No results found for "{query}"
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
