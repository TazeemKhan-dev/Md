"use client";

import { useState } from "react";

export default function CreateTokenModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [quotaScope, setQuotaScope] = useState<"session" | "token">("session");
  const [resetPolicy, setResetPolicy] = useState<"daily" | "never">("daily");
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);
const [sessionLock, setSessionLock] = useState(true);

  async function create() {
    setLoading(true);

    const res = await fetch("/api/admin/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        quotaScope,
        resetPolicy,
        limit,
        sessionLock,
      }),
    });

    const data = await res.json();

    if (data.token) {
      await navigator.clipboard.writeText(data.token);
      onCreated();
      onClose();
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[var(--content-bg)] rounded-xl p-5 w-[380px] space-y-4">
        <h2 className="font-semibold text-lg">Create Token</h2>

        <input
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Token name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* QUOTA SCOPE */}
        <div>
          <label className="text-xs font-medium">Quota Scope</label>
          <select
            className="w-full border rounded px-3 py-2 text-sm mt-1"
            value={quotaScope}
            onChange={(e) => setQuotaScope(e.target.value as any)}
          >
            <option value="session">
              Per session (recommended for public)
            </option>
            <option value="token">Shared across all users</option>
          </select>
        </div>

        {/* RESET POLICY */}
        <div>
          <label className="text-xs font-medium">Reset Policy</label>
          <select
            className="w-full border rounded px-3 py-2 text-sm mt-1"
            value={resetPolicy}
            onChange={(e) => setResetPolicy(e.target.value as any)}
          >
            <option value="daily">Daily reset</option>
            <option value="never">Never reset</option>
          </select>
        </div>

        {/* LIMIT */}
        <div>
          <label className="text-xs font-medium">Limit</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2 text-sm mt-1"
            value={limit}
            min={1}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
        </div>
        {/* SESSION LOCK */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={sessionLock}
            onChange={(e) => setSessionLock(e.target.checked)}
          />
          Lock to one device (prevent sharing)
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="text-sm">
            Cancel
          </button>

          <button
            onClick={create}
            disabled={!name || loading}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm disabled:opacity-60"
          >
            {loading ? "Creating…" : "Create & Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
