"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export function SignOutButton() {
  return (
    <Button
      className="absolute right-8 top-8 hover:bg-slate-100/25"
      variant="ghost"
      size="icon"
      onClick={() => signOut()}
    >
      <LogOut />
    </Button>
  )
}
