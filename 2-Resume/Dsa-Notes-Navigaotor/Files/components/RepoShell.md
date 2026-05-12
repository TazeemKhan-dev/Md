"use client";

import { createContext, useEffect, useRef, useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import TableOfContents from "./TableOfContents";
import TopNavbar from "./TopNavbar";
import SidebarSearch from "./SidebarSearch";
import DrawOverlay from "./DrawOverlay";
import { X, Keyboard } from "lucide-react";
import RepoContent from "./RepoContent";
import TokenEntryModal from "./TokenEntryModal";
import GlobalBlockedScreen from "./GlobalBlockedScreen";
import RevisionMode from "./RevisionMode";
import InfoModal from "./InfoModal";
import KeyboardShortcutsInfo from "./info/KeyboardShortcutsInfo";


const CONTENT_CONTAINER_CLASS = `
  mx-auto
  w-full
  max-w-7xl
  min-h-screen
  bg-[var(--content-bg)]
  border-x
  border-[var(--ui-border)]
  px-4
  sm:px-6
  lg:px-8
  pt-6
  pb-[25vh]
`;


function encodePath(p: string) {
  return encodeURIComponent(p);
}

function decodePath(p: string) {
  try {
    return decodeURIComponent(p);
  } catch {
    return p;
  }
}
function flattenIndex(nodes: any[]): any[] {
  const files: any[] = [];

  function walk(list: any[]) {
    for (const node of list) {
      if (node.type === "file") {
        files.push(node);
      }

      if (node.type === "folder") {
        if (node.children) walk(node.children);
      }
    }
  }

  if (Array.isArray(nodes)) {
    walk(nodes);
  }

  return files;
}


export const TocContext = createContext<
  (h: { id: string; text: string; level: number }[]) => void
>(() => {});
export const ScrollContext = createContext<{
  scrollRef: React.RefObject<HTMLDivElement | null>;
} | null>(null);
export const FileContext = createContext<{
  activePath: string | null;
  setActivePath: (p: string) => void;
} | null>(null);
const TOUR_STEPS = [
  {
    title: "Welcome 👋",
    content:
      "These notes are designed for calm, focused DSA learning. This quick tour will show you how to navigate and use the system effectively.",
  },

  {
    title: "Note Explorer",
    content:
      "Browse topics from the sidebar. Your folder state and reading progress are remembered automatically.",
    target: "sidebar",
  },

  {
    title: "Revision Mode 📘",
    content:
      "Switch to Revision Mode for focused recall. Quickly flip between problem and solution without distractions.",
    target: "revision",
  },

  {
    title: "Split View 🧩",
    content:
      "Compare approaches side by side without scrolling. Available in reading mode on desktop.",
    target: "split",
    desktopOnly: true,
    requiresReadMode: true,
    desktopHint:
      "Ctrl + \\ for vertical split, Ctrl + Shift + \\ for horizontal split.",
  },

  {
    title: "Global Search",
    content: "Quickly find any problem or concept across all notes.",
    target: "search",
  },

  {
    title: "Sketch & Think ✏️",
    content:
      "Use the draw tool to sketch logic or dry-run ideas while solving.",
    target: "draw",
    desktopHint: "Press 'D' to toggle draw mode.",
  },

  {
    title: "Table of Contents",
    content: "Navigate long notes easily using the table of contents.",
    target: "toc",
  },

  {
    title: "Keyboard Shortcuts ⌨️",
    content:
      "Prefer the keyboard? Press '?' anytime to see available shortcuts.",
    target: "shortcuts",
    desktopOnly: true,
  },
];



const TOUR_TARGETS: Record<number, string | null> = {
  0: null,
  1: "sidebar",
  2: "revision",
  3: "split",
  4: "search",
  5: "draw",
  6: "toc",
  7: "shortcuts",
};



  export default function RepoShell({
  owner,
  repo,
  index,
  initialPath,
  apiBase = "/api/markdown",
}: any) {

  const [activePath, setActivePath] = useState<string | null>(
    initialPath ?? null,
  );
  
  const orderedFiles = useMemo(() => {
    return flattenIndex(index).map((f: any) => ({
      ...f,
      normalizedPath: decodeURIComponent(f.path),
    }));
  }, [index]);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [navIndex, setNavIndex] = useState<number>(-1);


const leftScrollRef = useRef<HTMLDivElement>(null);
const rightScrollRef = useRef<HTMLDivElement>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [headings, setHeadings] = useState<any[]>([]);
  const [navVisible, setNavVisible] = useState(true);
  const [fontScale, setFontScale] = useState(1);
  const [drawMode, setDrawMode] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const scrollDirection = useRef<"up" | "down" | null>(null);

  const sidebarActionsRef = useRef<{ toggleAll: () => void } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document !== "undefined") {
      const t = document.documentElement.dataset.theme;
      if (t === "dark" || t === "light") return t;
    }
    return "light";
  });
  type AccessState =
    | { status: "ok" }
    | { status: "blocked"; reason: string }
    | { status: "awaiting_token" };

  const [access, setAccess] = useState<AccessState>({ status: "ok" });
  const [blockedReason, setBlockedReason] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
