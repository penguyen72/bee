"use client"

import { Button } from "@/components/ui/button"
import { CircleArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function HomeButton() {
  const router = useRouter()

  return (
    <Button
      className="hover:bg-amber-100 rounded-full size-12 ml-auto"
      variant="ghost"
      size="icon"
      onClick={() => router.push("/")}
    >
      <CircleArrowRight className="size-10" />
    </Button>
  )
}
