"use client"

import Link from "next/link"

type FooterColProps = {
  title: string
  links: string[]
}

export default function FooterCol({ title, links }: FooterColProps) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 text-white/80 text-sm">
        {links.map((l, i) => (
          <li key={i}>
            <Link href="#" className="hover:underline">
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
