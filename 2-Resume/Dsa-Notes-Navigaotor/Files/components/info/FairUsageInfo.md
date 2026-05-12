"use client";

import { ShieldCheck } from "lucide-react";

export default function FairUsageInfo() {
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <div className="flex items-center gap-2">
        <ShieldCheck size={18} className="text-emerald-500" />
        <h3 className="font-semibold">Fair Usage & Limits</h3>
      </div>

      <p style={{ color: "var(--ui-text-muted)" }}>
        This app is built for regular, focused study. Light usage limits are in
        place to keep the system fast and reliable for everyone.
      </p>

      <div className="rounded-lg border border-[var(--ui-border)] p-4 space-y-2">
        <p>• Limits apply only when new notes are fetched.</p>
        <p>
          • Reading, revisiting, scrolling, or switching views is unaffected.
        </p>
        <p>• Normal study workflows are never interrupted.</p>
      </div>

      <p style={{ color: "var(--ui-text-muted)" }}>
        If you ever hit a limit during genuine learning, extended access can be
        requested.
      </p>
    </div>
  );
}
