"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function MarketplacePage() {
  const items = [
    { id: "GHC-001", price: "120 GHC", volume: "500 Kg", rating: 4.9 },
    { id: "GHC-002", price: "90 GHC", volume: "300 Kg", rating: 4.6 },
    { id: "GHC-003", price: "200 GHC", volume: "1,000 Kg", rating: 4.8 },
  ]
  return (
    // The <DashboardShell> wrapper has been removed. The new layout handles the structure.
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((it) => (
        <div key={it.id} className="glass rounded-xl border border-white/10 p-4 card-hover">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{it.id}</h3>
            <span className="pill pill--certified">Certified</span>
          </div>
          <div className="mt-3 text-sm text-white/70">Available: {it.volume}</div>
          <div className="mt-1 text-sm text-white/70">Rating: {it.rating}</div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-lg font-semibold text-[#00F5A0]">{it.price}</div>
            <Button variant="glass-green" className="px-3">
              <ShoppingCart className="h-4 w-4" />
              Buy
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
