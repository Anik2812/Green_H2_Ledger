"use client"

import { useEffect, useState } from "react"

export function LiveSnapshot() {
  const [stats, setStats] = useState<{ minted: number; traded: number; certifiers: number }>({
    minted: 0,
    traded: 0,
    certifiers: 0,
  })

  useEffect(() => {
    // Simulate live values; replace with real API/SWR later
    const t = setInterval(() => {
      setStats((s) => ({
        minted: (s.minted + Math.floor(Math.random() * 7)) % 50000,
        traded: (s.traded + Math.floor(Math.random() * 5)) % 18000,
        certifiers: 12,
      }))
    }, 1500)
    return () => clearInterval(t)
  }, [])

  const label = "Live Certification Snapshot"
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/85 backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-white">{label}</h3>
        <span className="inline-flex items-center gap-2 text-xs text-white/70">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#00F5A0] shadow-[0_0_10px_#00F5A0]"></span>
          live
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <div className="text-xs text-white/60">GHC Minted</div>
          <div className="text-lg font-semibold text-white">{stats.minted.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-white/60">GHC Traded</div>
          <div className="text-lg font-semibold text-white">{stats.traded.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-white/60">Active Certifiers</div>
          <div className="text-lg font-semibold text-white">{stats.certifiers}</div>
        </div>
      </div>
    </div>
  )
}
