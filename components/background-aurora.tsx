"use client"

export default function BackgroundAurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="aurora-blob aurora-blob-green animate-drift-slow"
        style={{
          width: "40vw",
          height: "40vw",
          top: "-10%",
          left: "-10%",
        }}
      />
      <div
        className="aurora-blob aurora-blob-blue animate-float-slower"
        style={{
          width: "45vw",
          height: "45vw",
          bottom: "-15%",
          right: "-5%",
        }}
      />
      <div
        className="aurora-blob aurora-blob-green animate-float-slower"
        style={{
          width: "30vw",
          height: "30vw",
          top: "20%",
          right: "25%",
          opacity: 0.25,
        }}
      />
      <div
        className="aurora-blob aurora-blob-blue animate-drift-slow"
        style={{
          width: "28vw",
          height: "28vw",
          bottom: "10%",
          left: "20%",
          opacity: 0.22,
        }}
      />
      {/* add a subtle radial vignette to add depth without clutter */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 40%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%), radial-gradient(40% 30% at 80% 20%, rgba(0,212,255,0.08) 0%, rgba(0,0,0,0) 55%)",
        }}
      />
      <div className="absolute inset-0 bg-mesh" />
      <div className="beam" />
    </div>
  )
}
