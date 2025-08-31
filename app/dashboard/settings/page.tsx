"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Copy, Check } from "lucide-react"

// Local toggle switch with animated gradient track
function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  description?: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
      <div>
        <div className="text-sm font-medium text-white/90">{label}</div>
        {description ? <div className="text-xs text-white/60">{description}</div> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative h-6 w-11 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5A0]/70"
        style={{
          background: checked
            ? "linear-gradient(90deg, rgba(0,245,160,0.9), rgba(0,212,255,0.9))"
            : "linear-gradient(90deg, rgba(148,163,184,0.35), rgba(30,41,59,0.35))",
        }}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white/95 shadow transition-transform duration-300 ${
            checked ? "translate-x-[22px]" : "translate-x-[2px]"
          }`}
        />
        <span className="sr-only">{`Toggle ${label}`}</span>
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const { toast } = useToast()
  const [tab, setTab] = React.useState<"profile" | "notifications">("profile")

  // Profile state
  const [displayName, setDisplayName] = React.useState("")
  const [email, setEmail] = React.useState("")
  // Demo wallet (full, un-truncated)
  const wallet = "0x8A3bF23c8c2E1F9a4C9B32Dd7E5A2f1bE6D3C9A1"

  // Notification toggles
  const [notifyEmail, setNotifyEmail] = React.useState(true)
  const [notifyInApp, setNotifyInApp] = React.useState(true)
  const [marketTips, setMarketTips] = React.useState(false)

  const [copied, setCopied] = React.useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(wallet)
      setCopied(true)
      toast({ title: "Copied", description: "Wallet address copied to clipboard." })
      setTimeout(() => setCopied(false), 1200)
    } catch {
      toast({ title: "Copy failed", description: "Please try again.", variant: "destructive" })
    }
  }

  const onSave = () => {
    toast({ title: "Saved", description: "Your profile preferences have been updated." })
  }

  return (
    // The <DashboardShell> wrapper has been removed.
    <div className="grid gap-6 md:grid-cols-12">
      {/* Left nav */}
      <aside className="md:col-span-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
          <button
            onClick={() => setTab("profile")}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
              tab === "profile"
                ? "bg-gradient-to-r from-[#00F5A0]/15 to-[#00D4FF]/15 text-white"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setTab("notifications")}
            className={`mt-1 w-full rounded-lg px-3 py-2 text-left text-sm transition ${
              tab === "notifications"
                ? "bg-gradient-to-r from-[#00F5A0]/15 to-[#00D4FF]/15 text-white"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            Notifications
          </button>
        </div>
      </aside>

      {/* Right content */}
      <main className="md:col-span-9">
        {tab === "profile" ? (
          <div className="grid gap-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white">Profile</h3>
              <div className="mt-4 grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm text-white/80">Display Name</label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                    className="bg-white/5 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm text-white/80">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain"
                    className="bg-white/5 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm text-white/80">Wallet Address</label>
                  <div className="flex items-center justify-between rounded-lg border border-white/15 bg-white/5 p-3 font-mono text-xs text-white/90">
                    <span className="truncate">{wallet}</span>
                    <Button
                      type="button"
                      onClick={onCopy}
                      className="ml-3 inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-[#00F5A0] to-[#00D4FF] px-2.5 py-1.5 text-xs font-semibold text-black hover:opacity-90 active:opacity-80"
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                </div>
                <div>
                  <Button
                    onClick={onSave}
                    className="mt-2 bg-gradient-to-r from-[#00F5A0] to-[#00D4FF] font-semibold text-black hover:opacity-90 active:opacity-80"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              <div className="mt-4 grid gap-3">
                <ToggleSwitch
                  checked={notifyEmail}
                  onChange={setNotifyEmail}
                  label="Email alerts"
                  description="Receive confirmations and updates via email."
                />
                <ToggleSwitch
                  checked={notifyInApp}
                  onChange={setNotifyInApp}
                  label="In-app notifications"
                  description="Show real-time activity and status changes."
                />
                <ToggleSwitch
                  checked={marketTips}
                  onChange={setMarketTips}
                  label="Marketplace tips"
                  description="Get helpful tips to discover the best offers."
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
