"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

type Row = {
  id: string
  status: "In Vault" | "Listed" | "Partially Sold" | "Sold"
  available: number
  price?: number
  mintedAt: string
}

export function ProducerInventoryTable() {
  const [rows, setRows] = useState<Row[]>([])
  const [listRow, setListRow] = useState<Row | null>(null)
  const [price, setPrice] = useState("")

  useEffect(() => {
    const data: Row[] = [
      { id: "GHCB-001", status: "In Vault", available: 1200, mintedAt: "2025-08-26" },
      { id: "GHCB-002", status: "Listed", available: 800, price: 1.2, mintedAt: "2025-08-25" },
      { id: "GHCB-003", status: "Partially Sold", available: 200, price: 1.1, mintedAt: "2025-08-20" },
      { id: "GHCB-004", status: "Sold", available: 0, price: 1.0, mintedAt: "2025-08-18" },
    ]
    let i = 0
    const interval = setInterval(() => {
      setRows((prev) => (i < data.length ? [...prev, data[i++]] : prev))
    }, 120)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
      <h3 className="mb-3 text-sm font-medium text-white/90">My GHC Inventory & Sales</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xs text-white/60">
            <tr className="[&>th]:py-2 [&>th]:pr-4">
              <th>GHC Batch ID</th>
              <th>Status</th>
              <th>Available Volume</th>
              <th>Listed Price</th>
              <th>Date Minted</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((r, idx) => (
              <tr
                key={r.id}
                className="animate-in fade-in slide-in-from-left-2 duration-300 [animation-delay:var(--d)]"
                style={{ ["--d" as any]: `${idx * 60}ms` }}
              >
                <td className="py-2 pr-4 font-medium text-white">{r.id}</td>
                <td className="pr-4">
                  <span className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-xs text-white/80">
                    {r.status}
                  </span>
                </td>
                <td className="pr-4 text-white">{r.available} GHC</td>
                <td className="pr-4 text-white/80">{r.price ? `${r.price.toFixed(2)} MATIC` : "N/A"}</td>
                <td className="pr-4 text-white/80">{r.mintedAt}</td>
                <td className="pl-4 text-right">
                  {r.status === "In Vault" && (
                    <Button
                      size="sm"
                      variant="glass-green"
                      onClick={() => {
                        setListRow(r)
                        setPrice("")
                      }}
                    >
                      List for Sale
                    </Button>
                  )}
                  {r.status === "Listed" && (
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="glass-blue"
                        onClick={() => {
                          setListRow(r)
                          setPrice((r.price ?? 0).toString())
                        }}
                      >
                        Edit Price
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => alert("Delisted")}>
                        Delist
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!listRow} onOpenChange={(v) => !listRow || v || setListRow(null)}>
        <DialogContent className="max-w-sm rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>{listRow?.status === "Listed" ? "Edit Listing Price" : "List for Sale"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2">
            <label className="grid gap-1">
              <span className="text-sm text-white/80">Price per GHC (MATIC)</span>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="1.20"
                className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-teal-400/50"
              />
            </label>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setListRow(null)}>
              Cancel
            </Button>
            <Button
              variant="glass-green"
              onClick={() => {
                alert("Saved")
                setListRow(null)
              }}
            >
              {listRow?.status === "Listed" ? "Save" : "List"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
