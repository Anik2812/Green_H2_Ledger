"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Factory, ShoppingCart, BadgeCheck, ShieldCheck, type LucideIcon } from "lucide-react"

type RoleKey = "producer" | "buyer" | "certifier" | "auditor"

type RoleDef = {
  key: RoleKey
  label: string
  icon: LucideIcon
  headline: string
  description: string
  bullets: string[]
  ctas: { label: string; href: string; variant?: "glass-green" | "glass-blue" | "glass" }[]
}

const ROLES: RoleDef[] = [
  {
    key: "producer",
    label: "Producers",
    icon: Factory,
    headline: "Register production, mint GHCs, and track certificates.",
    description: "Streamline your certification workflow and unlock liquidity for verified green hydrogen.",
    bullets: [
      "Batch registration with file proofs to IPFS",
      "Certification status tracking in real-time",
      "Mint GHCs from approved certificates",
    ],
    ctas: [
      { label: "Open Producer Dashboard", href: "/dashboard/producer", variant: "glass-green" },
      { label: "Learn More", href: "/dashboard", variant: "glass" },
    ],
  },
  {
    key: "buyer",
    label: "Buyers",
    icon: ShoppingCart,
    headline: "Discover, verify, and purchase GHCs with full provenance.",
    description: "Filter by origin, emissions intensity, and certification status, then purchase in a few clicks.",
    bullets: [
      "Marketplace with advanced filters and sorting",
      "On-chain provenance and certificate links",
      "One-click purchase with clear settlement states",
    ],
    ctas: [
      { label: "Visit Marketplace", href: "/dashboard/marketplace", variant: "glass-blue" },
      { label: "Buyer Overview", href: "/dashboard/buyer", variant: "glass" },
    ],
  },
  {
    key: "certifier",
    label: "Certifiers",
    icon: BadgeCheck,
    headline: "Review evidence, issue certificates, and ensure integrity.",
    description: "A focused queue for pending requests with streamlined approval and on-chain issuance.",
    bullets: [
      "Pending review queue with attachments",
      "Approve/Reject with reason and CID",
      "Issue certificate and notify instantly",
    ],
    ctas: [
      { label: "Open Certifier Queue", href: "/dashboard/certifier", variant: "glass-green" },
      { label: "Documentation", href: "/dashboard", variant: "glass" },
    ],
  },
  {
    key: "auditor",
    label: "Auditors & Regulators",
    icon: ShieldCheck,
    headline: "Monitor the ledger, analyze trends, and export auditable data.",
    description: "Dashboards with glowing charts and a master ledger table to drill into any transaction.",
    bullets: [
      "Glowing charts with period comparisons",
      "Ledger with advanced filters and exports",
      "Drill-down into proofs and certificates",
    ],
    ctas: [
      { label: "Open Auditor View", href: "/dashboard/auditor", variant: "glass-blue" },
      { label: "See Ledger", href: "/dashboard/auditor#ledger", variant: "glass" },
    ],
  },
]

export default function RolesTabs() {
  const [active, setActive] = useState<RoleKey>("producer")

  const activeDef = ROLES.find((r) => r.key === active) ?? ROLES[0]

  return (
    <div className="w-full">
      {/* Tab List */}
      <div role="tablist" aria-label="Stakeholder roles" className="flex gap-2 overflow-x-auto pb-2 -mb-1 leading-[2.0rem] flex-row items-stretch pt-0.5 pl-0.5 pl-px">
        {ROLES.map((role) => {
          const Icon = role.icon
          const isActive = active === role.key
          return (
            <button
              key={role.key}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${role.key}`}
              onClick={() => setActive(role.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-colors",
                "border border-white/10 bg-white/5 backdrop-blur-md",
                "focus:outline-none focus:ring-2 focus:ring-emerald-400/40",
                isActive ? "text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]" : "text-white/80 hover:bg-white/7",
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-white/80")} />
              {role.label}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_18px_2px_rgba(16,185,129,0.45)]"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Panel */}
      <div
        id={`panel-${activeDef.key}`}
        role="tabpanel"
        aria-labelledby={activeDef.key}
        className={cn(
          "mt-4 relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-6",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
        )}
      >
        {/* liquid sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(160px_80px_at_14%_18%,rgba(16,185,129,0.16),transparent),radial-gradient(160px_80px_at_86%_82%,rgba(34,197,235,0.12),transparent)]"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-lg md:text-xl font-semibold text-white">{activeDef.headline}</h3>
            <p className="mt-2 text-sm md:text-base text-white/80 leading-relaxed">{activeDef.description}</p>
            <ul className="mt-4 grid gap-2 text-sm text-white/80">
              {activeDef.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(16,185,129,0.45)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {activeDef.ctas.map((c, i) => (
                <Button
                  key={i}
                  asChild
                  variant={c.variant ?? "glass"}
                  className={cn(
                    "px-4 py-2.5 rounded-lg font-medium",
                    c.variant === "glass-green"
                      ? "focus-ring-green"
                      : c.variant === "glass-blue"
                        ? "focus-ring-blue"
                        : "",
                  )}
                >
                  <Link href={c.href}>{c.label}</Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Right: mini showcase card */}
          <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(120px_60px_at_20%_20%,rgba(16,185,129,0.14),transparent),radial-gradient(120px_60px_at_80%_80%,rgba(34,197,235,0.12),transparent)]"
            />
            <div className="relative z-10">
              <div className="text-xs text-white/65">Quick Preview</div>
              {active === "producer" && (
                <div className="mt-2 space-y-2 text-sm text-white/80">
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span>Batch B-1023</span>
                    <span className="pill pill--pending">Pending</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span>Batch B-1022</span>
                    <span className="pill pill--certified">Certified</span>
                  </div>
                </div>
              )}
              {active === "buyer" && (
                <div className="mt-2 space-y-2 text-sm text-white/80">
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span>GHC Lot #345</span>
                    <span className="text-emerald-400">1,000 GHC</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span>Intensity</span>
                    <span className="text-white/70">0.9 kgCO₂e/kg</span>
                  </div>
                </div>
              )}
              {active === "certifier" && (
                <div className="mt-2 space-y-2 text-sm text-white/80">
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span>Review: B-1019</span>
                    <span className="pill pill--pending">New</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span>Issued Certificates</span>
                    <span className="text-white/70">128</span>
                  </div>
                </div>
              )}
              {active === "auditor" && (
                <div className="mt-2 space-y-2 text-sm text-white/80">
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span>Ledger Rows</span>
                    <span className="text-white/70">24,770</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    <span>Alerts</span>
                    <span className="text-emerald-400">0 Critical</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
