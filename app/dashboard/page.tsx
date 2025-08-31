"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Upload, FilePlus2, ArrowRight, TrendingUp } from "lucide-react"

export default function ProducerDashboardPage() {
  return (
    // The <DashboardShell> wrapper has been removed.
    // We use a React Fragment <> as the root element now.
    <>
      {/* KPIs */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="glass rounded-xl border border-white/10 p-4 transition-smooth hover:bg-white/5 card-hover">
          <div className="text-sm text-white/70">Certified Output</div>
          <div className="mt-2 text-2xl font-semibold">12,450 kg</div>
          <div className="mt-1 text-xs text-white/60">Last 30 days</div>
        </article>

        <article className="glass rounded-xl border border-white/10 p-4 transition-smooth hover:bg-white/5 card-hover">
          <div className="text-sm text-white/70">Pending Certificates</div>
          <div className="mt-2 text-2xl font-semibold">4</div>
          <div className="mt-1 text-xs text-white/60">Awaiting verifier action</div>
        </article>

        <article className="glass rounded-xl border border-white/10 p-4 transition-smooth hover:bg-white/5 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/70">Market Price</div>
              <div className="mt-2 text-2xl font-semibold">$3.42 / kg</div>
              <div className="mt-1 text-xs text-white/60">Updated 5m ago</div>
            </div>
            <TrendingUp className="h-6 w-6 text-[var(--brand-green)]" />
          </div>
        </article>
      </section>

      {/* Quick Actions */}
      <section className="mt-4">
        <div className="glass rounded-xl border border-white/10 p-4">
          <h2 className="text-base font-semibold">Quick Actions</h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button asChild variant="glass-green" className="transition-smooth">
              <Link href="/dashboard/batches">
                <FilePlus2 className="h-4 w-4" />
                Register New Batch
              </Link>
            </Button>
            <Button variant="glass-blue" className="transition-smooth">
              <Upload className="h-4 w-4" />
              Upload Production Data
            </Button>
            <Button asChild variant="glass" className="hover:bg-white/10 transition-smooth">
              <Link href="/dashboard/marketplace">
                Go to Marketplace
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Two-column: Recent Activity + Market Snapshot */}
      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-xl border border-white/10 p-4 transition-smooth card-hover">
          <h2 className="text-base font-semibold">Recent Activity</h2>
          <ul className="mt-3 space-y-2">
            <li className="text-sm text-white/85">Batch #H2-1043 certified by EcoVerify</li>
            <li className="text-sm text-white/85">Sold 2,000 kg to NorthWind Energy</li>
            <li className="text-sm text-white/85">Submitted emissions data for August</li>
          </ul>
        </div>

        <div className="glass rounded-xl border border-white/10 p-4 transition-smooth card-hover">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Market Snapshot</h2>
            <span className="pill pill--certified">Live</span>
          </div>
          <div className="mt-3 text-sm text-white/70">GHC Spot Index (last 24h)</div>
          {/* Lightweight sparkline (no extra deps) */}
          <div className="mt-2 h-24 w-full">
            <svg viewBox="0 0 200 80" className="w-full h-full" aria-hidden>
              <defs>
                <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00F5A0" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <polyline
                fill="url(#spark)"
                stroke="none"
                points="0,70 10,68 20,64 30,60 40,62 50,50 60,55 70,48 80,44 90,46 100,38 110,40 120,34 130,36 140,30 150,32 160,28 170,25 180,22 190,18 200,16 200,80 0,80"
              />
              <polyline
                fill="none"
                stroke="#00F5A0"
                strokeOpacity="0.9"
                strokeWidth="2"
                points="0,70 10,68 20,64 30,60 40,62 50,50 60,55 70,48 80,44 90,46 100,38 110,40 120,34 130,36 140,30 150,32 160,28 170,25 180,22 190,18 200,16"
              />
            </svg>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="text-lg font-semibold text-[#00F5A0]">$3.42</div>
            <div className="text-xs text-white/70">+2.1% 24h</div>
          </div>
        </div>
      </section>

      {/* Verification Queue */}
      <section className="mt-4 glass rounded-xl border border-white/10 p-4 transition-smooth card-hover">
        <h2 className="text-base font-semibold">Verification Queue</h2>
        <div className="mt-3 grid grid-cols-4 gap-2 px-2 text-xs text-white/60">
          <div>Batch</div>
          <div>Status</div>
          <div>Volume</div>
          <div>Submitted</div>
        </div>
        <div className="mt-1 divide-y divide-glass">
          {[
            { id: "H2-1050", status: "Pending", volume: "1,250 kg", date: "2025-08-29" },
            { id: "H2-1049", status: "Pending", volume: "600 kg", date: "2025-08-28" },
            { id: "H2-1048", status: "Certified", volume: "900 kg", date: "2025-08-27" },
          ].map((r) => (
            <div key={r.id} className="grid grid-cols-4 gap-2 px-2 py-3 text-sm">
              <div className="font-medium">{r.id}</div>
              <div>
                <span
                  className={
                    "pill " +
                    (r.status === "Certified"
                      ? "pill--certified"
                      : r.status === "Pending"
                        ? "pill--pending"
                        : "pill--rejected")
                  }
                >
                  {r.status}
                </span>
              </div>
              <div>{r.volume}</div>
              <div>{r.date}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
