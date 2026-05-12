"use client";

import { useEffect, useState } from "react";
import CreateTokenModal from "@/components/admin/CreateTokenModal";
import TokenRow from "@/components/admin/TokenRow";
import EditTokenModal from "@/components/admin/EditTokenModal";

const PAGE_SIZE = 10;

export default function AdminDashboard() {
  const [publishStatus, setPublishStatus] = useState<{
    repo: string;
    state: "idle" | "loading" | "success";
  } | null>(null);

  const [tokens, setTokens] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
const [editingToken, setEditingToken] = useState<any | null>(null);

async function revalidate(repo: string) {
  setPublishStatus({ repo, state: "loading" });

  try {
    await fetch(`/api/admin/revalidate?repo=${repo}`, {
      method: "POST",
    });

    setPublishStatus({ repo, state: "success" });

    setTimeout(() => {
      setPublishStatus(null);
    }, 3000);
  } catch {
    setPublishStatus(null);
  }
}


  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tokens");
      const data = await res.json();
      setTokens(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageTokens = tokens.slice(start, end);
  const totalPages = Math.ceil(tokens.length / PAGE_SIZE);
async function logout() {
  await fetch("/api/admin/logout", { method: "POST" });

  window.dispatchEvent(new Event("admin-session-changed"));

  location.href = "/admin/login";
}



  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      {publishStatus?.state === "success" && (
        <div className="text-sm text-green-700 bg-green-100 px-3 py-2 rounded">
          {publishStatus.repo} updated successfully
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Token Control</h1>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => revalidate("DSA-Notes")}
            className="border px-4 py-2 rounded text-sm bg-emerald-50"
          >
            Refresh DSA Notes
          </button>

          <button
            onClick={() => revalidate("dsa-journal")}
            className="border px-4 py-2 rounded text-sm bg-indigo-50"
          >
            Refresh Journal
          </button>

          <button
            onClick={load}
            disabled={loading}
            className="border px-4 py-2 rounded text-sm disabled:opacity-50"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>

          <button
            onClick={() => setShowCreate(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            + Create Token
          </button>

          <button onClick={logout} className="border px-4 py-2 rounded text-sm">
            Logout
          </button>
        </div>
      </div>
      {editingToken && (
        <EditTokenModal
          token={editingToken}
          onClose={() => setEditingToken(null)}
          onSaved={load}
        />
      )}

      {/* TABLE */}
      <table className="w-full border text-left">
        <thead className="border-b text-xs uppercase bg-gray-50">
          <tr>
            <th className="p-2">Name</th>
            <th>Scope</th>
            <th>Reset</th>
            <th>Limit</th>
            <th>Used</th>
            <th>Session</th>
            <th>Status</th>
            <th className="w-[280px]">Actions</th>
          </tr>
        </thead>

        <tbody>
          {pageTokens.map((t) => (
            <TokenRow
              key={t.token}
              t={t}
              refresh={load}
              onEdit={setEditingToken}
            />
          ))}

          {pageTokens.length === 0 && !loading && (
            <tr>
              <td colSpan={7} className="p-6 text-center text-sm text-gray-500">
                No tokens created yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 text-sm">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* ✅ MODAL MUST BE HERE */}
      {showCreate && (
        <CreateTokenModal
          onClose={() => setShowCreate(false)}
          onCreated={load}
        />
      )}
    </div>
  );
}
