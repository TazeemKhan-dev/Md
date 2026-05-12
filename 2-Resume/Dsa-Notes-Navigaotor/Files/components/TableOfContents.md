"use client";

import { useContext, useEffect, useState } from "react";
import { ScrollContext } from "./RepoShell";
import { X, AlignLeft } from "lucide-react";

export default function TableOfContents({ headings, open, onClose }: any) {
  const scrollCtx = useContext(ScrollContext);
  const scrollRef = scrollCtx?.scrollRef;
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!open || !headings.length || !scrollRef?.current) return;
    const container = scrollRef.current;

    const handleScroll = () => {
      let current = "";
      for (const h of headings) {
        const el = document.getElementById(h.anchor);
        if (el && container.scrollTop >= el.offsetTop - 110) {
          current = h.id;
        } else {
          break;
        }
      }
      setActiveId(current || headings[0]?.id);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [headings, open, scrollRef]);

  if (!open || !headings.length) return null;
return (
  <aside
    data-tour="toc"
    className="h-full flex flex-col border-l"
    style={{
      backgroundColor: "var(--ui-bg)",
      borderColor: "var(--ui-border)",
    }}
  >
    <div
      className="h-12 flex items-center justify-between px-4 border-b shrink-0 md:mt-4 md:border-none"
      style={{ borderColor: "var(--ui-border)" }}
    >
      <div
        className="flex items-center gap-2"
        style={{ color: "var(--ui-text-muted)" }}
      >
        <AlignLeft size={14} />
        <span className="text-[10px] font-bold uppercase tracking-wider">
          On this page
        </span>
      </div>
      <button
        onClick={onClose}
        title="Close TOC"
        className="md:hidden p-1.5 rounded-md transition-colors"
        style={{ color: "var(--ui-text-muted)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--ui-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <X size={16} />
      </button>
    </div>

      <nav
  className="flex-1 overflow-y-auto p-4 relative custom-scrollbar"
  style={{
    paddingBottom: "40vh", 
  }}
>

      <div
        className="absolute left-4 top-4 bottom-4 w-[1px]"
        style={{ backgroundColor: "var(--ui-border)" }}
      />

      <ul className="space-y-4 relative">
        {headings.map((h: any) => (
          <li key={h.id} style={{ marginLeft: `${(h.level - 2) * 12}px` }}>
            <button
              onClick={() => {
                const el = document.getElementById(h.anchor);
                if (el && scrollRef?.current) {
                el.scrollIntoView({
  behavior: "smooth",
  block: "start",
});

                  if (window.innerWidth < 768) onClose();
                }
              }}
              title={h.text}
              className="group relative flex items-start text-left text-[13px] transition-all pl-4"
              style={{
                color: activeId === h.id ? "#58a6ff" : "var(--ui-text-muted)",
                fontWeight: activeId === h.id ? 500 : 400,
              }}
              onMouseEnter={(e) =>
                activeId !== h.id &&
                (e.currentTarget.style.color = "var(--ui-text)")
              }
              onMouseLeave={(e) =>
                activeId !== h.id &&
                (e.currentTarget.style.color = "var(--ui-text-muted)")
              }
            >
              {activeId === h.id && (
                <div
                  className="absolute left-[-4.5px] top-[6px] w-[9px] h-[9px] rounded-full z-10 shadow-sm"
                  style={{
                    backgroundColor: "#58a6ff",
                    border: "2px solid var(--ui-bg)",
                  }}
                />
              )}
              <span className="leading-relaxed">{h.text}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);
}
