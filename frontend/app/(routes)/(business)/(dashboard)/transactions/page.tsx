import { getHistoricalData } from '@/actions/get-historical-data';
import { TransactionsCard } from '@/components/business/transactions/transaction-history-card';
import { TransactionsTable } from '@/components/business/transactions/transaction-history-table';

export default async function Home() {
  const data = await getHistoricalData();

  if (data.error) return null;

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <TransactionsCard overview={data.overview} />
      <TransactionsTable data={data.transactions ?? []} />
    </div>
  );
}
