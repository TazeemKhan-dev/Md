"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
 const res = await fetch("/api/admin/login", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ password }),
 });

 let data: any = null;
 try {
   data = await res.json();
 } catch {
   throw new Error("Server returned invalid response");
 }

 if (!res.ok) {
   throw new Error(data?.error || "Login failed");
 }

window.dispatchEvent(new Event("admin-session-changed"));
router.push("/admin/dashboard");

    } catch (err: any) {
      setError(err.message || "Invalid password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--ui-bg-soft)] px-4">
      <div className="w-full max-w-sm bg-[var(--content-bg)] border border-[var(--ui-border)] rounded-2xl shadow-lg p-6">
        <h1 className="text-lg font-semibold mb-1">Admin Access</h1>
        <p className="text-sm text-[var(--ui-text-muted)] mb-5">
          Restricted area. Authorized personnel only.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-[var(--ui-border)] px-3 py-2 text-sm bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-lg bg-blue-600 text-white py-2 text-sm font-semibold transition disabled:opacity-60"
          >
            {loading ? "Verifying…" : "Enter Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}
