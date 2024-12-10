"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome
          </CardTitle>
          <CardDescription className="text-center">
            Please select how you&apos;d like to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full py-6 text-lg"
            variant="default"
            onClick={() => router.push("https://www.app.mighty-bee.com")}
          >
            Continue as Business
          </Button>
          <Button
            className="w-full py-6 text-lg"
            variant="outline"
            onClick={() => router.push("https://www.customer.mighty-bee.com")}
          >
            Continue for Customer
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
