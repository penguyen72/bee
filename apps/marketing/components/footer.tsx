import Image from "next/image"
import { Fragment } from "react"
import { Link } from "@/components/link"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <div className="flex flex-col items-center max-w-[1100px] w-full mx-auto">
      <div className="flex items-start justify-between w-full px-4 py-8">
        <div className="flex items-center gap-2">
          <Image alt="bee-icon" src="/bee-icon.svg" height={28} width={28} />
          <p className="text-xl font-semibold">Mighty Bee</p>
        </div>
        <div className="flex flex-col gap-2">
          <p>Legal</p>
          <Link
            className="text-xs no-underline hover:underline"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-xs no-underline hover:underline"
            href="/terms-of-agreement"
          >
            Terms of Agreement
          </Link>
        </div>
      </div>
      <Separator className="bg-black" />
      <div className="w-full px-4 py-6 pb-12">
        <p className="text-xs">
          Copyright &copy; 2024 Mighty Bee. All Rights Reserved
        </p>
      </div>
    </div>
  )
}
