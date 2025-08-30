"use client"

import type React from "react"

import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"

export default function DashboardShell({
  title,
  wallet,
  children,
}: {
  title: string
  wallet?: string
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white">
      {/* spacing so the sidebar appears floating, not edge-attached */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <div className="grid md:grid-cols-[280px_1fr] gap-6">
          <Sidebar wallet={wallet} />
          <div className="flex flex-col gap-4">
            <Topbar title={title} />
            <main className="glass border border-white/10 rounded-2xl p-4 sm:p-6">{children}</main>
          </div>
        </div>
      </div>
    </div>
  )
}

export { DashboardShell }
