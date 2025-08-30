"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProducerStatCards } from "@/components/producer/stat-cards"
import { NewBatchModal } from "@/components/producer/new-batch-modal"
import { ProducerBatchBoard } from "@/components/producer/batch-board"
import { ProducerInventoryTable } from "@/components/producer/inventory-table"

export default function ProducerDashboardPage() {
  const [openNewBatch, setOpenNewBatch] = useState(false)

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <ProducerStatCards />
        </div>
        <div className="hidden md:block">
          <Button
            variant="glass-green"
            size="lg"
            onClick={() => setOpenNewBatch(true)}
            aria-label="Register New Production Batch"
          >
            + Register New Production Batch
          </Button>
        </div>
      </div>

      <div className="md:hidden">
        <Button
          variant="glass-green"
          className="w-full"
          onClick={() => setOpenNewBatch(true)}
          aria-label="Register New Production Batch"
        >
          + Register New Production Batch
        </Button>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 text-base font-semibold">My Production Batches</h2>
        <ProducerBatchBoard />
      </section>

      <section className="mt-6">
        <ProducerInventoryTable />
      </section>

      <NewBatchModal
        open={openNewBatch}
        onOpenChange={setOpenNewBatch}
        onSubmit={async (payload) => {
          console.log("[v0] Producer submit payload:", payload)
        }}
      />
    </>
  )
}
