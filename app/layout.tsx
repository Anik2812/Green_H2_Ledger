import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { WalletProvider } from "@/components/providers/wallet-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Green H₂ Ledger",
  description: "Verifiable Green Hydrogen. Unquestionable Trust.",
  generator: "v0.app",
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${inter.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <WalletProvider>
            {children}
            <Analytics />
          </WalletProvider>
        </Suspense>
      </body>
    </html>
  )
}
