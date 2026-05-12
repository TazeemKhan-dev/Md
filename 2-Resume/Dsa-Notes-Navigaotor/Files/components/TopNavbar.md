"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Menu,
  List,
  Search,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Info,
  Sun,
  Moon,
  Columns,
  BookOpen,
} from "lucide-react";

interface NavItem {
  path: string;
}

interface TopNavbarProps {
  drawActive: boolean;
  onToggleDraw: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleSidebar: () => void;
  onToggleToc: () => void;
  onSearch: () => void;
  onOpenInfo: () => void;
  prev?: NavItem;
  next?: NavItem;
  onNavigate: (path: string) => void;
  onToggleTheme: () => void;
  theme: "light" | "dark";
  splitMode: "none" | "vertical" | "horizontal";
  onToggleSplit: () => void;
  isRevision: boolean;
  onToggleRevision: () => void;
}

export default function TopNavbar({
  drawActive,
  onToggleDraw,
  onZoomIn,
  onZoomOut,
  onToggleSidebar,
  onToggleToc,
  onSearch,
  onOpenInfo,
  prev,
  next,
  onNavigate,
  onToggleTheme,
  theme,
  splitMode,
  onToggleSplit,
  isRevision,
  onToggleRevision,
}: TopNavbarProps) {
  const isDark = theme === "dark";
  const hoverBg = "var(--ui-hover)";
const router = useRouter();
const pathname = usePathname();

const isNotes = pathname === "/";
const isJournal = pathname.startsWith("/journal");
const [isAdmin, setIsAdmin] = useState(false);


useEffect(() => {
  const check = () => {
    fetch("/api/admin/session", { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) {
          setIsAdmin(false);
          return;
        }

        const data = await r.json();
        setIsAdmin(data.authenticated === true);
      })

      .catch(() => setIsAdmin(false));
  };

  check(); // initial check

  window.addEventListener("admin-session-changed", check);
  return () => window.removeEventListener("admin-session-changed", check);
}, []);
useEffect(() => {
  const onKey = async (e: KeyboardEvent) => {
    if (!e.altKey) return;

    // 🔓 Admin login page (always allowed)
    if (e.key === "3") {
      e.preventDefault();
      window.open("/admin/login", "_blank");
      return;
    }

    // 🔒 Everything below requires admin
    if (!isAdmin) return;

    // Notes
    if (e.key === "1") {
      e.preventDefault();
      router.push("/" + window.location.hash);
    }

    // Journal
    if (e.key === "2") {
      e.preventDefault();
      router.push("/journal" + window.location.hash);
    }

    // 🔥 Revalidate repos
    if (e.key === "4") {
      e.preventDefault();
      try {
        await Promise.all([
          fetch("/api/admin/revalidate?repo=DSA-Notes", { method: "POST" }),
          fetch("/api/admin/revalidate?repo=dsa-journal", { method: "POST" }),
        ]);

        window.dispatchEvent(
          new CustomEvent("admin-toast", {
            detail: "Content refreshed from GitHub",
          }),
        );
      } catch {
        window.dispatchEvent(
          new CustomEvent("admin-toast", {
            detail: "Revalidation failed",
          }),
        );
      }
    }
  };

  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [isAdmin]);




  return (
    <header
      className="h-12 border-b backdrop-blur-md flex items-center px-2 sm:px-3 shadow-sm select-none sticky top-0 z-50"
      style={{
        backgroundColor: isDark
          ? "rgba(15, 23, 42, 0.8)"
          : "rgba(255, 255, 255, 0.8)",
        borderColor: "var(--ui-border)",
        color: "var(--ui-text)",
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <button
          aria-label="Toggle Sidebar"
          data-tour="sidebar"
          onClick={onToggleSidebar}
          title="Toggle Sidebar (Ctrl + B)"
          className="p-2 rounded-lg"
          style={{ color: isDark ? "#94a3b8" : "#1f2937" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = hoverBg;
            e.currentTarget.style.color = isDark ? "#e2e8f0" : "#020617";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = isDark ? "#94a3b8" : "#1f2937";
          }}
        >
          <Menu size={20} />
        </button>
        <button
          data-tour="revision"
          onClick={onToggleRevision}
          className={`
    p-2 rounded-md transition-colors
    ${
      isRevision
        ? "text-blue-600 dark:text-blue-400"
        : "text-[var(--ui-text-muted)]"
    }
    hover:bg-[var(--ui-hover)]
  `}
          title="Revision Mode"
        >
          <BookOpen size={18} />
        </button>

        <button
          aria-label="Toggle Theme"
          onClick={onToggleTheme}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="p-2 rounded-lg"
          style={{
            color: isDark ? "#fbbf24" : "#6d28d9",
            backgroundColor: isDark ? "transparent" : "rgba(109,40,217,0.06)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = hoverBg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isDark
              ? "transparent"
              : "rgba(109,40,217,0.06)";
          }}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="hidden xs:flex px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[10px] font-black tracking-widest ml-1 shadow-sm border border-blue-400/30">
          TAZEEM
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
        {/* Mobile Prev */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => prev && onNavigate(prev.path)}
        >
          <ArrowLeft size={18} />
        </button>

        {/* Mobile Next */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => next && onNavigate(next.path)}
        >
          <ArrowRight size={18} />
        </button>

        {/* Prev / Next */}
        <div
          className="hidden md:flex items-center rounded-lg p-0.5 border"
          style={{
            backgroundColor: "var(--ui-bg-soft)",
            borderColor: "var(--ui-border)",
          }}
        >
          <button
            aria-label="Previous Note"
            onClick={() => prev && onNavigate(prev.path)}
            disabled={!prev}
            title="Previous Note (Alt + Left)"
            className="p-1.5 rounded-md disabled:opacity-30"
            style={{ color: isDark ? "#cbd5e1" : "#1f2937" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = hoverBg)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <ArrowLeft size={16} />
          </button>

          <button
            aria-label="Next Note"
            onClick={() => next && onNavigate(next.path)}
            disabled={!next}
            title="Next Note (Alt + Right)"
            className="p-1.5 rounded-md disabled:opacity-30"
            style={{ color: isDark ? "#cbd5e1" : "#1f2937" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = hoverBg)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Zoom */}
        <div
          className="hidden md:flex items-center gap-1 pr-2 mr-1 border-r"
          style={{ borderColor: "var(--ui-border)" }}
        >
          <button
            aria-label="Zoom Out"
            onClick={onZoomOut}
            title="Zoom Out (Alt + -)"
            className="p-1.5"
            style={{ color: isDark ? "#34d399" : "#047857" }}
          >
            <Minus size={14} />
          </button>
          <button
            aria-label="Zoom In"
            onClick={onZoomIn}
            title="Zoom In (Alt + =)"
            className="p-1.5"
            style={{ color: isDark ? "#34d399" : "#047857" }}
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5">
          <button
            aria-label="Search"
            data-tour="search"
            onClick={onSearch}
            title="Search (Ctrl + K)"
            className="p-2 rounded-lg"
            style={{ color: isDark ? "#818cf8" : "#3730a3" }}
          >
            <Search size={18} />
          </button>

          {!isRevision && (
            <button
              aria-label="Split View"
              data-tour="split"
              onClick={onToggleSplit}
              title="Split View (Ctrl + \\)"
              className={`hidden md:flex p-2 rounded-lg transition-all ${
                splitMode !== "none"
                  ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                  : ""
              }`}
              style={{
                color:
                  splitMode === "none"
                    ? isDark
                      ? "#94a3b8"
                      : "#1f2937"
                    : undefined,
              }}
            >
              <Columns size={18} />
            </button>
          )}

          <button
            aria-label="Toggle Drawing"
            data-tour="draw"
            onClick={onToggleDraw}
            className={`p-2 rounded-md transition-all flex items-center gap-2 ${
              drawActive
                ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-105"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            ✏️
          </button>
          <button
            aria-label="Info / Help"
            onClick={onOpenInfo}
            title="Info, Help & About (?)"
            className="p-2 rounded-lg"
            style={{ color: isDark ? "#38bdf8" : "#0369a1" }}
          >
            <Info size={18} />
          </button>
        </div>

        {/* TOC */}
        {!isRevision && (
          <button
            aria-label="Toggle TOC"
            data-tour="toc"
            onClick={onToggleToc}
            title="Toggle TOC (Ctrl + Shift + B)"
            className="p-2 rounded-lg"
            style={{ color: isDark ? "#94a3b8" : "#1f2937" }}
          >
            <List size={20} />
          </button>
        )}
      </div>
    </header>
  );
}
