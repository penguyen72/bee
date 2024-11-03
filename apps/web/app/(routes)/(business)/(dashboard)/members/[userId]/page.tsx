"use client"

import { UserSummaryCard } from "@/components/user-summary-card"
import { getMember } from "@/features/members/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

export default function Home() {
  const { userId } = useParams<{ userId: string }>()

  const { data, isLoading } = useQuery({
    queryKey: ["get-member", userId],
    queryFn: () => getMember(userId)
  })

  if (!data || isLoading) return null

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <UserSummaryCard user={data} type="member" />
    </div>
  )
}
