import { getCheckInUsers } from "@/actions/get-check-in-users"
import { OverviewCard } from "@/features/overview/components/overview-card"
import { OverviewTable } from "@/features/overview/components/overview-table"

export default async function Home() {
  const data = await getCheckInUsers(process.env.BUSINESS_EMAIL)

  if (data.error) return null

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <OverviewCard overview={data.overview} />
      <OverviewTable data={data.checkInUsers ?? []} />
    </div>
  )
}
