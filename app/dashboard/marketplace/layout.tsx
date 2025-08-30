import type { ReactNode } from "react"
import SidebarBuyer from "@/components/dashboard/sidebar-buyer"
import Topbar from "@/components/dashboard/topbar"

export default function BuyerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 grid md:grid-cols-[280px,1fr] gap-6">
      <SidebarBuyer />
      <div className="min-h-[80vh] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <Topbar title="Buyer Marketplace" />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
