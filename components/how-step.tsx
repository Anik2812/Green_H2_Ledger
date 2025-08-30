"use client"

import { cn } from "@/lib/utils"
import { Factory, BadgeCheck, Coins, Store, type LucideIcon } from "lucide-react"

type HowStepProps = {
  icon: "factory" | "badge" | "coin" | "market"
  title: string
  text: string
  className?: string
}

// Map string keys to icons
const ICONS: Record<HowStepProps["icon"], LucideIcon> = {
  factory: Factory,
  badge: BadgeCheck,
  coin: Coins,
  market: Store,
}

export default function HowStep({ icon, title, text, className }: HowStepProps) {
  const Icon = ICONS[icon]

  return (
    <article
      tabIndex={0}
      className={cn(
        "group relative h-full flex flex-col items-center text-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-6",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-colors hover:bg-white/7 focus:outline-none",
        "focus:ring-2 focus:ring-emerald-400/40 focus:ring-offset-0",
        className,
      )}
      aria-label={title}
    >
      {/* subtle green→blue sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(140px_70px_at_12%_20%,rgba(16,185,129,0.16),transparent),radial-gradient(140px_70px_at_88%_80%,rgba(34,197,235,0.12),transparent)]"
      />
      {/* content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="grid place-items-center h-12 w-12 rounded-xl border border-white/15 bg-white/10 backdrop-blur">
          <Icon className="h-5 w-5 text-white drop-shadow-[0_0_12px_rgba(16,185,129,0.45)]" />
        </div>
        <h3 className="mt-4 text-base md:text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm md:text-base text-white/80 leading-relaxed max-w-[28ch]">{text}</p>
      </div>

      {/* base bottom line (aligned across all cards) */}
      <div aria-hidden="true" className="absolute left-0 right-0 bottom-0 h-px bg-white/10" />
      {/* animated gradient overlay line */}
      <div
        aria-hidden="true"
        className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-emerald-400/70 to-cyan-400/70 transition-all duration-500 group-hover:w-full"
      />
    </article>
  )
}
