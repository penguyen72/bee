"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getMembers, getMemberStats } from "@/features/members/lib/utils"
import { cn } from "@/lib/utils"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"

export function MembersCard() {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ["members"],
    queryFn: () => getMembers()
  })

  const memberStats = useMemo(() => {
    return getMemberStats(data)
  }, [data])

  if (isLoading) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>
      <CardContent>
        <Card className="bg-amber-300 p-4 grid grid-cols-5">
          {memberStats.map((item, index) => {
            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col justify-between gap-1",
                  index === 0 && "font-semibold border-r-2 border-r-white",
                  index !== 0 && "ml-6"
                )}
              >
                <p>{item.title}</p>
                <p className="text-2xl">{item.content}</p>
              </div>
            )
          })}
        </Card>
      </CardContent>
    </Card>
  )
}
