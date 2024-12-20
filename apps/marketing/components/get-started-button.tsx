"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export function GetStartedButton() {
  const router = useRouter()
  return (
    <Button onClick={() => router.push("https://www.customer.mighty-bee.com")}>
      Get Started
    </Button>
  )
}
