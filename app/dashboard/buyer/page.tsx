"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Search, Filter, SortAsc, Wallet, Download, ArrowUpAZ, ArrowDownAZ } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BatchCard, type Batch } from "@/components/marketplace/batch-card"
import { PurchaseModal } from "@/components/marketplace/purchase-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const sampleBatches: Batch[] = [
  { id: "b1", volume: 1200, price: 0.42, seller: "0x6F12a93Bf74C94eA942bF1be12c9D7b2E84A21c3", source: "Solar" },
  { id: "b2", volume: 800, price: 0.38, seller: "0xA91F54B1d3f1F344aa9210D3a927b8De0a33C512", source: "Wind" },
  { id: "b3", volume: 3000, price: 0.55, seller: "0x90e2C14D3a0779d8F0B6a3E2a5aB2D5F31eF4912", source: "Other" },
  { id: "b4", volume: 1500, price: 0.49, seller: "0x4B8C33e1E1B2C93f4A7234A8c2dFf2e9d1cF12a0", source: "Solar" },
]

function StatCard({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl p-4 flex items-center gap-3">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#00F5A0] to-[#00D4FF] text-black">
        {icon}
      </div>
      <div>
        <div className="text-xs text-[#F8FAFC]/60">{label}</div>
        <div className="text-xl font-semibold text-[#F8FAFC]">{value}</div>
      </div>
    </div>
  )
}

export default function BuyerDashboardPage() {
  const [query, setQuery] = React.useState("")
  const [sortKey, setSortKey] = React.useState<"price" | "volume">("price")
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc")
  const [selected, setSelected] = React.useState<Batch | null>(null)
  const [open, setOpen] = React.useState(false)

  const filtered = sampleBatches
    .filter((b) => b.seller.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      const cmp = sortKey === "price" ? a.price - b.price : a.volume - b.volume
      return sortDir === "asc" ? cmp : -cmp
    })

  const onSelect = (batch: Batch) => {
    setSelected(batch)
    setOpen(true)
  }

  // fake count-up values
  const [balance, setBalance] = React.useState(0)
  const [certs, setCerts] = React.useState(0)
  React.useEffect(() => {
    let raf: number
    const start = performance.now()
    const animate = (t: number) => {
      const p = Math.min((t - start) / 1000, 1)
      setBalance(Math.floor(5000 * p))
      setCerts(Math.floor(12 * p))
      if (p < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  const exportCSV = React.useCallback(() => {
    const header = ["id", "volume", "price", "seller", "source"]
    const rows = filtered.map((r) => [r.id, r.volume, r.price, r.seller, r.source])
    const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "ghc-marketplace.csv"
    a.click()
    URL.revokeObjectURL(url)
  }, [filtered])

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#F8FAFC]">Buyer Dashboard</h1>
        <p className="text-sm text-[#F8FAFC]/60">Discover and purchase Green Hydrogen Credits.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          label="My GHC Balance"
          value={`${balance.toLocaleString()} GHC`}
          icon={<Wallet className="h-4 w-4" />}
        />
        <StatCard label="Certificates Owned" value={`${certs}`} icon={<SortAsc className="h-4 w-4" />} />
      </div>

      <section className="mt-8">
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="text-lg font-medium text-[#F8FAFC]">GHC Marketplace</h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#F8FAFC]/50" />
              <Input
                placeholder="Filter by Seller Address..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-8 bg-white/5 border-white/10 text-[#F8FAFC] placeholder:text-[#F8FAFC]/40"
                aria-label="Filter by Seller Address"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-white/15 text-[#F8FAFC]/80 hover:bg-white/10 bg-transparent"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Sort by Price
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/5 border-white/10 backdrop-blur-xl">
                <DropdownMenuLabel className="text-[#F8FAFC]/70">Price</DropdownMenuLabel>
                <DropdownMenuItem
                  className="text-[#F8FAFC]/90 focus:bg-white/10"
                  onClick={() => {
                    setSortKey("price")
                    setSortDir("asc")
                  }}
                >
                  <ArrowUpAZ className="mr-2 h-4 w-4" /> Low to High
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-[#F8FAFC]/90 focus:bg-white/10"
                  onClick={() => {
                    setSortKey("price")
                    setSortDir("desc")
                  }}
                >
                  <ArrowDownAZ className="mr-2 h-4 w-4" /> High to Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-white/15 text-[#F8FAFC]/80 hover:bg-white/10 bg-transparent"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Sort by Volume
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/5 border-white/10 backdrop-blur-xl">
                <DropdownMenuLabel className="text-[#F8FAFC]/70">Volume</DropdownMenuLabel>
                <DropdownMenuItem
                  className="text-[#F8FAFC]/90 focus:bg-white/10"
                  onClick={() => {
                    setSortKey("volume")
                    setSortDir("asc")
                  }}
                >
                  <ArrowUpAZ className="mr-2 h-4 w-4" /> Low to High
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-[#F8FAFC]/90 focus:bg-white/10"
                  onClick={() => {
                    setSortKey("volume")
                    setSortDir("desc")
                  }}
                >
                  <ArrowDownAZ className="mr-2 h-4 w-4" /> High to Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={exportCSV} className="bg-white/5 border border-white/10 text-[#F8FAFC] hover:bg-white/10">
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
        >
          {filtered.map((b, i) => (
            <BatchCard key={b.id} batch={b} onSelect={onSelect} index={i} />
          ))}
        </motion.div>
      </section>

      <PurchaseModal open={open} onOpenChange={setOpen} batch={selected} />
    </div>
  )
}
