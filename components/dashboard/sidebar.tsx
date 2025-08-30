"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Store, Package, Settings, Wallet, LogOut, BadgeCheck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useWallet } from "@/components/providers/wallet-provider"

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/marketplace", label: "Marketplace", icon: Store },
  { href: "/dashboard/batches", label: "My Batches", icon: Package },
  { href: "/dashboard/certifier", label: "Certifier", icon: BadgeCheck },
  { href: "/dashboard/auditor", label: "Auditor", icon: ShieldCheck },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function Sidebar({ wallet }: { wallet?: string }) {
  const pathname = usePathname()
  const { address, disconnect } = useWallet()
  const addr = wallet ?? address ?? "0x12F3...C9a7"

  return (
    <aside className="hidden md:block">
      <div className="sticky top-6">
        <div className="glass border border-white/15 rounded-2xl p-3 transition-smooth hover-glow-green shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-3 rounded-xl px-3 py-2 transition-smooth",
                    active ? "bg-white/10" : "hover:bg-white/5",
                  )}
                >
                  {/* Glowing active indicator */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full transition-smooth",
                      active ? "bg-[var(--brand-green)] shadow-[0_0_12px_rgba(0,245,160,0.7)]" : "bg-transparent",
                    )}
                  />
                  <Icon className={cn("h-4 w-4", active ? "text-[var(--brand-green)]" : "text-white/80")} />
                  <span className={cn("text-sm", active ? "text-white" : "text-white/85")}>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="mt-4 h-px bg-white/10" />

          {/* Wallet footer */}
          <div className="mt-3 p-3 glass rounded-xl border border-white/10">
            <div className="flex items-center gap-2 text-sm">
              <Wallet className="h-4 w-4 text-[var(--brand-cyan)]" />
              <span className="truncate" title={addr}>
                {addr}
              </span>
            </div>
            <div className="mt-3">
              <Button
                variant="glass-blue"
                size="sm"
                className="w-full transition-smooth"
                onClick={disconnect}
                aria-label="Disconnect wallet"
                title="Disconnect wallet"
              >
                <LogOut className="h-4 w-4" />
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
