import { getCheckInUsers } from "@/actions/get-check-in-users"
import { OverviewCard } from "@/features/overview/components/overview-card"
import { OverviewTable } from "@/features/overview/components/overview-table"

export const dynamic = "force-dynamic"

export default async function Home() {
  const data = await getCheckInUsers()

  if (data.error) return null

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <OverviewCard overview={data.overview} />
      <OverviewTable data={data.checkInUsers ?? []} />
    </div>
  )
}
