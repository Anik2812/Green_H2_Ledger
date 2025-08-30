"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type StatCardProps = {
  label: string
  value: number
  suffix?: string
  extra?: string
  className?: string
}

/**
 * StatCard
 * - Liquid-glass styled KPI card with a smooth count-up animation.
 * - Matches the dark + glassmorphism + neon accent system.
 */
export default function StatCard({ label, value, suffix, extra, className }: StatCardProps) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const duration = 1400
    const start = performance.now()
    const from = 0
    const to = value

    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value])

  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md",
        "p-5 md:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
        "transition-colors hover:bg-white/7",
        className,
      )}
      role="figure"
      aria-label={label}
    >
      {/* subtle liquid sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(140px_70px_at_12%_20%,rgba(16,185,129,0.16),transparent),radial-gradient(140px_70px_at_88%_80%,rgba(34,197,235,0.12),transparent)]"
      />
      <div className="relative z-10 flex flex-col gap-2">
        <div className="text-xs font-medium text-white/65">{label}</div>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            {display.toLocaleString()}
            {suffix ? <span className="ml-1 text-white/80 text-lg md:text-xl">{suffix}</span> : null}
          </div>
          {extra ? <div className="text-sm text-white/55">{extra}</div> : null}
        </div>
        {/* glow underline on hover for a premium feel */}
        <div className="h-px w-full bg-white/10">
          <div className="h-px w-0 bg-gradient-to-r from-emerald-400/70 to-cyan-400/70 transition-all duration-500 group-hover:w-full" />
        </div>
      </div>
    </div>
  )
}
