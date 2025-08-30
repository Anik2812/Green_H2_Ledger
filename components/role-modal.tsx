"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { Factory, BadgeCheck, ShoppingCart, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

type RoleCard = {
  key: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  accent: "green" | "blue"
}

const roles: RoleCard[] = [
  {
    key: "producer",
    name: "Producer",
    description: "Register and certify green hydrogen production.",
    icon: Factory,
    accent: "green",
  },
  {
    key: "buyer",
    name: "Buyer",
    description: "Purchase certified hydrogen or GHCs.",
    icon: ShoppingCart,
    accent: "blue",
  },
  {
    key: "certifier",
    name: "Certifier",
    description: "Verify data and issue certificates on-chain.",
    icon: BadgeCheck,
    accent: "green",
  },
  {
    key: "auditor",
    name: "Auditor/Regulator",
    description: "Monitor activity and ensure compliance.",
    icon: ShieldCheck,
    accent: "blue",
  },
]

export default function RoleModal({
  id,
  open,
  onClose,
}: {
  id: string
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const firstFocusable = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", onKey)
      // focus first action
      setTimeout(() => firstFocusable.current?.focus(), 0)
    }
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dialogRef.current) return
      if (e.target instanceof Node && !dialogRef.current.contains(e.target)) {
        onClose()
      }
    }
    if (open) document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open, onClose])

  if (!open) return null

  const handleSelect = (role: string) => {
    onClose()
    if (role === "producer") router.push("/dashboard/producer")
    else if (role === "buyer") router.push("/dashboard/marketplace")
    else if (role === "certifier") router.push("/dashboard/certifier")
    else if (role === "auditor") router.push("/dashboard/auditor")
  }

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-labelledby="role-title"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        ref={dialogRef}
        className="relative z-10 liquid-glass border border-white/15 rounded-2xl p-6 md:p-8 w-[92%] max-w-3xl"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 id="role-title" className="text-xl md:text-2xl font-semibold">
              Choose your role
            </h2>
            <p className="mt-1 text-white/80 text-sm">Tailor the experience to your responsibilities.</p>
          </div>
          <button
            ref={firstFocusable}
            onClick={onClose}
            className={cn(
              "glass px-3 py-1.5 rounded-md text-sm border border-white/15 hover:bg-white/10",
              "focus-ring-blue",
            )}
            aria-label="Close role selection"
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((r) => {
            const Icon = r.icon
            const focusRing = r.accent === "green" ? "focus-ring-green" : "focus-ring-blue"
            const hoverRing =
              r.accent === "green"
                ? "hover:shadow-[0_0_0_4px_rgba(0,245,160,0.25)]"
                : "hover:shadow-[0_0_0_4px_rgba(0,212,255,0.25)]"
            const borderAccent = r.accent === "green" ? "hover:border-[#00F5A0]/50" : "hover:border-[#00D4FF]/50"
            return (
              <button
                key={r.key}
                onClick={() => handleSelect(r.key)}
                className={cn(
                  "text-left liquid-glass rounded-xl p-4 md:p-5 border border-white/15 transition",
                  hoverRing,
                  borderAccent,
                  focusRing,
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "glass rounded-lg p-2 border border-white/15",
                      r.accent === "green" ? "text-[#00F5A0]" : "text-[#00D4FF]",
                    )}
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <p className="text-sm text-white/75 mt-1">{r.description}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
