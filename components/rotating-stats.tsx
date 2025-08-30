"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

type StatItem = {
  label: string
  value?: string
}

type RotatingStatsProps = {
  items?: (string | StatItem)[]
  intervalMs?: number
  className?: string
}

/**
 * RotatingStats
 * - Cycles through provided items with a smooth fade/slide transition.
 * - "Liquid glass" surface with readable text on dark backgrounds.
 * - Defaults to Green H₂ Ledger themed stats if no items are provided.
 */
export default function RotatingStats({ items, intervalMs = 2200, className }: RotatingStatsProps) {
  const defaults = useMemo<StatItem[]>(
    () => [
      { label: "Real-time proofs verified", value: "12,482" },
      { label: "tCO₂e retired this week", value: "5,936" },
      { label: "Active certified producers", value: "318" },
      { label: "Batches on-chain", value: "24,770" },
    ],
    [],
  )

  const data: StatItem[] = useMemo(() => {
    if (!items || items.length === 0) return defaults
    return items.map((it) => (typeof it === "string" ? { label: it } : it))
  }, [items, defaults])

  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<"in" | "out">("in")

  useEffect(() => {
    const t = setInterval(() => {
      setPhase("out")
      const mid = setTimeout(() => {
        setIndex((i) => (i + 1) % data.length)
        setPhase("in")
      }, 160) // out duration
      return () => clearTimeout(mid)
    }, intervalMs)
    return () => clearInterval(t)
  }, [data.length, intervalMs])

  const current = data[index]

  return (
    <div
      aria-live="polite"
      className={cn(
        "relative w-full overflow-hidden rounded-xl",
        // liquid glass surface
        "bg-white/5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
        "border border-white/10",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 text-sm md:text-base",
          "transition-all duration-200 ease-out",
          phase === "in" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
        )}
      >
        <span
          className={cn(
            "inline-flex shrink-0 h-2.5 w-2.5 rounded-full",
            // neon pulse dot
            "bg-emerald-400 shadow-[0_0_20px_2px_rgba(16,185,129,0.45)]",
          )}
          aria-hidden="true"
        />
        <span className="text-zinc-200">
          {current.value ? (
            <>
              <span className="text-white font-semibold">{current.value}</span>
              <span className="mx-2 text-zinc-400">•</span>
              <span>{current.label}</span>
            </>
          ) : (
            <span>{current.label}</span>
          )}
        </span>
      </div>

      {/* Subtle green→blue sheen to sell "liquid glass" */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-xl",
          "bg-[radial-gradient(120px_60px_at_10%_30%,rgba(16,185,129,0.18),transparent),radial-gradient(120px_60px_at_90%_70%,rgba(34,197,235,0.14),transparent)]",
        )}
      />
    </div>
  )
}