const isValidActivePath =
  activePath &&
  orderedFiles.some((f) => f.normalizedPath === decodeURIComponent(activePath));
const activeScrollRef = useRef<HTMLDivElement | null>(null);



  const [accessVersion, setAccessVersion] = useState(0);
  useEffect(() => {
    const refresh = () => {};

    window.addEventListener("force-access-refresh", refresh);
    return () => window.removeEventListener("force-access-refresh", refresh);
  }, []);
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setActivePath(decodePath(hash));
    }
  }, []);

  const prevRepo = useRef(repo);
useEffect(() => {
  if (window.innerWidth < 768) return;
  if (drawMode) return;

  function onMouseMove(e: MouseEvent) {
    if (!sidebarOpen && e.clientX <= 12) {
      setSidebarOpen(true);
      return;
    }

    if (sidebarOpen) {
      const sidebarWidth = 290;
      const buffer = 40;

      if (e.clientX > sidebarWidth + buffer) {
        setSidebarOpen(false);
      }
    }
  }

  window.addEventListener("mousemove", onMouseMove);
  return () => window.removeEventListener("mousemove", onMouseMove);
}, [sidebarOpen, drawMode]);

useEffect(() => {
  if (window.innerWidth < 768) return;
  if (drawMode) return; 

  function onMouseMove(e: MouseEvent) {
    const vw = window.innerWidth;

    if (!tocOpen && e.clientX >= vw - 12) {
      setTocOpen(true);
      return;
    }

    if (tocOpen) {
      const tocWidth = 270;
      const buffer = 40;

      if (e.clientX < vw - tocWidth - buffer) {
        setTocOpen(false);
      }
    }
  }

  window.addEventListener("mousemove", onMouseMove);
  return () => window.removeEventListener("mousemove", onMouseMove);
}, [tocOpen, drawMode]);



  useEffect(() => {
    if (prevRepo.current === repo) return; // same repo → do nothing

    // only when repo actually changes
    prevRepo.current = repo;

    setActivePath(null);
    setNavIndex(-1);
    history.replaceState(null, "", window.location.pathname);
  }, [repo]);


  const [splitMode, setSplitMode] = useState<
    "none" | "vertical" | "horizontal"
  >("none");
  const [splitRatio, setSplitRatio] = useState(0.5); // 50% / 50%
  const isDragging = useRef(false);
  const startDrag = () => {
    isDragging.current = true;
    document.body.style.cursor =
      splitMode === "horizontal" ? "row-resize" : "col-resize";
  };
useEffect(() => {
  if (typeof window === "undefined") return;

  const hasSeenTour = localStorage.getItem("dsa_tour_seen");
  if (!hasSeenTour) {
    const timer = setTimeout(() => {
      setShowTour(true);
      setCurrentStep(0);
    }, 600);

    return () => clearTimeout(timer);
  }
}, []);

const [adminToast, setAdminToast] = useState<string | null>(null);

useEffect(() => {
  const handler = (e: any) => {
    setAdminToast(e.detail);
    setTimeout(() => setAdminToast(null), 2500);
  };

  window.addEventListener("admin-toast", handler);
  return () => window.removeEventListener("admin-toast", handler);
}, []);

  const stopDrag = () => {
    isDragging.current = false;
    document.body.style.cursor = "";
  };
  useEffect(() => {
    const open = () => setTokenModalOpen(true);
    window.addEventListener("open-token-modal", open);
    return () => window.removeEventListener("open-token-modal", open);
  }, []);
  const [currentMarkdown, setCurrentMarkdown] = useState<string | null>(null);
