"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Batch } from "./batch-card"

export function PurchaseModal({
  open,
  onOpenChange,
  batch,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  batch: Batch | null
}) {
  const { toast } = useToast()
  const [amount, setAmount] = React.useState<number>(0)
  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState<"idle" | "processing" | "success" | "error">("idle")
  const [txHash, setTxHash] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!open) {
      setAmount(0)
      setStatus("idle")
      setTxHash(null)
    }
  }, [open])

  if (!batch) return null

  const certifierAddress = "0xCert...f39a" // placeholder for demo
  const ipfsCid = "ipfs://QmCertificateCID"

  const onPurchase = async () => {
    if (amount <= 0) {
      toast({ title: "Enter a valid amount", description: "Amount must be greater than 0.", variant: "destructive" })
      return
    }
    setLoading(true)
    setStatus("processing")
    try {
      await new Promise((r) => setTimeout(r, 1400))
      const hash = "0xabc123...def456"
      setTxHash(hash)
      setStatus("success")
      toast({ title: "Purchase Executed", description: `Bought ${amount} GHC from ${batch.producer.slice(0, 6)}...` })
    } catch (e) {
      setStatus("error")
      toast({ title: "Transaction failed", description: "Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/5 border border-white/10 backdrop-blur-xl text-[#F8FAFC]">
        {status === "success" ? (
          <div className="grid gap-3 py-4">
            <DialogHeader>
              <DialogTitle className="text-[#00F5A0]">Success!</DialogTitle>
              <DialogDescription className="text-[#F8FAFC]/70">
                Your purchase was executed successfully.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#F8FAFC]/70">Amount Purchased</span>
              <span className="font-medium">{amount} GHC</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#F8FAFC]/70">Transaction</span>
              {txHash ? (
                <a
                  href={`https://polygonscan.com/tx/${encodeURIComponent(txHash)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#00F5A0] hover:underline"
                >
                  View on Explorer <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="text-[#F8FAFC]/60">Pending</span>
              )}
            </div>
            <DialogFooter className="mt-2">
              <Button
                className="bg-gradient-to-r from-[#00F5A0] to-[#00D4FF] text-black font-semibold"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Purchase GHC</DialogTitle>
              <DialogDescription className="text-[#F8FAFC]/70">
                Review details and confirm your purchase.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#F8FAFC]/70">Batch Volume</span>
                <span className="font-medium">{batch.volume.toLocaleString()} GHC</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#F8FAFC]/70">Price per GHC</span>
                <span className="font-medium">{batch.price?.toFixed(2)} MATIC</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#F8FAFC]/70">Seller</span>
                <span className="font-mono">{batch.producer.slice(0, 10)}...</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#F8FAFC]/70">Certifier</span>
                <span className="font-mono">0xCert...f39a</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#F8FAFC]/70">Certificate</span>
                <a
                  className="inline-flex items-center gap-1 text-[#00D4FF] hover:underline"
                  href="https://ipfs.io/ipfs/QmCertificateCID"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Proof on IPFS <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="mt-2 grid gap-2">
                <label className="text-sm text-[#F8FAFC]/80">Amount to Purchase</label>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  value={Number.isNaN(amount) ? 0 : amount}
                  onChange={(e) => setAmount(Number.parseFloat(e.target.value))}
                  className="bg-white/5 border-white/10 text-[#F8FAFC] placeholder:text-[#F8FAFC]/40"
                  placeholder="e.g., 250"
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-white/15 text-[#F8FAFC]/90 hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={onPurchase}
                disabled={loading}
                className="bg-gradient-to-r from-[#00F5A0] to-[#00D4FF] text-black font-semibold disabled:opacity-50"
              >
                {loading || status === "processing" ? "Processing..." : "Execute Purchase"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}