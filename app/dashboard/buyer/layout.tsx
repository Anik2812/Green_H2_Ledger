import type { ReactNode } from "react"
import SidebarBuyer from "@/components/dashboard/sidebar-buyer"
import { Topbar } from "@/components/dashboard/topbar"

export default function BuyerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
      <div className="grid md:grid-cols-[280px_1fr] gap-6">
        <SidebarBuyer />
        <div className="flex flex-col gap-4">
          <Topbar title="Buyer Marketplace" />
          <main className="glass border border-white/10 rounded-2xl p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
