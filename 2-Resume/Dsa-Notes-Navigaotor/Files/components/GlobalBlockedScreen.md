"use client";

import { useState } from "react";
type Props = {
  reason: string;
  onRetry: () => void | Promise<void>;
  onEnterToken: () => void;
};


function reasonToMessage(reason: string) {
  switch (reason) {
    case "QUOTA_EXCEEDED":
      return {
        title: "Usage Limit Reached",
        message:
          "You’ve reached the allowed usage limit for this access. This helps prevent abuse and keeps the service reliable.",
      };

    case "TOKEN_IN_USE":
      return {
        title: "Token Already In Use",
        message:
          "This access token is currently active in another session. Tokens are restricted to prevent sharing.",
      };

    case "TOKEN_DISABLED":
      return {
        title: "Access Disabled",
        message: "This access token has been disabled by the administrator.",
      };

    case "INVALID_TOKEN":
      return {
        title: "Invalid Access Token",
        message: "The provided access token is invalid or has expired.",
      };

    default:
      return {
        title: "Access Blocked",
        message: "Your access to this content is currently restricted.",
      };
  }
}

export default function GlobalBlockedScreen({
  reason,
  onRetry,
  onEnterToken,
}: Props) {
  const { title, message } = reasonToMessage(reason);
  const [loading, setLoading] = useState(false);

  async function handleRetry() {
    if (loading) return;

    setLoading(true);
    try {
      await onRetry();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--ui-bg-soft)] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--ui-border)] bg-[var(--content-bg)] p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 text-center">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="mt-2 text-sm text-[var(--ui-text-muted)] leading-relaxed">
            {message}
          </p>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-[var(--ui-border)]" />

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleRetry}
            disabled={loading}
            className="w-full rounded-lg border border-[var(--ui-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--ui-hover)] disabled:opacity-60"
          >
            {loading ? "Checking access…" : "Retry Access"}
          </button>

          <button
            onClick={onEnterToken}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            Enter Access Token
          </button>
        </div>

        {/* Contact */}
        <div className="mt-6 text-center text-xs text-[var(--ui-text-muted)]">
          Need extended access or recruiter review?{" "}
          <a
            href="https://www.linkedin.com/in/tazeem-khan-662a24207/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline"
          >
            Contact me on LinkedIn
          </a>
        </div>
        <p className="mt-4 text-xs text-[var(--ui-text-muted)] text-center">
          This project uses fair-use limits to ensure stability for everyone.
        </p>
      </div>
    </div>
  );
}
