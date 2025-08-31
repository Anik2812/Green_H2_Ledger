"use client"
import { motion } from "framer-motion"
import type React from "react"

import { cn } from "@/lib/utils"
import { Sun, Wind, Leaf } from "lucide-react"
import { Batch } from "@/lib/store"


type EnergySource = "Solar" | "Wind" | "Other" | "Hydroelectric";


const sourceIcon: Record<EnergySource, React.ReactNode> = {
  Solar: <Sun className="h-4 w-4 text-[#F8FAFC]" aria-hidden="true" />,
  Wind: <Wind className="h-4 w-4 text-[#F8FAFC]" aria-hidden="true" />,
  Other: <Leaf className="h-4 w-4 text-[#F8FAFC]" aria-hidden="true" />,
  Hydroelectric: <Leaf className="h-4 w-4 text-[#F8FAFC]" aria-hidden="true" />,
}

export function BatchCard({
  batch,
  onSelect,
  index,
}: {
  batch: Batch
  onSelect: (b: Batch) => void
  index: number
}) {
  const shortAddr = batch.producer.slice(0, 6) + "..." + batch.producer.slice(-4)
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(batch)}
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05 * index, type: "spring", stiffness: 120, damping: 18 }}
      className={cn(
        "group relative w-full rounded-xl p-4 text-left",
        "bg-white/5 border border-white/10 backdrop-blur-xl",
        // gradient border glow on hover
        "outline-none ring-0 focus-visible:ring-2 focus-visible:ring-[#00F5A0]/70",
        "transition shadow-sm hover:shadow-lg transform will-change-transform hover:-translate-y-0.5 hover:scale-[1.01]",
      )}
      style={{
        boxShadow: "0 0 0 0 rgba(0,0,0,0)",
      }}
      onMouseEnter={(e) => {
        // subtle GPU-friendly glow
        e.currentTarget.style.boxShadow = "0 0 0 1px rgba(0,245,160,0.35), 0 0 24px rgba(0,212,255,0.15)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 0 rgba(0,0,0,0)"
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#00F5A0] to-[#00D4FF] shadow-inner shadow-black/30">
            {sourceIcon[batch.energySource as EnergySource]}
          </span>
          <span className="text-sm text-[#F8FAFC]/80">{batch.energySource}</span>
        </div>
        <span className="text-xs text-[#F8FAFC]/60">Seller {shortAddr}</span>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <div className="text-xs text-[#F8FAFC]/60">Available</div>
          <div className="text-2xl font-semibold text-[#F8FAFC]">{batch.volume.toLocaleString()} GHC</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-[#F8FAFC]/60">Price</div>
          <div className="text-xl font-semibold text-[#F8FAFC]">{batch.price?.toFixed(2)} MATIC</div>
          <div className="text-xs text-[#F8FAFC]/60">per GHC</div>
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-xl opacity-0",
          "transition-opacity duration-300 group-hover:opacity-100",
        )}
        style={{
          background: "linear-gradient(135deg, rgba(0,245,160,0.08), rgba(0,212,255,0.08))",
        }}
        aria-hidden="true"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: "radial-gradient(120% 120% at 10% 0%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)",
          mixBlendMode: "overlay",
        }}
      />
    </motion.button>
  )
}