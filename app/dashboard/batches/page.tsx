"use client"

import { DashboardShell } from "@/components/dashboard/shell"

export default function BatchesPage() {
  const rows = [
    { id: "B-1002", status: "Certified", volume: "2,000 Kg", date: "2025-08-01" },
    { id: "B-1001", status: "Pending", volume: "1,500 Kg", date: "2025-07-29" },
    { id: "B-0999", status: "Rejected", volume: "700 Kg", date: "2025-07-21" },
  ]
  return (
    <DashboardShell title="My Batches">
      <div className="glass rounded-xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-4 gap-2 px-4 py-2 text-sm text-white/60">
          <div>ID</div>
          <div>Status</div>
          <div>Volume</div>
          <div>Date</div>
        </div>
        <div className="divide-y divide-glass">
          {rows.map((r) => (
            <div key={r.id} className="grid grid-cols-4 gap-2 px-4 py-3">
              <div className="text-sm">{r.id}</div>
              <div>
                <span
                  className={
                    "pill " +
                    (r.status === "Certified"
                      ? "pill--certified"
                      : r.status === "Pending"
                        ? "pill--pending"
                        : "pill--rejected")
                  }
                >
                  {r.status}
                </span>
              </div>
              <div className="text-sm">{r.volume}</div>
              <div className="text-sm">{r.date}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
