"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Factory,
  ShoppingBag,
  ScrollText,
  Settings,
  Wallet,
  Copy,
  LogOut,
  BadgeCheck,
  LineChart,
  Table,
  LayoutDashboard,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useWallet } from "@/components/providers/wallet-provider"
import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type NavItem = {
  href: string
  label: string
  icon: React.ElementType
}

const producerNav: NavItem[] = [
  { href: "/dashboard/producer", label: "Dashboard", icon: Factory },
  { href: "/dashboard/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/dashboard/producer/transactions", label: "My Transactions", icon: ScrollText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

const buyerNav: NavItem[] = [
  { href: "/dashboard/buyer", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/dashboard/buyer/transactions", label: "My Transactions", icon: ScrollText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

const certifierNav: NavItem[] = [
  { href: "/dashboard/certifier", label: "Certification Queue", icon: BadgeCheck },
  { href: "/dashboard/certifier/history", label: "History", icon: ScrollText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

const auditorNav: NavItem[] = [
  { href: "/dashboard/auditor", label: "Analytics", icon: LineChart },
  { href: "/dashboard/auditor/ledger", label: "Ledger", icon: Table },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

// Mapping roles to their navigation items
const navMap = {
  producer: producerNav,
  buyer: buyerNav,
  certifier: certifierNav,
  auditor: auditorNav,
}

export default function Sidebar() {
  const [role, setRole] = useState<keyof typeof navMap | null>(null)
  const [navItems, setNavItems] = useState<NavItem[]>([])
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false)

  useEffect(() => {
    // This effect runs on the client-side to safely access localStorage
    const storedRole = localStorage.getItem("userRole") as keyof typeof navMap | null
    setRole(storedRole)
    if (storedRole && navMap[storedRole]) {
      setNavItems(navMap[storedRole])
    } else {
      // Default to 'buyer' if no role or an invalid role is found
      setNavItems(navMap.buyer)
    }
  }, [])

  const { address, disconnect } = useWallet()
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()

  const copyAddress = async () => {
    if (!address) return
    try {
      await navigator.clipboard.writeText(address)
      toast({ title: "Copied", description: "Wallet address copied to clipboard." })
    } catch {
      toast({ title: "Copy failed", description: "Unable to copy address.", variant: "destructive" })
    }
  }

  const handleLogout = () => {
    disconnect()
    localStorage.removeItem("userRole") // Clear the role on logout
    router.push("/")
  }
  
  // Reusable component for navigation links
  const NavLinks = () => (
     <nav className="flex flex-col gap-1">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || (href === "/dashboard/marketplace" && pathname.startsWith("/dashboard/buyer"))
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setIsMobileSheetOpen(false)} // Close sheet on navigation
            className="relative group rounded-xl"
          >
            <div
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2 transition-smooth",
                isActive ? "bg-white/10 ring-1 ring-emerald-400/40" : "hover:bg-white/5",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full transition-smooth",
                  isActive ? "bg-[var(--brand-green)] shadow-[0_0_12px_rgba(0,245,160,0.7)]" : "bg-transparent",
                )}
              />
              <Icon className={cn("h-4 w-4", isActive ? "text-[var(--brand-green)]" : "text-white/80")} />
              <span className={cn("text-sm", isActive ? "text-white" : "text-white/85")}>{label}</span>
            </div>
          </Link>
        )
      })}
    </nav>
  )
  
  // Reusable component for wallet info and actions
  const WalletInfo = () => (
    <>
      <div className="mt-4 h-px bg-white/10" />
      <div className="mt-3 glass rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 text-sm">
          <Wallet className="h-4 w-4 text-[var(--brand-cyan)]" />
          <span className="truncate text-white/85" title={address ?? "Not connected"}>
            {address ?? "Not connected"}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            aria-label="Copy address"
            onClick={copyAddress}
            className="h-8 w-8 text-white/80 hover:text-white"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="glass-green"
            onClick={handleLogout}
            className="gap-1"
            aria-label="Disconnect wallet"
            title="Disconnect wallet"
          >
            <LogOut className="h-4 w-4" />
            Disconnect
          </Button>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Sidebar (Drawer) */}
      <div className="md:hidden">
         <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
          <SheetTrigger asChild>
            {/* The trigger is now part of the Topbar for better placement */}
            <Button variant="ghost" size="icon" className="fixed top-6 left-4 z-20 glass border-white/15">
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#111] border-r border-white/15 p-3 w-[280px]">
            <div className="flex flex-col h-full">
              <NavLinks />
              <div className="mt-auto">
                <WalletInfo />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block">
        <div className="sticky top-6">
          <div className="glass border border-white/15 rounded-2xl p-3 transition-smooth hover-glow-green h-[calc(100vh-3rem)] flex flex-col">
            <NavLinks />
            <div className="mt-auto">
             <WalletInfo />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

