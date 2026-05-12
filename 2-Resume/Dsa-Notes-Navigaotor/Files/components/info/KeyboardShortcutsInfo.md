"use client";

import { useEffect, useState } from "react";
import { Keyboard } from "lucide-react";

function Row({ label, keys }: { label: string; keys: string[] }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-[var(--ui-text-muted)]">{label}</span>
      <div className="flex gap-1.5">
        {keys.map((k) => (
          <kbd
            key={k}
            className="px-2 py-1 rounded text-[11px] font-semibold min-w-[22px] text-center"
            style={{
              backgroundColor: "var(--content-bg)",
              border: "1px solid var(--ui-border)",
              color: "var(--ui-text)",
            }}
          >
            {k}
          </kbd>
        ))}
      </div>
    </div>
  );
}

export default function KeyboardShortcutsInfo() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!isDesktop) {
    return (
      <p className="text-sm opacity-70">
        Keyboard shortcuts are available on desktop devices.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="rounded-lg border border-[var(--ui-border)] p-3 space-y-1">
        <p className="text-xs uppercase opacity-60 mb-2">Navigation</p>
        <Row label="Toggle Sidebar" keys={["["]} />
        <Row label="Toggle TOC" keys={["]"]} />
        <Row label="Search" keys={["Ctrl", "K"]} />
        <Row label="Previous / Next note" keys={["Alt", "←", "→"]} />
      </div>

      {/* Reading tools */}
      <div className="rounded-lg border border-[var(--ui-border)] p-3 space-y-1">
        <p className="text-xs uppercase opacity-60 mb-2">Reading tools</p>
        <Row label="Split View" keys={["Ctrl", "\\"]} />
        <Row label="Toggle Draw Mode" keys={["T"]} />
      </div>

      {/* Draw tool */}
      <div className="rounded-lg border border-[var(--ui-border)] p-3 space-y-1">
        <p className="text-xs uppercase opacity-60 mb-2">Draw tool</p>
        <Row label="Toggle Scroll / Draw" keys={["S"]} />
        <Row label="Toggle Eraser" keys={["E"]} />
        <Row label="Minimize Toolbar" keys={["H"]} />
        <Row label="Undo" keys={["Ctrl", "Z"]} />
        <Row label="Redo" keys={["Ctrl", "Y"]} />
        <Row label="Clear Canvas" keys={["Alt", "C"]} />
      </div>

      {/* Color & size */}
      <div className="rounded-lg border border-[var(--ui-border)] p-3 space-y-1">
        <p className="text-xs uppercase opacity-60 mb-2">
          Color & Size (Hold C)
        </p>
        <Row label="Previous / Next Color" keys={["C", "←", "→"]} />
        <Row label="Increase Size" keys={["C", "+"]} />
        <Row label="Decrease Size" keys={["C", "-"]} />
      </div>

      {/* Reference */}
      <div className="rounded-lg border border-[var(--ui-border)] p-3">
        <Row label="Shortcut reference" keys={["?"]} />
      </div>

      <p className="text-[11px] opacity-60">
        Shortcuts are disabled while typing in inputs.
      </p>
    </div>
  );
}
