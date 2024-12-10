"use client"

import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface LinkProps {
  className?: string
  children: string
  href: string
}

export function Link({ children, className, href }: LinkProps) {
  const router = useRouter()

  return (
    <span
      className={cn("font-semibold underline hover:cursor-pointer", className)}
      onClick={() => router.push(href)}
    >
      {children}
    </span>
  )
}
