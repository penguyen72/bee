import { getTransacton } from "@/actions/get-transaction"
import { UserSummaryCard } from "@/components/user-summary-card"
import { RedemptionForm } from "@/features/transactions/redemption-form"

interface Props {
  params: Promise<{ transactionId: string }>
}

export default async function Home(props: Props) {
  const params = await props.params
  const data = await getTransacton(params.transactionId)

  if (data.error || !data?.transaction) return null

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <UserSummaryCard user={data.transaction.customer} type="transaction" />
      <RedemptionForm transaction={data.transaction} />
    </div>
  )
}
