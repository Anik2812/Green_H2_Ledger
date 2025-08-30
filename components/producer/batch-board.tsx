"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

type Batch = {
  id: string
  volume: number
  source: "Solar" | "Wind" | "Hydroelectric"
  submittedTo?: string
  date: string
  status: "pending" | "ready" | "rejected"
  rejectReason?: string
}

const initial: Batch[] = [
  {
    id: "BATCH-2025-08-30-A",
    volume: 1500,
    source: "Solar",
    submittedTo: "HydraCert",
    date: "2025-08-25",
    status: "pending",
  },
  {
    id: "BATCH-2025-08-30-B",
    volume: 2200,
    source: "Wind",
    submittedTo: "EcoVerify",
    date: "2025-08-26",
    status: "ready",
  },
  {
    id: "BATCH-2025-08-24-C",
    volume: 900,
    source: "Hydroelectric",
    submittedTo: "GreenTrust",
    date: "2025-08-24",
    status: "rejected",
    rejectReason: "Data mismatch in meter logs.",
  },
]

export function ProducerBatchBoard() {
  const [batches, setBatches] = useState<Batch[]>(initial)
  const [minting, setMinting] = useState<Batch | null>(null)
  const [showReason, setShowReason] = useState<Batch | null>(null)

  const ready = batches.filter((b) => b.status === "ready")
  const pending = batches.filter((b) => b.status === "pending")
  const rejected = batches.filter((b) => b.status === "rejected")

  const mint = async () => {
    if (!minting) return
    await new Promise((r) => setTimeout(r, 1200))
    setBatches((prev) => prev.map((b) => (b.id === minting.id ? { ...b, status: "ready" } : b)))
    setMinting(null)
  }

  const Column = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-white/90">{title}</h3>
      </div>
      <div className="grid gap-3">{children}</div>
    </div>
  )

  const Card = ({ b }: { b: Batch }) => (
    <div className="group relative rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-white/20">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-white">{b.id}</div>
        <span className="text-xs text-white/60">{b.date}</span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
        <div className="text-white/70">Volume</div>
        <div className="text-white">{b.volume} GHC</div>
        <div className="text-white/70">Source</div>
        <div className="text-white">{b.source}</div>
        {b.submittedTo && (
          <>
            <div className="text-white/70">Submitted To</div>
            <div className="text-white">{b.submittedTo}</div>
          </>
        )}
      </div>

      {b.status === "ready" && (
        <div className="mt-3">
          <Button variant="glass-green" size="sm" onClick={() => setMinting(b)}>
            Mint GHCs
          </Button>
        </div>
      )}
      {b.status === "rejected" && (
        <div className="mt-3">
          <Button variant="destructive" size="sm" onClick={() => setShowReason(b)}>
            View Reason
          </Button>
        </div>
      )}

      {b.status === "rejected" && (
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-red-500/20" />
      )}
    </div>
  )

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Column title="Pending Certification">
        {pending.map((b) => (
          <Card key={b.id} b={b} />
        ))}
      </Column>
      <Column title="Ready to Mint">
        {ready.map((b) => (
          <Card key={b.id} b={b} />
        ))}
      </Column>
      <Column title="Rejected">
        {rejected.map((b) => (
          <Card key={b.id} b={b} />
        ))}
      </Column>

      <Dialog open={!!minting} onOpenChange={(v) => !minting || v || setMinting(null)}>
        <DialogContent className="max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Mint Tokens</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-white/70">
            Confirm minting for {minting?.id} with volume {minting?.volume} GHC.
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setMinting(null)}>
              Cancel
            </Button>
            <Button variant="glass-green" onClick={mint}>
              Confirm & Mint
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!showReason} onOpenChange={(v) => !showReason || v || setShowReason(null)}>
        <DialogContent className="max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Rejection Reason</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-white/70">{showReason?.rejectReason || "No details provided."}</p>
          <DialogFooter>
            <Button variant="glass-blue" onClick={() => setShowReason(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
