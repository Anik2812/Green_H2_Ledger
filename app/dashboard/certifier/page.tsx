"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Check,
  X,
  FileText,
  ExternalLink,
  Loader2,
  ClipboardCopy,
  ShieldCheck,
  Wind,
  Sun,
  Droplets,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Batch = {
  id: string
  wallet: string
  volume: string
  energySource: string
  proofCid: string
}

const initialQueue: Batch[] = [
  {
    id: "BATCH-00123",
    wallet: "0xA1b2...c9D0",
    volume: "50,000 kg",
    energySource: "Wind",
    proofCid: "bafybeigdk7wqj-example-1",
  },
  {
    id: "BATCH-00124",
    wallet: "0x99F1...7B33",
    volume: "22,300 kg",
    energySource: "Solar",
    proofCid: "bafybeigdl2hdp-example-2",
  },
  {
    id: "BATCH-00125",
    wallet: "0x10CD...88A1",
    volume: "12,750 kg",
    energySource: "Hydro",
    proofCid: "bafybeigdabcd3-example-3",
  },
]

export default function CertifierDashboardPage() {
  const { toast } = useToast()
  const [queue, setQueue] = useState<Batch[]>(initialQueue)
  const [approving, setApproving] = useState<Batch | null>(null)
  const [cidInput, setCidInput] = useState("")
  const [isIssuing, setIsIssuing] = useState(false)
  const [rejecting, setRejecting] = useState<Batch | null>(null)

  const hasItems = useMemo(() => queue.length > 0, [queue])

  function openProof(cid: string) {
    const url = `https://ipfs.io/ipfs/${cid}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  function handleReject(b: Batch) {
    setRejecting(b)
  }

  async function handleConfirmIssue() {
    if (!approving) return
    if (!cidInput.trim()) {
      toast({ title: "Missing certificate CID", description: "Please enter the Certificate IPFS CID." })
      return
    }
    setIsIssuing(true)
    try {
      // Simulate on-chain tx latency
      await new Promise((res) => setTimeout(res, 1400))
      // Remove approved batch from queue
      setQueue((prev) => prev.filter((x) => x.id !== approving.id))
      toast({
        title: "Certificate issued",
        description: `Certificate for ${approving.id} issued on-chain.`,
      })
      setApproving(null)
      setCidInput("")
    } catch {
      toast({
        title: "Transaction failed",
        description: "Please try again.",
      })
    } finally {
      setIsIssuing(false)
    }
  }

  function handleRejectRequest() {
    if (!rejecting) return
    setQueue((prev) => prev.filter((x) => x.id !== rejecting.id))
    setRejecting(null)
    toast({ title: "Batch rejected", description: `${rejecting.id} has been rejected.` })
  }

  function EnergyIcon({ source }: { source: string }) {
    const common = "h-4 w-4 drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]"
    if (source.toLowerCase() === "wind") return <Wind className={common + " text-[#00D4FF]"} aria-hidden="true" />
    if (source.toLowerCase() === "solar") return <Sun className={common + " text-[#F5B14C]"} aria-hidden="true" />
    return <Droplets className={common + " text-[#00F5A0]"} aria-hidden="true" />
  }

  return (
    <>
      <div className="space-y-6 p-0">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-white/5 border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="h-5 w-5 text-[#00F5A0]" aria-hidden="true" />
            </div>
            <h1 className="text-xl md:text-2xl font-semibold text-white text-balance">Certifier Dashboard</h1>
          </div>
        </header>

        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-medium text-white">Pending Certification Requests</h2>
            <span className="text-xs md:text-sm text-white/60">{queue.length} pending</span>
          </div>

          {hasItems ? (
            <AnimatePresence initial={false}>
              <motion.ul
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5"
                transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
              >
                {queue.map((b) => (
                  <motion.li
                    key={b.id}
                    layout
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="group rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 p-4 md:p-5"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-3">
                        <InfoItem label="Batch ID" value={b.id} />
                        <InfoItem label="Producer Wallet" value={b.wallet} copyable />
                        <InfoItem label="Volume" value={b.volume} />
                        <div className="min-w-0">
                          <div className="text-[11px] uppercase tracking-wide text-white/50">Energy Source</div>
                          <div className="mt-0.5 flex items-center gap-2">
                            <EnergyIcon source={b.energySource} />
                            <span className="text-white">{b.energySource}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        <Button
                          onClick={() => openProof(b.proofCid)}
                          variant="glass-blue"
                          className="flex items-center gap-2 ring-1 ring-[#00D4FF]/30 hover:shadow-[0_0_24px_rgba(0,212,255,0.35)]"
                          title="View Proof on IPFS"
                        >
                          <FileText className="h-4 w-4" aria-hidden="true" />
                          View Proof
                          <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
                        </Button>

                        <Button
                          onClick={() => setApproving(b)}
                          variant="glass-green"
                          className="flex items-center gap-2 ring-1 ring-[#00F5A0]/30 hover:shadow-[0_0_24px_rgba(0,245,160,0.35)]"
                          title="Approve batch"
                        >
                          <Check className="h-4 w-4" aria-hidden="true" />
                          Approve
                        </Button>

                        <Button
                          onClick={() => setRejecting(b)}
                          variant="ghost"
                          className="flex items-center gap-2 border border-[#EF4444]/40 bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                          title="Reject batch"
                        >
                          <X className="h-4 w-4" aria-hidden="true" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          ) : (
            <EmptyState />
          )}
        </section>
      </div>

      {/* Approval Modal */}
      <Dialog open={!!approving} onOpenChange={(o) => !o && setApproving(null)}>
        <DialogContent className="border border-white/10 bg-white/5 backdrop-blur-2xl text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Approve Batch</DialogTitle>
            <DialogDescription className="text-white/70">
              Review the details and attach the Certificate IPFS CID to issue the certificate on-chain.
            </DialogDescription>
          </DialogHeader>

          {approving && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <InfoItem label="Batch ID" value={approving.id} />
                <InfoItem label="Producer Wallet" value={approving.wallet} />
                <InfoItem label="Volume" value={approving.volume} />
                <InfoItem label="Energy Source" value={approving.energySource} />
              </div>

              <div className="space-y-2">
                <label htmlFor="certCid" className="text-sm text-white/80">
                  Certificate IPFS CID
                </label>
                <input
                  id="certCid"
                  placeholder="bafybeigd...your-certificate-cid"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00F5A0]/60"
                  value={cidInput}
                  onChange={(e) => setCidInput(e.target.value)}
                />
                <p className="text-xs text-white/60">
                  Provide the hash of the official certificate you generated and uploaded to IPFS.
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button onClick={() => setApproving(null)} variant="glass" className="border border-white/10">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmIssue}
              disabled={isIssuing}
              className="flex items-center gap-2 bg-[#00F5A0] hover:bg-[#00F5A0]/90 text-black border border-[#00F5A0]/40"
            >
              {isIssuing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Issuing…
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Confirm & Issue Certificate
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Confirmation Modal */}
      <Dialog open={!!rejecting} onOpenChange={(o) => !o && setRejecting(null)}>
        <DialogContent className="border border-white/10 bg-white/5 backdrop-blur-2xl text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Reject Batch</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure you want to reject {rejecting?.id}? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button onClick={() => setRejecting(null)} variant="glass" className="border border-white/10">
              Cancel
            </Button>
            <Button
              onClick={handleRejectRequest}
              variant="ghost"
              className="flex items-center gap-2 border border-[#EF4444]/40 bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Confirm Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function InfoItem({
  label,
  value,
  copyable,
}: {
  label: string
  value: string
  copyable?: boolean
}) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] uppercase tracking-wide text-white/50">{label}</div>
      <div className="mt-0.5 flex items-center gap-2">
        <span className="text-white truncate">{value}</span>
        {copyable ? (
          <button
            onClick={() => {
              navigator.clipboard.writeText(value)
            }}
            className="inline-flex items-center rounded-md border border-white/10 bg-white/5 p-1 hover:bg-white/10"
            title="Copy to clipboard"
            aria-label={`Copy ${label}`}
          >
            <ClipboardCopy className="h-3.5 w-3.5 text-white/70" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center">
      <p className="text-white/80">No pending requests. You’re all caught up.</p>
      <p className="text-white/50 text-sm mt-1">New certification requests will appear here.</p>
    </div>
  )
}
