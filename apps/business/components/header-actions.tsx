"use client"

import { Button } from "@/components/ui/button"
import { Gift, History, Home, Settings, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export function HeaderActions() {
  const router = useRouter()

  return (
    <div className="flex items-center">
      <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
        <Home />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/transactions")}
      >
        <History />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/members")}
      >
        <Users />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/promotions")}
      >
        <Gift />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/profile")}
      >
        <Settings />
      </Button>
    </div>
  )
}
