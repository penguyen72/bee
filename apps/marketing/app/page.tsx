import { Header } from "@/components/header"
import { Legal } from "@/components/legal"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full bg-gradient-to-b from-amber-200 to-white-500">
      <Header />
      <div className="py-12 max-w-[800px] h-full flex flex-col justify-between">
        <div className="flex flex-col items-center text-center gap-6">
          <p className="text-4xl font-semibold">
            Effortless Check-Ins for Your Nail Salon
          </p>
          <p>
            Streamline client check-ins, reduce wait times, and elevate the
            experience with a solution built for busy salons. Simplify bookings
            and create a seamless visit for every client.
          </p>
          <Button>Get Started</Button>
        </div>
        <Legal />
      </div>
    </div>
  )
}
