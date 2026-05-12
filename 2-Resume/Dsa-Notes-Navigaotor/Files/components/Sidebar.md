/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";
import type { Node } from "@/lib/indexer";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import {
  ChevronDown,
  ChevronRight,
  X,
  Folder,
  List,
  ArrowUp,
  ChevronsUpDown,
} from "lucide-react";
import { FileContext } from "./RepoShell";

/* ---------------------------------------------
   Helpers
--------------------------------------------- */
function findParentKeys(
  nodes: any[],
  activePath: string,
  trail: string[] = [],
): string[] {
  for (const node of nodes) {
    if (node.type === "file") {
      if (decodeURIComponent(node.path) === decodeURIComponent(activePath)) {
        return trail;
      }
    }

    if (node.type === "folder" && node.children) {
      const found = findParentKeys(node.children, activePath, [
        ...trail,
        node.path,
      ]);
      if (found.length) return found;
    }
  }
  return [];
}

function collectFolderKeys(nodes: any[], acc: string[] = []) {
  for (const node of nodes) {
    if (node.type === "folder") {
      acc.push(node.path);
      collectFolderKeys(node.children ?? [], acc);
    }
  }
  return acc;
}

/* ---------------------------------------------
   Sidebar
--------------------------------------------- */
const Sidebar = forwardRef<any, any>(function Sidebar({ index, onClose }, ref) {
  const fileCtx = useContext(FileContext);

  const activeRef = useRef<HTMLAnchorElement | null>(null);
  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  /* ---------------------------------------------
     Normalize tree
  --------------------------------------------- */
  const sidebarTree = useMemo(() => {
    if (!Array.isArray(index)) return [];
    return index; // ← trust buildIndex output
  }, [index]);

  /* ---------------------------------------------
     Active ancestor chain
  --------------------------------------------- */
  const activeTopicKeys = useMemo(() => {
    if (!fileCtx?.activePath) return [];
    return findParentKeys(sidebarTree, fileCtx.activePath);
  }, [sidebarTree, fileCtx?.activePath]);

  useEffect(() => {
    if (!activeTopicKeys.length) return;

    setOpenTopics((prev) => {
      const next = { ...prev };
      activeTopicKeys.forEach((k) => (next[k] = true));
      return next;
    });
  }, [activeTopicKeys]);

  useEffect(() => {
    const t = setTimeout(() => {
      activeRef.current?.scrollIntoView({ block: "center" });
    }, 150);
    return () => clearTimeout(t);
  }, [fileCtx?.activePath]);

  /* ---------------------------------------------
     Toggle all
  --------------------------------------------- */
  const allCollapsed = useMemo(() => {
    const keys = collectFolderKeys(sidebarTree);
    return keys.every((k) => !openTopics[k]);
  }, [sidebarTree, openTopics]);

  function toggleAll() {
    const keys = collectFolderKeys(sidebarTree);
    const next: Record<string, boolean> = {};
    keys.forEach((k) => (next[k] = allCollapsed));
    setOpenTopics(next);
  }

  useImperativeHandle(ref, () => ({ toggleAll }));

  /* ---------------------------------------------
     Folder Renderer (UNCHANGED UI)
  --------------------------------------------- */
  function FolderNode({ node }: any) {
    const isOpen = openTopics[node.path] ?? false;
    const isParentOfActive = activeTopicKeys.includes(node.path);
    const files = (node.children ?? [])
      .filter((c: any) => c.type === "file")
      .sort((a: Node, b: Node) => {
        if (a.id == null && b.id == null) {
          return a.title.localeCompare(b.title);
        }
        if (a.id == null) return 1;
        if (b.id == null) return -1;
        return a.id - b.id;
      });


    const folders = (node.children ?? []).filter(
      (c: any) => c.type === "folder",
    );

    return (
      <li key={node.path} className="relative">
        <button
          onClick={() => setOpenTopics((p) => ({ ...p, [node.path]: !isOpen }))}
          className="flex items-center gap-2 py-2 px-4 sticky top-[-8px] z-10 transition-all group -mx-2 w-[calc(100%+1rem)]"
          style={{
            backgroundColor: "var(--ui-bg)",
            borderBottom: isOpen ? "1px solid var(--ui-border)" : "none",
          }}
        >
          <div className={isOpen ? "text-blue-400" : "text-gray-500"}>
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </div>
          <Folder
            size={14}
            className={
              isOpen || isParentOfActive ? "text-blue-500" : "text-gray-500"
            }
          />
          <span
            className="text-[13px] truncate flex-1 text-left"
            style={{
              color:
                isOpen || isParentOfActive
                  ? "var(--ui-text)"
                  : "var(--ui-text-muted)",
              fontWeight: isOpen || isParentOfActive ? 600 : 400,
            }}
          >
            {node.title}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-500/10 text-gray-500 font-mono">
            {files.length}
          </span>
        </button>

        {isOpen && (
          <ul
            className="ml-3 border-l mt-1 space-y-1"
            style={{ borderColor: "var(--ui-border)" }}
          >
            {/* Files */}
            {files.map((file: any, idx: number) => {
              const isActive =
                decodeURIComponent(file.path) ===
                decodeURIComponent(fileCtx?.activePath ?? "");

              return (
                <li key={`file:${file.path}`}>
                  <a
                    ref={isActive ? activeRef : null}
                    onMouseDown={(e) => {
                      if (e.button !== 0) return;
                      e.preventDefault();
                      fileCtx?.setActivePath(file.path);
                      if (isMobile) onClose();
                    }}
                    className="group relative flex items-start gap-2.5 py-2 pl-4 pr-2 text-[13px] transition-all hover:bg-white/5 rounded-r-md"
                    style={{
                      color: isActive ? "#58a6ff" : "var(--ui-text-muted)",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {isActive && (
                      <div className="absolute left-[-1px] top-2 bottom-2 w-[2px] bg-blue-600 rounded-full" />
                    )}
                    <span className="text-[10px] mt-0.5 font-mono text-gray-500">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="uppercase">{file.title}</span>
                  </a>
                </li>
              );
            })}

            {/* Sub-folders */}
            {folders.map((child: any) => (
              <FolderNode key={child.path} node={child} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  /* ---------------------------------------------
     Render
  --------------------------------------------- */
  return (
    <aside
      className="h-full flex flex-col select-none"
      style={{ backgroundColor: "var(--ui-bg)" }}
    >
      <div className="h-12 flex items-center justify-between px-4 border-b sticky top-0 z-20 bg-[var(--ui-bg)]">
        {/* Title */}
        <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
          Notes
        </span>

        <div className="flex items-center gap-1.5">
          {/* Expand / Collapse ALL */}
          <button
            onClick={toggleAll}
            title={allCollapsed ? "Expand all notes" : "Collapse all notes"}
            className={`p-1.5 rounded-md border transition-colors
      ${
        allCollapsed
          ? "text-gray-500 hover:bg-[var(--ui-hover)]"
          : "text-blue-600 bg-blue-50 dark:bg-blue-500/10"
      }
    `}
          >
      <ChevronsUpDown
  size={14}
  className={`transition-transform ${
    allCollapsed ? "" : "rotate-180"
  }`}
/>

          </button>

          {/* Scroll to top */}
          <button
            onClick={() =>
              scrollContainerRef.current?.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            title="Jump to top"
            className="p-1.5 rounded-md border text-gray-500 hover:bg-[var(--ui-hover)]"
          >
            <ArrowUp size={14} />
          </button>

          {isMobile && (
            <button
              onClick={onClose}
              title="Close notes"
              className="p-1.5 rounded-md text-gray-500 hover:bg-[var(--ui-hover)]"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-2"
        style={{ paddingBottom: "40vh" }}
      >
        <ul className="space-y-1">
          {sidebarTree.map((node: any) =>
            node.type === "folder" ? (
              <FolderNode key={node.path} node={node} />
            ) : (
              <li key={`file:${node.path}`}>
                <a
                  onMouseDown={(e) => {
                    if (e.button !== 0) return;
                    e.preventDefault();
                    fileCtx?.setActivePath(node.path);
                    if (isMobile) onClose();
                  }}
                  className="group flex items-center gap-2.5 py-2 pl-4 pr-2 text-[13px] hover:bg-white/5 rounded-md"
                  style={{ color: "var(--ui-text-muted)" }}
                >
                  <span className="uppercase">{node.title}</span>
                </a>
              </li>
            ),
          )}
        </ul>
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
