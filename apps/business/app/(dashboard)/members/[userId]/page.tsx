import { getMemberData } from "@/actions/get-member-data"
import { UserSummaryCard } from "@/components/user-summary-card"
import { ProjectError } from "@/lib/errors"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ userId: string }>
}

export default async function Home(props: Props) {
  const params = await props.params
  const response = await getMemberData(params.userId)

  if (response.error) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: response.error
    })
  }

  const customer = response.data?.customer
  const redemptions = response.data?.redemptions

  if (!customer) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Unable to get Customer!"
    })
  }

  if (!redemptions) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Unable to get Redemptions!"
    })
  }

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <UserSummaryCard
        type="member"
        user={customer}
        redemptions={redemptions}
      />
    </div>
  )
}
