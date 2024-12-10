"use client"

import { Button } from "@/components/ui/button"
import { HomeIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export function HomeButton() {
  const router = useRouter()

  return (
    <Button
      className="absolute right-8 top-8 hover:bg-slate-100/25"
      variant="ghost"
      size="icon"
      onClick={() => router.push("/")}
    >
      <HomeIcon size={32} />
    </Button>
  )
}
