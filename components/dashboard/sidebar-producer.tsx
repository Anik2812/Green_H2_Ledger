"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Factory, ShoppingBag, ScrollText, Settings, Wallet, Copy, LogOut } from "lucide-react" // removed Package/Tags, added ShoppingBag, ScrollText
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useWallet } from "@/components/providers/wallet-provider"

const nav = [
  { href: "/dashboard/producer", label: "Producer Dashboard", icon: Factory },
  { href: "/dashboard/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/dashboard/producer/transactions", label: "My Transactions", icon: ScrollText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export default function SidebarProducer() {
  const pathname = usePathname()
  const router = useRouter()
  const { address, disconnect } = useWallet()
  const { toast } = useToast()

  const copy = async () => {
    if (!address) return
    try {
      await navigator.clipboard.writeText(address)
      toast({ title: "Copied", description: "Wallet address copied to clipboard." })
    } catch {
      toast({ title: "Copy failed", description: "Unable to copy address.", variant: "destructive" })
    }
  }

  return (
    <aside className="hidden md:block">
      <div className="sticky top-6">
        <div className="glass border border-white/15 rounded-2xl p-3 transition-smooth hover-glow-green">
          <nav className="flex flex-col gap-1">
            {nav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href
              return (
                <Link key={href} href={href} className="relative group rounded-xl">
                  <div
                    className={cn(
                      "relative flex items-center gap-3 rounded-xl px-3 py-2 transition-smooth",
                      active ? "bg-white/10 ring-1 ring-emerald-400/40" : "hover:bg-white/5",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full transition-smooth",
                        active ? "bg-[var(--brand-green)] shadow-[0_0_12px_rgba(0,245,160,0.7)]" : "bg-transparent",
                      )}
                    />
                    <Icon className={cn("h-4 w-4", active ? "text-[var(--brand-green)]" : "text-white/80")} />
                    <span className={cn("text-sm", active ? "text-white" : "text-white/85")}>{label}</span>
                  </div>
                </Link>
              )
            })}
          </nav>

          <div className="mt-4 h-px bg-white/10" />

          <div className="mt-3 glass rounded-xl border border-white/10 p-3">
            <div className="flex items-center gap-2 text-sm">
              <Wallet className="h-4 w-4 text-[var(--brand-cyan)]" />
              <span className="truncate text-white/85">{address ?? "Not connected"}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                aria-label="Copy address"
                onClick={copy}
                className="h-8 w-8 text-white/80 hover:text-white"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="glass-green"
                onClick={() => {
                  disconnect()
                  router.push("/")
                }}
                className="gap-1"
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
