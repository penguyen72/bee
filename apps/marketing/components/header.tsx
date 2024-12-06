"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Header() {
  const router = useRouter()

  return (
    <div className="flex flex-nowrap items-center justify-between max-w-[1000px] gap-48 py-12">
      <div className="flex items-center">
        <div
          className="flex items-center gap-2 mr-8 hover:cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image alt="bee-icon" src="/bee-icon.svg" height={28} width={28} />
          <p className="text-xl font-semibold">Mighty Bee</p>
        </div>
        <Button className="text-black" variant="link">
          Product
        </Button>
        <Button className="text-black" variant="link">
          How It Works
        </Button>
        <Button
          className="text-black"
          variant="link"
          onClick={() => router.push("/pricing")}
        >
          Pricing
        </Button>
        <Button className="text-black" variant="link">
          Contact
        </Button>
      </div>
      <div className="flex">
        <Button className="text-black" variant="link">
          Sign Up
        </Button>
        <Button
          onClick={() => router.push("https://app.mighty-bee.com/overview")}
        >
          Log In
        </Button>
      </div>
    </div>
  )
}
