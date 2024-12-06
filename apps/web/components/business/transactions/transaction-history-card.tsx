"use client"

import apiClient from "@/apiClient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn, convertToUSD } from "@/lib/utils"
import { Query, useQuery } from "@tanstack/react-query"

interface Props {
  overview:
    | {
        totalMembers: number
        netRevenue: number
        rewardsRedeemed: number
      }
    | undefined
}

export function TransactionsCard({ overview }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["get-historical-data"],
    queryFn: async () => {
      const { data } = await apiClient.get("/get-historical-data")
      return data
    }
  })

  if (isLoading) return null

  const items = [
    {
      title: "Total Members",
      content: data.overview?.totalMembers,
      color: "bg-green-200"
    },
    {
      title: "Rewards Redeemed",
      content: convertToUSD(data.overview?.rewardsRedeemed),
      color: "bg-violet-300"
    },
    {
      title: "Net Revenue",
      content: convertToUSD(data.overview?.netRevenue),
      color: "bg-yellow-100"
    }
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-8">
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
