"use client"

export default function HeroMolecule() {
  return (
    <div
      className="relative size-40 md:size-48 lg:size-56 rounded-full glass border border-white/15 animate-pulse-soft"
      aria-hidden
    >
      {/* rotating ring */}
      <div className="absolute inset-0 rounded-full border border-white/15 animate-rotate-slow" />
      {/* nucleus */}
      <div
        className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, #00F5A0 0%, rgba(0,245,160,0.2) 60%, rgba(0,0,0,0) 70%)",
        }}
      />
      {/* orbiters */}
      <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-[#00D4FF] shadow-[0_0_12px_rgba(0,212,255,0.8)]" />
      <span className="absolute right-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-[#00F5A0] shadow-[0_0_12px_rgba(0,245,160,0.8)]" />
      <span className="absolute left-0 top-1/3 size-2 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
    </div>
  )
}
