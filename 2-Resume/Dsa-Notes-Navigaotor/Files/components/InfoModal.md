"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import AboutThisApp from "./info/AboutThisApp";
import KeyboardShortcutsInfo from "./info/KeyboardShortcutsInfo";
import FairUsageInfo from "./info/FairUsageInfo";
import { useRouter } from "next/navigation";

type InfoTab = "about" | "shortcuts" | "limits";

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
  onStartTour: () => void;
}

const TABS: { key: InfoTab; label: string }[] = [
  { key: "about", label: "About this App" },
  { key: "shortcuts", label: "Keyboard Shortcuts" },
  { key: "limits", label: "Fair Usage & Limits" },
];

export default function InfoModal({
  open,
  onClose,
  onStartTour,
}: InfoModalProps) {
  const [activeTab, setActiveTab] = useState<InfoTab>("about");
  const [showDesktopTabs, setShowDesktopTabs] = useState(true);

  const isMobile = !showDesktopTabs;
const router = useRouter();
const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  fetch("/api/admin/session", { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => setIsAdmin(d?.authenticated === true))
    .catch(() => setIsAdmin(false));
}, []);

  /* Default tab on open */
  useEffect(() => {
    if (!open) return;
    setActiveTab("about");
  }, [open]);

  /* Screen size detection */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setShowDesktopTabs(!mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ESC to close */
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div
        className="
          relative w-full sm:max-w-3xl
          h-[85vh] sm:h-[70vh]
          bg-[var(--ui-bg)]
          border border-[var(--ui-border)]
          rounded-t-xl sm:rounded-xl
          shadow-xl
          flex
        "
      >
        {/* Desktop Tabs */}
        {showDesktopTabs && (
          <aside className="hidden sm:flex flex-col w-56 border-r border-[var(--ui-border)] bg-[var(--ui-bg-soft)]">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-left text-sm transition-colors ${
                  activeTab === tab.key
                    ? "bg-[var(--ui-hover)] font-semibold"
                    : "opacity-80 hover:bg-[var(--ui-hover)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </aside>
        )}

        {/* Content */}
        <section className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-12 px-4 flex items-center justify-between border-b border-[var(--ui-border)]">
            <div className="font-semibold text-sm">
              {showDesktopTabs
                ? TABS.find((t) => t.key === activeTab)?.label
                : "About this App"}
            </div>
            <button onClick={onClose}>
              <X size={18} />
            </button>
          </header>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 text-sm">
            {/* ABOUT */}
            {(activeTab === "about" || isMobile) && (
              <div className="space-y-6">
                <AboutThisApp />

                <div className="pt-4 border-t border-[var(--ui-border)]">
                  <button
                    onClick={onStartTour}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                    style={{ backgroundColor: "#2563eb" }}
                  >
                    Start Guided Tour
                  </button>

                  <p className="mt-2 text-xs opacity-70">
                    A quick walkthrough of navigation, revision mode, and tools.
                  </p>
                </div>
                {isAdmin && (
                  <div className="pt-4 border-t border-[var(--ui-border)]">
                    <div className="text-xs font-semibold mb-2 opacity-70">
                      Workspace
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm"
                        style={{ borderColor: "var(--ui-border)" }}
                      >
                        📚 Notes
                      </button>

                      <button
                        onClick={() => router.push("/journal")}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm"
                        style={{ borderColor: "var(--ui-border)" }}
                      >
                        📝 Journal
                      </button>
                    </div>
                  </div>
                )}

                {/* Mobile-only sections */}
                {isMobile && (
                  <>
                    <div className="pt-6 border-t border-[var(--ui-border)]">
                      <KeyboardShortcutsInfo />
                    </div>

                    <div className="pt-6 border-t border-[var(--ui-border)]">
                      <FairUsageInfo />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* DESKTOP ONLY TABS */}
            {showDesktopTabs && activeTab === "shortcuts" && (
              <KeyboardShortcutsInfo />
            )}

            {showDesktopTabs && activeTab === "limits" && <FairUsageInfo />}
          </div>

          {/* Footer */}
          <div
            className="shrink-0 border-t border-[var(--ui-border)] px-4 py-3 text-xs flex items-center justify-between"
            style={{ color: "var(--ui-text-muted)" }}
          >
            <span>
              Made by <strong>Tazeem</strong>
            </span>

            <a
              href="https://www.linkedin.com/in/tazeem-khan-662a24207/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0A66C2" }}
              className="p-1.5 rounded-md hover:bg-white/5 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.98h4.56V24H.22zM8.98 8.98h4.38v2.05h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99V24h-4.56v-6.79c0-1.62-.03-3.7-2.26-3.7-2.26 0-2.61 1.76-2.61 3.58V24H8.98z" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
