"use client"

export default function CertificationHistoryPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-white">Certification History</h1>
      <p className="text-sm text-white/70">A searchable ledger of batches you approved or rejected.</p>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <div className="text-white/70 text-sm">
          Coming soon: filters by status, energy source, and date, plus export.
        </div>
      </div>
    </div>
  )
}
