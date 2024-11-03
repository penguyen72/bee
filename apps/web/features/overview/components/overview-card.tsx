"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getOverviewStats } from "@/features/overview/lib/utils"
import { cn, convertToUSD } from "@/lib/utils"
import { useSuspenseQuery } from "@tanstack/react-query"
import { endOfDay, format, startOfDay } from "date-fns"

export function OverviewCard() {
  const today = new Date()

  const start = startOfDay(today)
  const end = endOfDay(today)

  const { data, isLoading } = useSuspenseQuery({
    queryKey: ["overview-stats"],
    queryFn: () => getOverviewStats(start, end)
  })

  const items = [
    {
      title: "Checked-In Members",
      content: data.checkInUserCount,
      color: "bg-blue-300"
    },
    {
      title: "Checked-Out Members",
      content: data.checkOutUserCount,
      color: "bg-green-200"
    },
    {
      title: "Rewards Redeemed",
      content: convertToUSD(data.rewardsRedeemed),
      color: "bg-violet-300"
    },
    {
      title: "Net Revenue",
      content: convertToUSD(data.netRevenue),
      color: "bg-yellow-100"
    }
  ]

  if (isLoading) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Today&apos;s Overview - {format(new Date(), "MM/dd/yyyy")}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-4 gap-8">
        {items.map((item, index) => {
          return (
            <Card key={index} className={cn(item.color)}>
              <CardHeader className="px-4 pt-4 pb-2">
                <p className="font-semibold">{item.title}</p>
              </CardHeader>
              <CardContent className="px-4 pt-0 pb-4">
                <p className="text-2xl font-semibold">{item.content}</p>
              </CardContent>
            </Card>
          )
        })}
      </CardContent>
    </Card>
  )
}
