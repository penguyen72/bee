import { getHistoricalData } from "@/actions/get-historical-data"
import { TransactionsCard } from "@/features/transactions/transaction-history-card"
import { TransactionsTable } from "@/features/transactions/transaction-history-table"

export const dynamic = "force-dynamic"

export default async function Home() {
  const data = await getHistoricalData()

  if (data.error) return null

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <TransactionsCard overview={data.overview} />
      <TransactionsTable data={data.transactions ?? []} />
    </div>
  )
}
