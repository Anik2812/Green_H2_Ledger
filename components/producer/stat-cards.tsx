"use client"
import CountUp from "@/components/animated/count-up"

type Stat = {
  label: string
  value: number
  suffix?: string
  sub: string
}

export function ProducerStatCards() {
  const stats: Stat[] = [
    {
      label: "GHCs Ready to Mint",
      value: 5000,
      suffix: " GHC",
      sub: "Total volume from approved batches waiting to be minted into tokens.",
    },
    {
      label: "GHCs Listed for Sale",
      value: 12500,
      suffix: " GHC",
      sub: "Current inventory available on the marketplace.",
    },
    {
      label: "Volume Sold (30 Days)",
      value: 8200,
      suffix: " GHC",
      sub: "Tracks recent sales performance and market activity.",
    },
    { label: "Total Earnings (MATIC)", value: 205, suffix: " MATIC", sub: "Gross revenue from all GHC sales." },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="relative rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md
                     shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.35)]
                     transition-transform hover:-translate-y-0.5"
          aria-label={s.label}
        >
          <div className="text-sm text-white/70">{s.label}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight text-white">
            <CountUp to={s.value} suffix={s.suffix} />
          </div>
          <div className="mt-2 text-xs leading-5 text-white/60">{s.sub}</div>
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/8 [mask-image:linear-gradient(to_bottom,rgba(255,255,255,0.25),transparent_60%)]" />
        </div>
      ))}
    </div>
  )
}
