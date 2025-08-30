"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type WalletContextType = {
  address: string | null
  connect: (addr: string) => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("gh2_wallet")
      if (saved) setAddress(saved)
    } catch {}
  }, [])

  const connect = (addr: string) => {
    setAddress(addr)
    try {
      window.localStorage.setItem("gh2_wallet", addr)
    } catch {}
  }

  const disconnect = () => {
    setAddress(null)
    try {
      window.localStorage.removeItem("gh2_wallet")
    } catch {}
  }

  const value = useMemo(() => ({ address, connect, disconnect }), [address])
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error("useWallet must be used within WalletProvider")
  return ctx
}