const startTourFromInfo = () => {
  if (showTour) return;
  setInfoOpen(false);
  setShowTour(true);
  setCurrentStep(0);
};


  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      if (splitMode === "vertical") {
        setSplitRatio(
          Math.min(0.75, Math.max(0.25, e.clientX / window.innerWidth)),
        );
      } else if (splitMode === "horizontal") {
        setSplitRatio(
          Math.min(0.75, Math.max(0.25, e.clientY / window.innerHeight)),
        );
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [splitMode]);

  useEffect(() => {
    if (!activePath) return;

    const hash = encodePath(activePath);

    if (window.location.hash.slice(1) !== hash) {
      const base = window.location.pathname;
      window.history.pushState(null, "", `${base}#${hash}`);

    }
  }, [activePath]);
  useEffect(() => {
    if (!activePath) return;

    scrollRef.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [activePath]);

  
useEffect(() => {
  if (!orderedFiles.length) return;
  if (!activePath) return; // <-- this was missing

  const decoded = decodePath(activePath);

  const exists = orderedFiles.some((f) => f.normalizedPath === decoded);

  if (!exists) {
    history.replaceState(null, "", window.location.pathname);
    setActivePath(null);
  }
}, [orderedFiles]);




  useEffect(() => {
    const onPopState = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setActivePath(null);
      } else {
        setActivePath(decodePath(hash));
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("ui.theme");
    const initialTheme =
      savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";

    setTheme(initialTheme);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ui.theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };
  const skipTour = () => {
    localStorage.setItem("dsa_tour_seen", "true");
    setShowTour(false);
    setCurrentStep(0); // reset step
  };
  useEffect(() => {
    let sid = localStorage.getItem("dev-session-id");
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem("dev-session-id", sid);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    if (!activePath) {
      setNavIndex(-1);
      return;
    }
    const decoded = decodeURIComponent(activePath);

    const idx = orderedFiles.findIndex(
      (f: any) => f.normalizedPath === decoded,
    );

    if (idx !== -1) {
      setNavIndex(idx);
    }
  }, [activePath, orderedFiles]);
  const prevFile = navIndex > 0 ? orderedFiles[navIndex - 1] : null;

  const nextFile =
    navIndex >= 0 && navIndex < orderedFiles.length - 1
      ? orderedFiles[navIndex + 1]
      : null;
  type ViewMode = "read" | "revision";
  const [viewMode, setViewMode] = useState<ViewMode>("read");
  useEffect(() => {
    if (viewMode === "revision") {
      setSplitMode("none");
      setTocOpen(false);
    }
  }, [viewMode]);

useEffect(() => {
  if (splitMode === "none") {
    activeScrollRef.current = scrollRef.current;
  } else {
    // default to left panel when split opens
    activeScrollRef.current = leftScrollRef.current;
  }
}, [splitMode]);

  /* Persistence Logic */
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const hasSeenTour = localStorage.getItem("dsa_tour_seen");

    // 🔹 FIRST VISIT → keep UI calm
    if (!hasSeenTour) {
      setSidebarOpen(false);
      setTocOpen(false);
      return;
    }

    // 🔹 RETURNING USERS → restore layout
    const s = localStorage.getItem("layout.sidebar");
    const t = localStorage.getItem("layout.toc");

    if (!isMobile) {
      if (s !== "closed") setSidebarOpen(true);
      if (t !== "closed") setTocOpen(true);
    }

    const savedScale = localStorage.getItem("markdown.scale");
    if (savedScale) setFontScale(Number(savedScale));
  }, []);

  useEffect(() => {
    localStorage.setItem("layout.sidebar", sidebarOpen ? "open" : "closed");
  }, [sidebarOpen]);
  useEffect(() => {
    localStorage.setItem("layout.toc", tocOpen ? "open" : "closed");
  }, [tocOpen]);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--markdown-font-scale",
      String(fontScale),
    );
    localStorage.setItem("markdown.scale", String(fontScale));
  }, [fontScale]);
