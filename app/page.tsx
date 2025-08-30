"use client"

import Link from "next/link"
import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import BackgroundAurora from "@/components/background-aurora"
import RoleModal from "@/components/role-modal"
import SiteHeader from "@/components/site-header"
import RotatingStats from "@/components/rotating-stats"
import StatCard from "@/components/stat-card"
import HowStep from "@/components/how-step"
import RolesTabs from "@/components/roles-tabs"
import TechBadge from "@/components/tech-badge"
import FAQ from "@/components/faq"
import FooterCol from "@/components/footer-col"

function AnimatedCounter({ to, duration = 1800 }: { to: number; duration?: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let start: number | null = null
    const step = (t: number) => {
      if (start === null) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.floor(eased * to))
      if (p < 1) requestAnimationFrame(step)
    }
    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return <span>{n.toLocaleString()}</span>
}

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setModalOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <BackgroundAurora />
      <div className="relative z-10">
        <SiteHeader onOpen={openModal} />
        <section className="mx-auto max-w-7xl px-6 md:px-10 pt-20 md:pt-28 pb-28 md:pb-36">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Left: headline + CTAs */}
            <div className="max-w-3xl">
              <h1 className="text-balance text-5xl md:text-7xl font-bold leading-tight">
                Verifiable <span className="text-[#00F5A0]">Green Hydrogen</span>.{" "}
                <span className="text-white/90">Unquestionable Trust.</span>
              </h1>
              <p className="mt-4 md:mt-6 text-pretty text-base md:text-lg text-white/80 leading-relaxed">
                Our blockchain-powered platform ensures every molecule of hydrogen is tracked, certified, and traded
                with complete transparency.
              </p>
              <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                Green H₂ Ledger links producers, certifiers, buyers, and auditors on a single verifiable network. Issue
                tamper-proof certificates, prove origin and emissions, and unlock a liquid marketplace for Green
                Hydrogen Credits (GHCs).
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  onClick={openModal}
                  variant="glass-green"
                  className={cn("focus-ring-green px-5 py-2.5 rounded-lg font-medium")}
                  aria-haspopup="dialog"
                  aria-expanded={modalOpen}
                  aria-controls="role-modal"
                >
                  Launch App
                </Button>
                <Button asChild variant="glass-blue" className="px-5 py-2.5 rounded-lg font-medium focus-ring-blue">
                  <Link href="/dashboard">Explore Dashboard</Link>
                </Button>
                <Button asChild variant="glass" className="px-5 py-2.5 rounded-lg font-medium hover:bg-white/10">
                  <Link href="/dashboard/marketplace">Marketplace</Link>
                </Button>
              </div>

              <div className="mt-8 text-sm md:text-base text-white/80">
                <RotatingStats
                  items={[
                    "Join 150+ Active Producers",
                    "Trading 1.2M GHCs Monthly",
                    "Built on Polygon for 99% Lower Emissions",
                  ]}
                />
              </div>
            </div>

            {/* Right: live snapshot widget (kept) */}
            <div className="w-full">
              <div className="glass rounded-2xl border border-white/15 p-5 md:p-6 card-hover">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">Live Certification Snapshot</h3>
                  <span className="pill pill--certified">Live</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-white/10 glass p-3 text-center">
                    <div className="text-xs text-white/60">Certified</div>
                    <div className="mt-1 text-xl font-semibold text-[#00F5A0]">7,350 Kg</div>
                  </div>
                  <div className="rounded-xl border border-white/10 glass p-3 text-center">
                    <div className="text-xs text-white/60">Pending</div>
                    <div className="mt-1 text-xl font-semibold">3</div>
                  </div>
                  <div className="rounded-xl border border-white/10 glass p-3 text-center">
                    <div className="text-xs text-white/60">GHC Supply</div>
                    <div className="mt-1 text-xl font-semibold">12,450</div>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-xs text-white/60 mb-2">Recent Batches</div>
                  <ul className="space-y-2">
                    {[
                      { id: "B-1002", status: "Certified", volume: "2,000 Kg" },
                      { id: "B-1001", status: "Pending", volume: "1,500 Kg" },
                      { id: "B-0999", status: "Rejected", volume: "700 Kg" },
                    ].map((r) => (
                      <li
                        key={r.id}
                        className="flex items-center justify-between rounded-lg glass border border-white/10 px-3 py-2"
                      >
                        <span className="text-sm">{r.id}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-white/60">{r.volume}</span>
                          <span
                            className={
                              "pill " +
                              (r.status === "Certified"
                                ? "pill--certified"
                                : r.status === "Pending"
                                  ? "pill--pending"
                                  : "pill--rejected")
                            }
                          >
                            {r.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-3 text-xs text-white/60 text-center">
                Data shown is a demo. Connect your wallet to access real activity.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 md:px-10 pb-20 md:pb-28">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Real-Time Ecosystem Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total GHCs Minted" value={5489200} suffix=" GHC" />
            <StatCard label="CO₂e Offset (Estimated)" value={4940} suffix=" Tonnes" />
            <StatCard label="Market Volume (30d)" value={1850000} suffix=" MATIC" />
            <StatCard label="Active Producers / Certifiers" value={154} extra=" / 28" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 md:px-10 pb-20 md:pb-28">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Bridging the Transparency Gap in Clean Energy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="liquid-glass rounded-2xl p-6 border border-white/15">
              <h3 className="text-lg font-semibold">Opaque, Fragmented, and Untrustworthy.</h3>
              <p className="mt-3 text-white/80 leading-relaxed">
                Traditional green energy markets suffer from a lack of transparency, making it difficult to verify
                claims and prevent greenwashing. Buyers can’t be 100% sure of the origin and impact of their credits,
                and producers struggle to access a fair, global market.
              </p>
            </div>
            <div className="liquid-glass rounded-2xl p-6 border border-white/15">
              <h3 className="text-lg font-semibold">Immutable, Unified, and Verifiable.</h3>
              <p className="mt-3 text-white/80 leading-relaxed">
                Green H₂ Ledger ties each credit to an immutable certificate on IPFS, validated by independent
                certifiers. Our public ledger provides a single source of truth, ensuring every credit is authentic,
                unique, and never double-counted.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 md:px-10 pb-20 md:pb-28">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">From Production to Proof in Four Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <HowStep
              icon="factory"
              title="Produce & Submit Proof"
              text="Producers generate green hydrogen and submit production data to IPFS."
            />
            <HowStep
              icon="badge"
              title="Independent Certification"
              text="Registered certifiers review data and issue on-chain certificates."
            />
            <HowStep
              icon="coin"
              title="Mint GHC Tokens"
              text="Use approved certificates to mint tradable GHC tokens."
            />
            <HowStep
              icon="market"
              title="Trade & Retire"
              text="Buyers purchase GHCs and retire them to claim environmental benefit."
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 md:px-10 pb-20 md:pb-28">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">A Platform for Every Stakeholder</h2>
          <div className="mt-2">
            <RolesTabs />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 md:px-10 pb-16">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Built on a Foundation of Trust and Scalability</h2>
          <div className="flex flex-wrap items-center gap-3">
            <TechBadge label="Polygon" />
            <TechBadge label="IPFS" />
            <TechBadge label="Ethereum" />
            <TechBadge label="Chainlink" />
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 md:px-10 pb-20 md:pb-28">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <FAQ />
        </section>

        <section className="mx-auto max-w-6xl px-6 md:px-10 pb-24">
          <div className="liquid-glass rounded-2xl p-8 md:p-12 border border-white/15 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold">Join the Future of Clean Energy Markets.</h3>
            <p className="mt-3 text-white/80 max-w-2xl mx-auto">
              Whether you’re producing, buying, or certifying, Green H₂ Ledger is your platform for transparent impact.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/dashboard/marketplace"
                className="px-5 py-2.5 rounded-lg font-medium glass btn-hover-blue focus-ring-blue"
              >
                Get Started Today
              </Link>
              <button
                onClick={openModal}
                className="px-5 py-2.5 rounded-lg font-medium glass btn-hover-green focus-ring-green"
                aria-haspopup="dialog"
                aria-expanded={modalOpen}
                aria-controls="role-modal"
              >
                Choose a Role
              </button>
            </div>
          </div>
        </section>

        <footer className="mx-auto max-w-7xl px-6 md:px-10 pb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            <FooterCol title="Platform" links={["Marketplace", "Dashboard Login", "Documentation", "About Us"]} />
            <FooterCol title="Ecosystem" links={["Become a Producer", "For Buyers", "Become a Certifier"]} />
            <FooterCol title="Resources" links={["Blog", "Whitepaper", "Contact Support"]} />
            <FooterCol title="Legal" links={["Privacy Policy", "Terms of Service"]} />
            <div>
              <h4 className="text-sm font-semibold">Social</h4>
              <ul className="mt-3 space-y-2 text-white/80 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    X (Twitter)
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 text-xs text-white/60">© 2025 Green H₂ Ledger. All Rights Reserved.</div>
        </footer>
      </div>

      <RoleModal id="role-modal" open={modalOpen} onClose={closeModal} />
    </main>
  )
}
