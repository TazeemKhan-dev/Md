"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (token: string) => void;
};

export default function TokenEntryModal({ open, onClose, onSubmit }: Props) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-[var(--content-bg)] p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-2">Enter Access Token</h3>

        <p className="text-sm opacity-70 mb-4">
          If you were given a token, paste it below to continue.
        </p>

        <input
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            setError("");
          }}
          placeholder="Paste token here"
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring"
        />

        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm rounded-md opacity-70 hover:opacity-100"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!token.trim()) {
                setError("Token is required");
                return;
              }
              onSubmit(token.trim());
              setToken("");
            }}
            className="px-4 py-1.5 text-sm font-semibold rounded-md bg-blue-600 text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
