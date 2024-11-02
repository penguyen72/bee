"use client"

import { Home } from "lucide-react"
import { useRouter } from "next/navigation"

interface Props {
  title: string
}

export function SettingsHeader({ title }: Props) {
  const router = useRouter()

  return (
    <div className="flex justify-between items-center">
      <p className="text-2xl font-semibold">{title}</p>
      <Home
        className="hover:cursor-pointer"
        onClick={() => router.push("/overview")}
      />
    </div>
  )
}

export default SettingsHeader
