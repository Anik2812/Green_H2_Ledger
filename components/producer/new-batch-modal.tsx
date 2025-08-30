"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  onSubmit: (payload: any) => Promise<void> | void
}

export function NewBatchModal({ open, onOpenChange, onSubmit }: Props) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [volume, setVolume] = useState("")
  const [source, setSource] = useState("Solar")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [cid, setCid] = useState("")
  const [certifier, setCertifier] = useState("HydraCert")

  const next = () => setStep((s) => Math.min(3, s + 1))
  const back = () => setStep((s) => Math.max(1, s - 1))

  const submit = async () => {
    setLoading(true)
    try {
      await onSubmit({ volume, source, startDate, endDate, cid, certifier })
      onOpenChange(false)
      setStep(1)
      setVolume("")
      setCid("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !loading && onOpenChange(v)}>
      <DialogContent className="max-w-xl rounded-2xl border border-white/10 bg-white/5 p-0 backdrop-blur-xl">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle className="text-lg">Register New Production Batch</DialogTitle>
          <p className="text-sm text-white/60">
            Submit your production details for certification. Proof CID is required.
          </p>
        </DialogHeader>

        <div className="px-6 pb-6">
          <div className="mb-4 flex items-center gap-2 text-xs text-white/60">
            <span className={step >= 1 ? "text-white" : ""}>1. Details</span>
            <span>›</span>
            <span className={step >= 2 ? "text-white" : ""}>2. Proof</span>
            <span>›</span>
            <span className={step >= 3 ? "text-white" : ""}>3. Review</span>
          </div>

          {step === 1 && (
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1">
                <span className="text-sm text-white/80">Production Volume (GHC)</span>
                <input
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="1500"
                  className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-teal-400/50"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-sm text-white/80">Energy Source</span>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-teal-400/50"
                >
                  <option>Solar</option>
                  <option>Wind</option>
                  <option>Hydroelectric</option>
                </select>
              </label>
              <label className="grid gap-1">
                <span className="text-sm text-white/80">Production Start</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-teal-400/50"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-sm text-white/80">Production End</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-teal-400/50"
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4">
              <label className="grid gap-1">
                <span className="text-sm text-white/80">Proof Document (IPFS CID)</span>
                <input
                  value={cid}
                  onChange={(e) => setCid(e.target.value)}
                  placeholder="bafybeih..."
                  className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-teal-400/50"
                />
                <span className="text-xs text-white/60">Paste the IPFS hash of your supporting documentation.</span>
              </label>
              <label className="grid gap-1">
                <span className="text-sm text-white/80">Select Certifier</span>
                <input
                  value={certifier}
                  onChange={(e) => setCertifier(e.target.value)}
                  list="certifiers"
                  className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-teal-400/50"
                />
                <datalist id="certifiers">
                  <option value="HydraCert" />
                  <option value="EcoVerify" />
                  <option value="GreenTrust" />
                </datalist>
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Volume</span>
                <span className="text-white">{volume || "—"} GHC</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Energy Source</span>
                <span className="text-white">{source}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Dates</span>
                <span className="text-white">
                  {startDate || "—"} → {endDate || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">IPFS CID</span>
                <span className="truncate text-white">{cid || "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Certifier</span>
                <span className="text-white">{certifier}</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between gap-2 border-t border-white/10 p-4">
          <div className="text-xs text-white/60">Step {step} of 3</div>
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="ghost" onClick={back} disabled={loading}>
                Back
              </Button>
            )}
            {step < 3 && (
              <Button variant="glass-blue" onClick={next} disabled={loading}>
                Next
              </Button>
            )}
            {step === 3 && (
              <Button
                variant="glass-green"
                onClick={submit}
                disabled={loading}
                className={loading ? "animate-pulse" : ""}
              >
                {loading ? "Submitting..." : "Submit for Certification"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
