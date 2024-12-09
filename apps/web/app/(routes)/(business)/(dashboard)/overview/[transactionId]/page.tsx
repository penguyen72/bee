import { RedemptionForm } from "@/components/business/transactions/redemption-form"
import { UserSummaryCard } from "@/components/ui/user-summary-card"
import prisma from "@/lib/prisma"

interface Props {
  params: Promise<{ transactionId: string }>
}

export default async function Home(props: Props) {
  const params = await props.params
  const transaction = await prisma.transactions.findUnique({
    include: {
      customer: true
    },
    where: {
      id: params.transactionId
    }
  })

  if (!transaction?.customer) return null

  const user = transaction.customer

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <UserSummaryCard user={user} type="transaction" />
      <RedemptionForm transaction={transaction} />
    </div>
  )
}
