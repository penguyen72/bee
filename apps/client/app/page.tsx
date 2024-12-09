"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex flex-col h-full text-center">
      <div className="bg-[#FFF3D0] flex-1 flex flex-col gap-8 items-center justify-center p-12">
        <p className="mb-12 text-6xl font-extrabold">
          Welcome to Sun Nails & Spa!
        </p>
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
      </div>
      <div className="bg-[#FFF7EA] flex flex-col items-center justify-center p-12 gap-1">
        <p className="mb-2 text-3xl font-semibold">
          Check In and Earn Points for your Next Visits!
        </p>
        <p className="text-xl">250 Points = $10 Off</p>
        <p className="text-xl">500 Points = $20 Off</p>
        <p className="text-xl">750 Points = $35 Off</p>
      </div>
    </main>
  )
}
