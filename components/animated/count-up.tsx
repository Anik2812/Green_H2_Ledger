"use client"
import { useEffect, useRef, useState } from "react"

type Props = {
  from?: number
  to: number
  duration?: number // ms
  decimals?: number
  suffix?: string
}

export default function CountUp({ from = 0, to, duration = 1200, decimals = 0, suffix = "" }: Props) {
  const [value, setValue] = useState(from)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    let raf = 0
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts
      const progress = Math.min(1, (ts - startRef.current) / duration)
      const current = from + (to - from) * easeOutCubic(progress)
      setValue(current)
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [from, to, duration])

  return (
    <span>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}
