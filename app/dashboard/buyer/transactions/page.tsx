"use client"

import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";

const MOCK_BUYER_WALLET = '0xBuyerWalletAddress';

export default function BuyerTransactionsPage() {
  const { getUserData } = useStore();
  const userData = getUserData(MOCK_BUYER_WALLET);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-white">My Transactions</h2>
      <p className="text-sm text-white/70">
        Your purchase history appears here.
      </p>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        {userData.purchaseHistory.length > 0 ? (
          <div className="divide-y divide-white/10">
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 px-4 py-2 text-xs font-medium text-white/60">
              <span>Batch ID</span>
              <span>Volume</span>
              <span>Total Price</span>
              <span>Seller</span>
            </div>
            {/* Rows */}
            {userData.purchaseHistory.map((batch) => (
              <div key={batch.id} className="grid grid-cols-4 gap-4 px-4 py-3 text-sm">
                <span className="font-mono text-white/90">{batch.id}</span>
                <span className="text-white/80">{batch.volume.toLocaleString()} GHC</span>
                <span className="text-emerald-400 font-medium">
                  {(batch.volume * (batch.price || 0)).toFixed(2)} MATIC
                </span>
                <span className="font-mono text-white/80 truncate" title={batch.producer}>
                  {batch.producer.slice(0, 6)}...{batch.producer.slice(-4)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white/60 text-sm">No transactions yet.</div>
        )}
      </div>
    </section>
  );
}