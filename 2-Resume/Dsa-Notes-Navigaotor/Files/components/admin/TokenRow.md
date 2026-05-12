"use client";

import { Pencil, Trash2, Copy, RotateCcw, Power } from "lucide-react";

export default function TokenRow({
  t,
  refresh,
  onEdit,
}: {
  t: any;
  refresh: () => void;
  onEdit: (token: any) => void;
}) {
  async function patch(body: any) {
    await fetch("/api/admin/tokens", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: t.token, ...body }),
    });
    refresh();
  }

  async function del() {
    if (!confirm(`Delete token "${t.name}" permanently?`)) return;

    await fetch("/api/admin/tokens", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: t.token }),
    });
    refresh();
  }

  async function copy() {
    await navigator.clipboard.writeText(t.token);
  }

  return (
    <tr className="border-b text-sm align-middle">
      {/* NAME */}
      <td className="p-2 font-medium">{t.name}</td>

      {/* SCOPE */}
      <td className="capitalize">{t.quotaScope}</td>

      {/* RESET */}
      <td className="capitalize">{t.resetPolicy}</td>

      {/* LIMIT */}
      <td>{t.limit}</td>

      {/* USED */}
      <td>{t.used}</td>
      {/* SESSION LOCK */}
      <td className="text-xs">
        {t.sessionLock ? "🔒 Locked" : "🌐 Multi-device"}
      </td>

      {/* STATUS */}
      <td>
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            t.enabled
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {t.enabled ? "Active" : "Disabled"}
        </span>
      </td>

      {/* ACTIONS */}
      <td>
        <div className="flex items-center gap-3">
          {/* COPY */}
          <button
            onClick={copy}
            title="Copy token"
            className="p-1 rounded hover:bg-gray-100"
          >
            <Copy size={15} />
          </button>

          {/* EDIT */}
          <button
            onClick={() => onEdit(t)}
            title="Edit token"
            className="p-1 rounded hover:bg-gray-100"
          >
            <Pencil size={15} />
          </button>

          {/* ENABLE / DISABLE */}
          <button
            onClick={() => patch({ enabled: !t.enabled })}
            title={t.enabled ? "Disable token" : "Enable token"}
            className={`p-1 rounded hover:bg-gray-100 ${
              t.enabled ? "text-green-600" : "text-gray-500"
            }`}
          >
            <Power size={15} />
          </button>

          {/* RESET USAGE */}
          <button
            onClick={() => patch({ resetUsage: true })}
            title="Reset usage"
            className="p-1 rounded hover:bg-gray-100"
          >
            <RotateCcw size={15} />
          </button>

          {/* DELETE */}
          <button
            onClick={del}
            title="Delete token"
            className="p-1 rounded hover:bg-red-100 text-red-600"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}
