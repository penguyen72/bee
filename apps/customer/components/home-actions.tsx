"use client"

import { useRouter } from "next/navigation"
import { Fragment } from "react"
import { Button } from "@/components/ui/button"

export function HomeActions() {
  const router = useRouter()

  return (
    <Fragment>
      <Button
        className="py-4 text-2xl font-semibold text-black shadow-md bg-amber-300 hover:bg-amber-400 w-96 h-14 rounded-xl"
        onClick={() => router.push("/sign-up")}
      >
        New User
      </Button>
      <Button
        className="py-4 text-2xl font-semibold text-black shadow-md bg-amber-200 hover:bg-amber-300 w-96 h-14 rounded-xl"
        onClick={() => router.push("/sign-in")}
      >
        Returning User
      </Button>
    </Fragment>
  )
}
