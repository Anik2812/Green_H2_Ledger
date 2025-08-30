"use client"
import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Calendar, Filter, Search } from "lucide-react"

const barData = [
  { month: "Jan", minted: 320 },
  { month: "Feb", minted: 420 },
  { month: "Mar", minted: 380 },
  { month: "Apr", minted: 520 },
  { month: "May", minted: 610 },
  { month: "Jun", minted: 700 },
]

const pieData = [
  { name: "Solar", value: 48 },
  { name: "Wind", value: 36 },
  { name: "Other", value: 16 },
]

const COLORS = ["#00F5A0", "#00D4FF", "#1f9cff"]

const ledgerRows = Array.from({ length: 12 }).map((_, i) => ({
  hash: `0x${(Math.random() * 1e16).toString(16).slice(0, 12)}...${(Math.random() * 1e6).toString(16).slice(0, 4)}`,
  event: i % 3 === 0 ? "Mint" : i % 3 === 1 ? "Transfer" : "Certify",
  from: "0xA1b2...f39a",
  to: "0x9C3d...1a0e",
  volume: Math.floor(100 + Math.random() * 900),
  dt: new Date(Date.now() - i * 86400000).toLocaleString(),
}))

export default function AuditorDashboardPage() {
  const [query, setQuery] = React.useState("")
  const [type, setType] = React.useState<"All" | "Mint" | "Transfer" | "Certify">("All")

  const filtered = ledgerRows.filter(
    (r) =>
      (type === "All" || r.event === type) &&
      (r.hash.toLowerCase().includes(query.toLowerCase()) ||
        r.from.toLowerCase().includes(query.toLowerCase()) ||
        r.to.toLowerCase().includes(query.toLowerCase())),
  )

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#F8FAFC]">Auditor & Regulator</h1>
        <p className="text-sm text-[#F8FAFC]/60">Oversight analytics and immutable ledger.</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl p-4">
          <h2 className="mb-3 text-sm font-medium text-[#F8FAFC]/80">GHC Minted Per Month</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid stroke="rgba(248,250,252,0.06)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(248,250,252,0.6)" />
                <YAxis stroke="rgba(248,250,252,0.6)" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,12,14,0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F8FAFC",
                  }}
                />
                <Bar dataKey="minted" radius={[6, 6, 0, 0]} fill="url(#mintGradient)" />
                <defs>
                  <linearGradient id="mintGradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#00F5A0" />
                    <stop offset="100%" stopColor="#00D4FF" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl p-4">
          <h2 className="mb-3 text-sm font-medium text-[#F8FAFC]/80">Total Production by Energy Source</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={6}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,12,14,0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F8FAFC",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h2 className="text-lg font-medium text-[#F8FAFC]">Platform Ledger</h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#F8FAFC]/50" />
              <Input
                placeholder="Search address or tx hash..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-8 bg-white/5 border-white/10 text-[#F8FAFC] placeholder:text-[#F8FAFC]/40"
              />
            </div>
            <div className="inline-flex items-center gap-2">
              <Button
                variant="outline"
                className={`border-white/15 text-[#F8FAFC]/80 hover:bg-white/10 ${type === "All" ? "bg-gradient-to-r from-[#00F5A0]/20 to-[#00D4FF]/20" : ""}`}
                onClick={() => setType("All")}
              >
                <Filter className="mr-2 h-4 w-4" /> All
              </Button>
              <Button
                variant="outline"
                className={`border-white/15 text-[#F8FAFC]/80 hover:bg-white/10 ${type === "Mint" ? "bg-gradient-to-r from-[#00F5A0]/20 to-[#00D4FF]/20" : ""}`}
                onClick={() => setType("Mint")}
              >
                Mint
              </Button>
              <Button
                variant="outline"
                className={`border-white/15 text-[#F8FAFC]/80 hover:bg-white/10 ${type === "Transfer" ? "bg-gradient-to-r from-[#00F5A0]/20 to-[#00D4FF]/20" : ""}`}
                onClick={() => setType("Transfer")}
              >
                Transfer
              </Button>
              <Button
                variant="outline"
                className={`border-white/15 text-[#F8FAFC]/80 hover:bg-white/10 ${type === "Certify" ? "bg-gradient-to-r from-[#00F5A0]/20 to-[#00D4FF]/20" : ""}`}
                onClick={() => setType("Certify")}
              >
                Certify
              </Button>
              <Button variant="outline" className="border-white/15 text-[#F8FAFC]/80 hover:bg-white/10 bg-transparent">
                <Calendar className="mr-2 h-4 w-4" /> Date Range
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <div className="grid grid-cols-6 gap-2 border-b border-white/10 px-4 py-3 text-xs text-[#F8FAFC]/60">
            <div>Transaction Hash</div>
            <div>Event Type</div>
            <div>From</div>
            <div>To</div>
            <div>Volume</div>
            <div>Date & Time</div>
          </div>
          <div className="divide-y divide-white/10">
            {filtered.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * i }}
                className="grid grid-cols-6 gap-2 px-4 py-3 text-sm text-[#F8FAFC]/90"
              >
                <div className="font-mono">{r.hash}</div>
                <div>{r.event}</div>
                <div className="font-mono">{r.from}</div>
                <div className="font-mono">{r.to}</div>
                <div>{r.volume.toLocaleString()}</div>
                <div className="text-[#F8FAFC]/70">{r.dt}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
