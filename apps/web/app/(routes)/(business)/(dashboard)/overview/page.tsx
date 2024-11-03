import { OverviewCard } from "@/features/overview/components/overview-card"
import { OverviewTable } from "@/features/overview/components/overview-table"

export default function Home() {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <OverviewCard />
      <OverviewTable />
    </div>
  )
}
