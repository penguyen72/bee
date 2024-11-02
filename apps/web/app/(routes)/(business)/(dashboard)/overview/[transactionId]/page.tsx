import { getTransaction } from "@/actions/get-transaction"
import { RedemptionForm } from "@/components/business/transactions/redemption-form"
import { UserSummaryCard } from "@/components/ui/user-summary-card"

interface Props {
  params: Promise<{ transactionId: string }>
}

export default async function Home(props: Props) {
  const params = await props.params
  const data = await getTransaction(params.transactionId)

  if (data.error || !data.transaction?.customer) return null

  const user = data.transaction.customer

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <UserSummaryCard user={user} type="transaction" />
      <RedemptionForm transaction={data.transaction} />
    </div>
  )
}
