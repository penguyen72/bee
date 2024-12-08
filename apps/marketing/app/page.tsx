import { Link } from "@/components/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col items-center max-w-[1100px] w-full mx-auto">
      <div className="py-24 w-full min-h-[600px] flex flex-col justify-between">
        <div className="flex flex-col items-center text-center gap-6">
          <p className="text-5xl font-semibold">Simplified Loyalty Solutions</p>
          <p>
            Mighty Bee helps small businesses strengthen customer relationships
            and drive recurring business.
          </p>
          <Button>Get Started</Button>
        </div>
      </div>
      <div className="flex justify-between w-full px-4 py-8 items-start">
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
      <Separator />
      <div className="w-full px-4 py-6 pb-12">
        <p className="text-xs">
          Copyright &copy; 2024 Mighty Bee. All Rights Reserved
        </p>
      </div>
    </div>
  )
}
