import { getTransactionData } from "@/actions/get-transaction-data"
import { UserSummaryCard } from "@/components/user-summary-card"
import { RedemptionForm } from "@/features/transactions/redemption-form"
import { ProjectError } from "@/lib/errors"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ transactionId: string }>
}

export default async function Home(props: Props) {
  const params = await props.params
  const response = await getTransactionData(params.transactionId)

  if (response.error) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: response.error
    })
  }

  const transaction = response.data?.transaction
  const redemptions = response.data?.redemptions

  if (!transaction) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Unable to get Transaction!"
    })
  }

  if (!redemptions) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Unable to get Redemptions!"
    })
  }

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <UserSummaryCard
        type="transaction"
        user={transaction.customer}
        redemptions={redemptions}
      />
      <RedemptionForm transaction={transaction} redemptions={redemptions} />
    </div>
  )
}
