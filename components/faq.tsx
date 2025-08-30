"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

type Item = { q: string; a: string }

const DEFAULTS: Item[] = [
  {
    q: "How does certification work?",
    a: "Producers submit batch data and proofs. Registered certifiers review evidence and issue certificates stored on IPFS and referenced on-chain.",
  },
  {
    q: "What chain do you use?",
    a: "We use Polygon by default for low fees and lower emissions. Provenance can bridge to Ethereum when needed.",
  },
  {
    q: "Can buyers verify provenance?",
    a: "Yes. Each batch links to an immutable certificate and data hash, so buyers can verify origin, emissions intensity, and certification status.",
  },
  {
    q: "Is this production-ready?",
    a: "This demo shows the end-to-end UX. Connect your wallet to explore dashboards. Production integrations can be enabled per environment.",
  },
]

export default function FAQ({ items = DEFAULTS }: { items?: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const open = openIndex === i
        return (
          <div
            key={i}
            className={cn(
              "rounded-xl border border-white/10 bg-white/5 backdrop-blur-md",
              "shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
            )}
          >
            <button
              className={cn(
                "w-full flex items-center justify-between gap-4 px-4 py-3 text-left",
                "text-sm md:text-base text-white/90",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 rounded-xl",
                "hover:bg-white/6 transition-colors",
              )}
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpenIndex(open ? null : i)}
            >
              <span>{it.q}</span>
              <ChevronDown
                className={cn("h-4 w-4 text-white/80 transition-transform", open ? "rotate-180" : "rotate-0")}
              />
            </button>
            <div
              id={`faq-panel-${i}`}
              className={cn(
                "px-4 pb-4 text-sm md:text-base text-white/75 leading-relaxed transition-all",
                open ? "block" : "hidden",
              )}
            >
              {it.a}
            </div>
          </div>
        )
      })}
    </div>
  )
}
