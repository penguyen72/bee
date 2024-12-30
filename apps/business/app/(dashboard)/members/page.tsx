import { getMembers } from "@/actions/get-members"
import { MembersCard } from "@/features/members/components/members-card"
import { MembersTable } from "@/features/members/components/members-table"

export default async function Home() {
  const data = await getMembers()

  if (data.error) return null

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <MembersCard data={data.users ?? []} />
      <MembersTable data={data.users ?? []} />
    </div>
  )
}
