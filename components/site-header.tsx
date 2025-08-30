"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function SiteHeader({ onOpen }: { onOpen: () => void }) {
  return (
    <header className="px-6 md:px-10 pt-6">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <a
          href="#"
          className="glass rounded-lg px-3 py-2 border border-white/15 focus-ring-blue"
          aria-label="Green H₂ Ledger Home"
        >
          <span className="text-sm md:text-base font-semibold tracking-tight">Green H₂ Ledger</span>
        </a>

        <Button
          onClick={onOpen}
          variant="glass-blue"
          className={cn("focus-ring-blue px-4 py-2 rounded-lg font-medium")}
          aria-haspopup="dialog"
          aria-expanded={false}
          aria-controls="role-modal"
        >
          Connect Wallet
        </Button>
      </div>
    </header>
  )
}
