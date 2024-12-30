"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect } from "react"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#FFF7EA] px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mx-auto max-w-lg text-center">
        <Image src="bee-icon.svg" alt="bee-icon" width={150} height={150} />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, something went wrong!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Error: {error.message || "An unexpected error has occurred."}
        </p>
        <div className="flex gap-4 mx-auto my-6">
          <Button onClick={() => reset()}>Try Again</Button>
          <Button
            onClick={() => {
              window.location.href = "mailto:mightybee.business@gmail.com"
            }}
            variant="secondary"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  )
}
