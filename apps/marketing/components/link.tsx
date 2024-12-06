"use client"

import { useRouter } from "next/navigation"

interface LinkProps {
  children: string
  href: string
}

export function Link({ children, href }: LinkProps) {
  const router = useRouter()

  return (
    <span
      className="font-semibold underline hover:cursor-pointer"
      onClick={() => router.push(href)}
    >
      {children}
    </span>
  )
}
