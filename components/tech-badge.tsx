"use client"

import { cn } from "@/lib/utils"
import { Diamond, Network, LinkIcon, Boxes, type LucideIcon } from "lucide-react"

type TechBadgeProps = {
  label: string
  className?: string
}

const ICONS: Record<string, LucideIcon> = {
  polygon: Diamond,
  ethereum: Diamond,
  ipfs: Network,
  chainlink: LinkIcon,
  default: Boxes,
}

export default function TechBadge({ label, className }: TechBadgeProps) {
  const key = label?.toLowerCase?.() ?? "default"
  const Icon = ICONS[key] ?? ICONS.default

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md",
        "px-3 py-2 text-sm text-white/85 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
        "transition-colors hover:bg-white/7",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40",
        "select-none",
        className,
      )}
      role="img"
      aria-label={label}
      tabIndex={0}
    >
      <span className="relative grid place-items-center h-5 w-5 rounded-md border border-white/15 bg-white/10">
        <Icon className="h-3.5 w-3.5 text-white drop-shadow-[0_0_10px_rgba(16,185,129,0.45)]" />
      </span>
      <span>{label}</span>

      {/* subtle liquid sheen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(90px_45px_at_18%_18%,rgba(16,185,129,0.14),transparent),radial-gradient(90px_45px_at_82%_82%,rgba(34,197,235,0.12),transparent)]"
      />
    </div>
  )
}
