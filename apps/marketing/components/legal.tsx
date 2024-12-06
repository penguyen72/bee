"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function Legal() {
  const router = useRouter()

  return (
    <div className="flex">
      <Button
        className="text-black"
        variant="link"
        onClick={() => router.push("/privacy-notice")}
      >
        Privacy Notice
      </Button>
      <Button
        className="text-black"
        variant="link"
        onClick={() => router.push("/terms-of-agreement")}
      >
        Terms of Agreement
      </Button>
    </div>
  )
}
