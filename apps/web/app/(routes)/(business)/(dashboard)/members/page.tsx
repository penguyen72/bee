import { MembersCard } from "@/features/members/components/members-card"
import { MembersTable } from "@/features/members/components/members-table"

export default function Home() {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <MembersCard />
      <MembersTable />
    </div>
  )
}
