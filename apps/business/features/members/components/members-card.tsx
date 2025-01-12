"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn, determineMemberType } from "@/lib/utils"
import { Customer } from "@prisma/client"
import { useMemo } from "react"

interface Props {
  data: Customer[]
}

export function MembersCard({ data }: Props) {
  const items = useMemo(() => {
    const totalMembers = data.length
    const vipMembers = data.filter(
      (user) => determineMemberType(user) === "VIP"
    ).length
    const regularMembers = data.filter(
      (user) => determineMemberType(user) === "Regular"
    ).length
    const atRiskMembers = data.filter(
      (user) => determineMemberType(user) === "At Risk"
    ).length
    const newMembers = data.filter(
      (user) => determineMemberType(user) === "New"
    ).length

    return [
      {
        title: "Total Members",
        content: totalMembers
      },
      {
        title: "VIP Members",
        content: vipMembers
      },
      {
        title: "Regular Members",
        content: regularMembers
      },
      {
        title: "At Risk Members",
        content: atRiskMembers
      },
      {
        title: "New Members",
        content: newMembers
      }
    ]
  }, [data])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>
      <CardContent>
        <Card className="bg-amber-300 p-4 grid grid-cols-5">
          {items.map((item, index) => {
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
