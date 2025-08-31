"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/dashboard/sidebar"
import Topbar from "@/components/dashboard/topbar"
import { Toaster } from "@/components/ui/toaster"

// Helper function to generate a title from the pathname
const generateTitle = (pathname: string): string => {
  if (pathname === "/dashboard") return "Dashboard Overview"
  const parts = pathname.split("/").filter(Boolean)
  // Take the last part of the path, capitalize it, and use it as the title.
  const lastPart = parts[parts.length - 1]
  if (!lastPart || lastPart === "dashboard") return "Dashboard"
  
  // A simple mapping for better titles
  const titleMap: { [key: string]: string } = {
    producer: "Producer Dashboard",
    buyer: "Buyer Dashboard",
    certifier: "Certifier Dashboard",
    auditor: "Auditor Dashboard",
    marketplace: "Marketplace",
    transactions: "My Transactions",
    settings: "Settings",
    history: "Certification History",
    ledger: "Platform Ledger",
  }

  return titleMap[lastPart] || lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/-/g, " ")
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const title = generateTitle(pathname)

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <div className="grid md:grid-cols-[280px_1fr] gap-6">
          <Sidebar />
          <div className="flex flex-col gap-4">
            <Topbar title={title} />
            <main className="glass border border-white/10 rounded-2xl p-4 sm:p-6 min-h-[calc(100vh-100px)]">
              {children}
            </main>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

