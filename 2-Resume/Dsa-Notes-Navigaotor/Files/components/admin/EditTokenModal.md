"use client";

import { useEffect, useState } from "react";

export default function EditTokenModal({
  token,
  onClose,
  onSaved,
}: {
  token: {
    token: string;
    name: string;
    quotaScope: "session" | "token";
    resetPolicy: "daily" | "never";
    limit: number;
    enabled: boolean;
    sessionLock: boolean;
  };

  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(token.name);
  const [quotaScope, setQuotaScope] = useState(token.quotaScope);
  const [resetPolicy, setResetPolicy] = useState(token.resetPolicy);
  const [limit, setLimit] = useState(token.limit);
  const [enabled, setEnabled] = useState(token.enabled);
  const [loading, setLoading] = useState(false);
  const [sessionLock, setSessionLock] = useState(token.sessionLock ?? true);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function save(resetUsage = false) {
    if (resetUsage) {
      const ok = confirm(
        "This will reset usage counters for this token. Continue?",
      );
      if (!ok) return;
    }

    setLoading(true);

    await fetch("/api/admin/tokens", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token.token,
        name,
        quotaScope,
        resetPolicy,
        limit,
        enabled,
        resetUsage,
        sessionLock,
      }),
    });

    setLoading(false);
    onSaved();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[var(--content-bg)] rounded-xl p-6 w-[420px] space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-semibold text-lg">Edit Token</h2>

        {/* NAME */}
        <input
          className="w-full border rounded px-3 py-2 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Token name"
        />

        {/* QUOTA SCOPE */}
        <select
          className="w-full border rounded px-3 py-2 text-sm"
          value={quotaScope}
          onChange={(e) => setQuotaScope(e.target.value as any)}
        >
          <option value="session">Per session (public preview)</option>
          <option value="token">Per token (shareable)</option>
        </select>

        {/* RESET POLICY */}
        <select
          className="w-full border rounded px-3 py-2 text-sm"
          value={resetPolicy}
          onChange={(e) => setResetPolicy(e.target.value as any)}
        >
          <option value="daily">Resets daily</option>
          <option value="never">Never resets</option>
        </select>

        {/* LIMIT */}
        <input
          type="number"
          min={1}
          className="w-full border rounded px-3 py-2 text-sm"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        />

        {/* ENABLE */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          Enabled
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={sessionLock}
            onChange={(e) => setSessionLock(e.target.checked)}
          />
          Lock to one device
        </label>

        {/* ACTIONS */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => save(true)}
            disabled={loading}
            className="text-sm underline text-red-600"
          >
            Reset Usage
          </button>

          <div className="flex gap-2">
            <button onClick={onClose} className="text-sm">
              Cancel
            </button>
            <button
              onClick={() => save(false)}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
            >
              {loading ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