useEffect(() => {
  const savedSplit = localStorage.getItem("layout.splitMode");
  const savedRatio = localStorage.getItem("layout.splitRatio");

  if (savedSplit === "vertical" || savedSplit === "horizontal") {
    setSplitMode(savedSplit);
  }

  if (savedRatio) {
    setSplitRatio(Number(savedRatio));
  }
}, []);

useEffect(() => {
  localStorage.setItem("layout.splitMode", splitMode);
  localStorage.setItem("layout.splitRatio", String(splitRatio));
}, [splitMode, splitRatio]);
useEffect(() => {
  if (!activeScrollRef.current) {
    activeScrollRef.current = scrollRef.current;
  }
}, []);

  /* Keyboard Shortcuts */
  useEffect(() => {
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      if (access.status === "blocked") return;

      const t = e.target as HTMLElement;

      if (
        t?.tagName === "INPUT" ||
        t?.tagName === "TEXTAREA" ||
        t?.isContentEditable
      )
        return;

      const key = e.key.toLowerCase();
      const isCmd = e.ctrlKey || e.metaKey;
      const isAlt = e.altKey;
      // Zoom controls (SAFE shortcuts)
      if (isAlt && key === "=") {
        e.preventDefault();
        setFontScale((s) => Math.min(1.4, s + 0.1));
        return;
      }

      if (isAlt && key === "-") {
        e.preventDefault();
        setFontScale((s) => Math.max(0.8, s - 0.1));
        return;
      }

      if (isAlt && key === "0") {
        e.preventDefault();
        setFontScale(1);
        return;
      }
      // 🔹 Toggle Top Navbar (manual override)
      if (e.altKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        setNavVisible((v) => !v);
        return;
      }

      // Help
      if (e.key === "?" && !isCmd) {
        if (windowWidth >= 768) {
          e.preventDefault();
          setShowKeys((v) => !v);
        }
        return;
      }
      // Scroll (active container aware)
const scroller =
  splitMode === "none"
    ? scrollRef.current
    : (activeScrollRef.current ?? scrollRef.current);

if (!scroller) return;

function jumpTo(keyword: string) {
  if (!scroller) return;

  const target = Array.from(scroller.querySelectorAll("[data-heading]")).find(
    (h) => h.textContent?.toLowerCase().includes(keyword),
  );

  target?.scrollIntoView({ behavior: "smooth" });
}

      if (key === "p") {
        jumpTo("problem");
        return;
      }

      if (key === "e") {
        jumpTo("example");
        return;
      }

      // ---- a1..a5 buffer logic ----
      if (/^[a-z0-9]$/i.test(key)) {
        buffer += key;
        buffer = buffer.slice(-2);
      } else {
        buffer = "";
      }

      const match = buffer.match(/^a([1-5])$/);
      if (match) {
        const idx = Number(match[1]) - 1;

        const approaches = Array.from(
          scroller.querySelectorAll("[data-heading]"),
        ).filter((h) => h.textContent?.toLowerCase().startsWith("approach"));

        const target = approaches[idx];
        target?.scrollIntoView({ behavior: "smooth" });
        buffer = "";
        return;
      }

      // ---- Alt + Top ----
      if (isAlt && key === "arrowup") {
        scroller.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (key === "arrowdown" && !isCmd && !isAlt) {
        scroller?.scrollBy({ top: 40, behavior: "smooth" });
        return;
      }
      if (key === "arrowup" && !isCmd && !isAlt) {
        scroller?.scrollBy({ top: -40, behavior: "smooth" });
        return;
      }

      // Collapse / Expand all sidebar folders
      if (isCmd && e.shiftKey && key === "a") {
        e.preventDefault();
        sidebarActionsRef.current?.toggleAll();
        return;
      }
      // 🔹 Split View shortcuts (desktop only)
      if (
        viewMode === "read" &&
        windowWidth >= 768 &&
        isCmd &&
        e.code === "Backslash"
      ) {
        e.preventDefault();

        if (e.shiftKey) {
          setSplitMode("horizontal");
        } else {
          setSplitMode((m) => (m === "none" ? "vertical" : "none"));
        }
        return;
      }

      // 🔹 Toggle Theme (single-key, desktop only)
      if (
        windowWidth >= 768 &&
        key === "t" &&
        !isCmd &&
        !isAlt &&
        !showKeys &&
        !searchOpen
      ) {
        e.preventDefault();
        toggleTheme();
        return;
      }

      // 🔥 PREV / NEXT
      if (isAlt && key === "arrowright" && nextFile) {
        e.preventDefault();
        setNavIndex((i) => i + 1);
        setActivePath(nextFile.path);
      }

      if (isAlt && key === "arrowleft" && prevFile) {
        e.preventDefault();
        setNavIndex((i) => i - 1);
        setActivePath(prevFile.path);
      }

      // Panels
      if (e.key === "[" && !isCmd) setSidebarOpen((v) => !v);
      else if (e.key === "]" && !isCmd && viewMode === "read") {
        setTocOpen((v) => !v);
      } else if (isCmd && key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (key === "d" && !isCmd) setDrawMode((v) => !v);
      else if (e.key === "Escape") {
        setDrawMode(false);
        setShowKeys(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
     splitMode,
    windowWidth,
    drawMode,
    showKeys,
    searchOpen,
    navIndex,
    prevFile,
    nextFile,
    access.status,
  ]);

  useEffect(() => {
    document
      .querySelectorAll(".tour-highlight")
      .forEach((el) => el.classList.remove("tour-highlight"));

    if (!showTour) return;

    const target = TOUR_TARGETS[currentStep];
    if (!target) return;

    const el = document.querySelector(
      `[data-tour="${target}"]`,
    ) as HTMLElement | null;

    if (!el) return;

    el.classList.add("tour-highlight");

    return () => {
      el.classList.remove("tour-highlight");
    };
  }, [currentStep, showTour]);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const cur = el.scrollTop;
      const maxScroll = el.scrollHeight - el.clientHeight;

      // 1. If any sidebar is open, force nav visible
      if (sidebarOpen || tocOpen) {
        setNavVisible(true);
        return;
      }

      // 2. Keep nav visible at boundaries
      if (cur <= 0 || cur >= maxScroll - 10) {
        setNavVisible(true);
        return;
      }

      // 3. Direction-stable logic (NO vibration)
      const delta = cur - lastScrollTop.current;
      if (Math.abs(delta) < 20) return;

      const dir = delta > 0 ? "down" : "up";

      if (scrollDirection.current !== dir) {
        scrollDirection.current = dir;
        setNavVisible(dir === "up");
      }

      lastScrollTop.current = cur;
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

useEffect(() => {
  if (!activePath) return;
  if (window.innerWidth < 768) return;

  setSidebarOpen(false);
  setTocOpen(false);
}, [activePath]);

  if (access.status !== "ok") {
    return (
      <>
        {access.status === "blocked" && (
          <GlobalBlockedScreen
            reason={access.reason}
            onRetry={async () => {
              setAccess({ status: "ok" });
            }}
            onEnterToken={() => {
              setAccess({ status: "awaiting_token" });
              setTokenModalOpen(true);
            }}
          />
        )}

        <TokenEntryModal
          open={tokenModalOpen}
          onClose={() => {
            setTokenModalOpen(false);

            if (blockedReason) {
              setAccess({ status: "blocked", reason: blockedReason });
            }
          }}
          onSubmit={(token) => {
            localStorage.setItem("dev-token", token);
            setTokenModalOpen(false);
            setAccess({ status: "ok" });
          }}
        />
      </>
    );
  }

  return (
    <ScrollContext.Provider value={{ scrollRef }}>
      <TocContext.Provider value={setHeadings}>
        <div
          className="flex h-[100dvh] flex-col overflow-hidden"
          style={{ backgroundColor: "var(--ui-bg-soft)" }}
        >
          <div
            className={`fixed top-0 inset-x-0 z-[120] transition-all duration-300 ${
              // Logic: Show if navVisible is true OR if any sidebar is open
              navVisible || sidebarOpen || tocOpen
                ? "translate-y-0"
                : "-translate-y-full"
            }`}
          >
            {" "}
            <TopNavbar
              onOpenInfo={() => setInfoOpen(true)}
              drawActive={drawMode}
              onToggleDraw={() => setDrawMode(!drawMode)}
              onNavigate={(path: string) => setActivePath(path)}
              prev={prevFile}
              next={nextFile}
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              onToggleToc={() => setTocOpen(!tocOpen)}
              onSearch={() => setSearchOpen(true)}
              onZoomIn={() => setFontScale((s) => Math.min(1.4, s + 0.1))}
              onZoomOut={() => setFontScale((s) => Math.max(0.8, s - 0.1))}
              onToggleTheme={toggleTheme}
              theme={mounted ? theme : "light"}
              splitMode={splitMode}
              onToggleSplit={() => {
                if (viewMode !== "read") return;
                setSplitMode((m) => (m === "none" ? "vertical" : "none"));
              }}
              isRevision={viewMode === "revision"}
              onToggleRevision={() =>
                setViewMode((m) => (m === "read" ? "revision" : "read"))
              }
            />
          </div>
          {adminToast && (
            <div className="fixed bottom-6 right-6 z-[999] px-4 py-2 rounded-lg bg-black text-white shadow-lg text-sm animate-fade-in">
              {adminToast}
            </div>
          )}

          <FileContext.Provider value={{ activePath, setActivePath }}>
            <div
              className={`flex flex-1 min-h-0 ${
                navVisible || sidebarOpen || tocOpen ? "pt-12" : "pt-0"
              }`}
            >
              {/* SIDEBAR */}
              <aside
                className={`fixed inset-y-0 left-0 z-[110] bg-[var(--content-bg)] border-r border-gray-200 transition-all duration-300 md:static ${
                  sidebarOpen
                    ? "w-[290px] translate-x-0"
                    : "-translate-x-full md:w-0 opacity-0 pointer-events-none"
                }`}
              >
                <div className="w-[290px] h-full overflow-hidden">
                  <Sidebar
                    ref={sidebarActionsRef}
                    owner={owner}
                    repo={repo}
                    index={index}
                    onClose={() => setSidebarOpen(false)}
                  />
                </div>
              </aside>

              {/* MAIN CONTENT */}
              <main
                ref={scrollRef}
                tabIndex={0}
                onMouseEnter={() => {
                  activeScrollRef.current = scrollRef.current;
                }}
                onClick={() => {
                  activeScrollRef.current = scrollRef.current;
                }}
                className="flex-1 overflow-y-auto min-w-0 relative scroll-smooth touch-auto no-focus-ring"
                style={{ backgroundColor: "var(--ui-bg-soft)" }}
              >
                {splitMode === "none" || windowWidth < 768 ? (
                  /* 🔹 ORIGINAL LAYOUT — UNCHANGED */
                  <div className="block w-full">
                    <div className={CONTENT_CONTAINER_CLASS}>
                      {viewMode === "read" ? (
                        isValidActivePath ? (
                          <RepoContent
                            owner={owner}
                            repo={repo}
                            branch="main"
                            prevFile={prevFile}
                            nextFile={nextFile}
                            onNavigate={(path) => setActivePath(path)}
                            accessVersion={accessVersion}
                            onBlocked={(reason: string) => {
                              setBlockedReason(reason);
                              setAccess({ status: "blocked", reason });
                            }}
                            onMarkdownLoaded={(md: string) => {
                              setCurrentMarkdown(md);
                            }}
                            apiBase={apiBase}
                            containerRef={scrollRef}
                            activeScrollRef={activeScrollRef}
                            scrollId="single"
                          />
                        ) : (
                          <div className="mt-24 flex justify-center px-4">
                            <div className="max-w-md w-full text-center space-y-5 opacity-70">
                              <h2 className="text-lg font-semibold tracking-tight">
                                Learning Mode Ready
                              </h2>
                              <p className="text-sm text-[var(--ui-text-muted)] leading-relaxed">
                                Pick a problem from the sidebar to begin.
                              </p>
                              <p className="text-[11px] opacity-65">
                                Start anywhere.
                              </p>
                            </div>
                          </div>
                        )
                      ) : (
                        <RevisionMode
                          owner={owner}
                          repo={repo}
                          branch="main"
                          path={activePath!}
                          onExit={() => setViewMode("read")}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  /* 🔹 SPLIT VIEW (DESKTOP ONLY) */
                  <div
                    className={`flex h-full gap-2 px-2 ${
                      splitMode === "horizontal" ? "flex-col" : "flex-row"
                    }`}
                  >
                    <div
                      ref={leftScrollRef}
                      tabIndex={0}
                      onMouseEnter={() => {
                        activeScrollRef.current = leftScrollRef.current;
                      }}
                      onClick={() => {
                        activeScrollRef.current = leftScrollRef.current;
                      }}
                      style={{ flexBasis: `${splitRatio * 100}%` }}
                      className="min-w-0 overflow-y-auto bg-[var(--content-bg)] border border-[var(--ui-border)] rounded-lg p-6 no-focus-ring"
                    >
                      <RepoContent
                        owner={owner}
                        repo={repo}
                        branch="main"
                        prevFile={prevFile}
                        nextFile={nextFile}
                        onNavigate={(path) => setActivePath(path)}
                        accessVersion={accessVersion}
                        onBlocked={(reason: string) => {
                          setBlockedReason(reason);
                          setAccess({ status: "blocked", reason });
                        }}
                        apiBase={apiBase}
                        containerRef={leftScrollRef}
                        activeScrollRef={activeScrollRef}
                        hideTopButton={true}
                        scrollId="left"
                      />
                    </div>

                    <div
                      onMouseDown={startDrag}
                      className={`bg-[var(--ui-border)] ${
                        splitMode === "horizontal"
                          ? "h-1 cursor-row-resize"
                          : "w-1 cursor-col-resize"
                      }`}
                      style={{ flexShrink: 0 }}
                    />

                    <div
                      ref={rightScrollRef}
                      tabIndex={0}
                      onMouseEnter={() => {
                        activeScrollRef.current = rightScrollRef.current;
                      }}
                      onClick={() => {
                        activeScrollRef.current = rightScrollRef.current;
                      }}
                      style={{
                        flexBasis: `${(1 - splitRatio) * 100}%`,
                      }}
                      className="min-w-0 overflow-y-auto bg-[var(--content-bg)] border border-[var(--ui-border)] rounded-lg p-6 no-focus-ring"
                    >
                      <RepoContent
                        owner={owner}
                        repo={repo}
                        branch="main"
                        prevFile={prevFile}
                        nextFile={nextFile}
                        onNavigate={(path) => setActivePath(path)}
                        accessVersion={accessVersion}
                        onBlocked={(reason: string) => {
                          setBlockedReason(reason);
                          setAccess({ status: "blocked", reason });
                        }}
                        apiBase={apiBase}
                        containerRef={rightScrollRef}
                        activeScrollRef={activeScrollRef}
                        hideTopButton={true}
                        scrollId="right"
                      />
                    </div>
                  </div>
                )}
              </main>

              {/* TOC */}
              {viewMode === "read" && (
                <aside
                  className={`fixed inset-y-0 right-0 z-[110] bg-[var(--content-bg)] border-l border-gray-200 transition-all duration-300 md:static ${
                    tocOpen
                      ? "w-[270px] translate-x-0"
                      : "translate-x-full md:w-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="w-[270px] h-full overflow-hidden">
                    <TableOfContents
                      headings={headings}
                      open={tocOpen}
                      onClose={() => setTocOpen(false)}
                    />
                  </div>
                </aside>
              )}
            </div>
          </FileContext.Provider>

          {/* Overlays */}
          {showKeys && windowWidth >= 768 && (
            <div
              className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
              onClick={() => setShowKeys(false)}
            >
              <div
                className="
        bg-[var(--content-bg)]
        rounded-2xl shadow-2xl
        w-full max-w-2xl       
        max-h-[80vh]          
        flex flex-col         
      "
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header (sticky) */}
                <div className="flex items-center gap-3 px-6 py-4 border-b">
                  <Keyboard size={20} className="text-blue-600" />
                  <h3 className="text-lg font-bold">Keyboard Shortcuts</h3>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <KeyboardShortcutsInfo />
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t text-[10px] text-center opacity-50">
                  Press any key to close
                </div>
              </div>
            </div>
          )}

          {/* Mobile Backdrop */}
          <div
            className={`fixed inset-0 bg-black/20 z-[105] md:hidden transition-opacity ${
              sidebarOpen || tocOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => {
              setSidebarOpen(false);
              setTocOpen(false);
            }}
          />

          {/* TOUR MODAL - FULL CODE RESTORED */}
          {showTour && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/50">
              <div
                key={currentStep} // enables subtle step transition
                className="relative w-full max-w-md rounded-2xl border shadow-2xl animate-tour-step"
                style={{
                  backgroundColor: "var(--content-bg)",
                  borderColor: "var(--ui-border)",
                  transform: "scale(1)",
                }}
              >
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={skipTour}
                    className="px-2 py-1 text-xs rounded-md transition-colors"
                    style={{ color: "var(--ui-text-muted)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--ui-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    Skip
                  </button>

                  <button
                    onClick={skipTour}
                    className="p-1.5 rounded-lg transition-colors"
                    style={{ color: "var(--ui-text-muted)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--ui-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Content */}
                <div className="px-7 pt-7 pb-6">
                  <h3
                    className="text-xl font-semibold mb-3 flex items-center gap-2"
                    style={{ color: "var(--ui-text)" }}
                  >
                    {TOUR_STEPS[currentStep]?.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color:
                        theme === "dark" ? "#e6edf3" : "var(--ui-text-muted)",
                    }}
                  >
                    {TOUR_STEPS[currentStep]?.content}
                  </p>

                  {/* Device-Specific Hints */}
                  {windowWidth >= 768 &&
                    TOUR_STEPS[currentStep]?.desktopHint && (
                      <p
                        className="mt-2 text-xs italic"
                        style={{ color: "var(--ui-text-muted)" }}
                      >
                        {TOUR_STEPS[currentStep]?.desktopHint}
                      </p>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-7 pb-6">
                  {/* Progress Dots */}
                  <div className="flex items-center gap-1.5">
                    {TOUR_STEPS.map((step, i) => {
                      if (windowWidth < 768 && step.desktopOnly) return null;
                      return (
                        <span
                          key={i}
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: i === currentStep ? 18 : 6,
                            backgroundColor:
                              i === currentStep
                                ? "#2563eb"
                                : "var(--ui-border)",
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentStep === 0}
                      onClick={() => {
                        let prevStep = currentStep - 1;
                        if (
                          windowWidth < 768 &&
                          TOUR_STEPS[prevStep]?.desktopOnly
                        )
                          prevStep--;
                        setCurrentStep(Math.max(0, prevStep));
                      }}
                      className="px-3 py-1.5 text-sm rounded-lg transition-opacity"
                      style={{
                        color: "var(--ui-text-muted)",
                        opacity: currentStep === 0 ? 0 : 1,
                      }}
                    >
                      Back
                    </button>

                    <button
                      onClick={() => {
                        let nextStep = currentStep + 1;

                        // skip desktop-only steps on mobile
                        while (
                          nextStep < TOUR_STEPS.length &&
                          windowWidth < 768 &&
                          TOUR_STEPS[nextStep]?.desktopOnly
                        ) {
                          nextStep++;
                        }

                        // skip read-mode-only steps if not in read mode
                        while (
                          nextStep < TOUR_STEPS.length &&
                          TOUR_STEPS[nextStep]?.requiresReadMode &&
                          viewMode !== "read"
                        ) {
                          nextStep++;
                        }

                        if (nextStep >= TOUR_STEPS.length) {
                          skipTour();
                        } else {
                          setCurrentStep(nextStep);
                        }
                      }}
                      className="px-6 py-2 text-sm font-semibold rounded-xl text-white transition-transform active:scale-95"
                      style={{ backgroundColor: "#2563eb" }}
                    >
                      {currentStep === TOUR_STEPS.length - 1 ||
                      (windowWidth < 768 &&
                        TOUR_STEPS[currentStep + 1]?.desktopOnly)
                        ? "Finish"
                        : "Next"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {searchOpen && (
            <SidebarSearch
              index={index}
              onClose={() => setSearchOpen(false)}
              onNavigate={(path: string) => setActivePath(path)}
            />
          )}

          {drawMode && (
            <DrawOverlay
              active={drawMode}
              onExit={() => setDrawMode(false)}
              theme={theme}
            />
          )}
          <InfoModal
            open={infoOpen}
            onClose={() => setInfoOpen(false)}
            onStartTour={startTourFromInfo}
          />

          <TokenEntryModal
            open={tokenModalOpen}
            onClose={() => setTokenModalOpen(false)}
            onSubmit={(token) => {
              localStorage.setItem("dev-token", token);
              setTokenModalOpen(false);
              setAccess({ status: "ok" });
            }}
          />
        </div>
      </TocContext.Provider>
    </ScrollContext.Provider>
  );
}
