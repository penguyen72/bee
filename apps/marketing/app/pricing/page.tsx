"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"

const prices = [
  { plan: "Basic", price: 20 },
  { plan: "Pro", price: 50 },
  { plan: "Premium", price: 100 }
]

export default function Page() {
  return (
    <div className="flex flex-col items-center h-full bg-gradient-to-b from-amber-200 to-white-500">
      <Header />
      <div className="my-12 max-w-[800px] text-center gap-6 flex flex-col items-center">
        <p className="text-4xl font-semibold">Pricing</p>
        <p>
          Choose the plan that works best for your salon’s size and goals. Each
          plan comes with seamless check-in, client management, and
          customization options to keep clients coming back.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6 my-12">
        {prices.map((item, index) => {
          return (
            <Card className="w-72" key={index}>
              <CardHeader className="text-lg font-semibold">
                {item.plan}
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <span className="flex">
                  <p className="text-3xl font-bold">${item.price}</p>
                  <p className="font-bold">/mo</p>
                </span>
                <Button className="my-3">Get Started</Button>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">What&apos;s included</p>
                  <div className="text-sm">
                    <div className="flex items-center gap-1">
                      <Check className="size-4 text-amber-500" />
                      <p>Rewards Program</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="size-4 text-amber-500" />
                      <p>Send Promotions</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="size-4 text-amber-500" />
                      <p>Unlimited Messages</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
