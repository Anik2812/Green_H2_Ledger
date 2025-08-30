export default function ProducerTransactionsPage() {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-white">My Transactions</h2>
      <p className="text-sm text-white/70">
        Your minting and sales history appears here. Analytics and export controls will follow.
      </p>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <div className="text-white/60 text-sm">No transactions yet.</div>
      </div>
    </section>
  )
}
