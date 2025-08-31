"use client"

import { Search, Wallet, Copy, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/providers/wallet-provider"
import { useToast } from "@/hooks/use-toast"

export function Topbar({ title }: { title: string }) {
  const { address } = useWallet()
  const { toast } = useToast()

  const copy = async () => {
    if (!address) return
    try {
      await navigator.clipboard.writeText(address)
      toast({ title: "Copied", description: "Wallet address copied to clipboard." })
    } catch {
      toast({
        title: "Copy failed",
        description: "Unable to copy address.",
        variant: "destructive",
      })
    }
  }

  return (
    <header className="w-full">
      <div className="flex items-center justify-between gap-4 glass border border-white/15 rounded-xl px-3 py-2.5 transition-smooth">
        {/* The mobile menu trigger is now handled by the sidebar component, so this space is for the title */}
        
        {/* Dynamic Page Title: ml-12 on mobile to avoid overlap with fixed menu button */}
        <h1 className="text-sm md:text-base font-semibold text-balance ml-12 md:ml-0">{title}</h1>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 glass border border-white/15 rounded-lg px-2">
            <Search className="h-4 w-4 text-white/70" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm outline-none placeholder:text-white/50 py-1.5"
              aria-label="Search"
            />
          </div>

          <div className="hidden md:flex items-center gap-2 glass border border-white/15 rounded-lg pl-2 pr-1 py-1">
            <Wallet className="h-4 w-4 text-white/70" aria-hidden />
            <span className="max-w-[200px] truncate text-xs text-white/85" title={address ?? 'Not Connected'}>
              {address ?? "Not connected"}
            </span>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Copy address"
              title="Copy address"
              onClick={copy}
              className="h-7 w-7 text-white/80 hover:text-white"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <img
            src="/diverse-profile-avatars.png"
            alt="User profile"
            className="h-8 w-8 rounded-full border border-white/15"
          />
        </div>
      </div>
    </header>
  )
}

export default Topbar

