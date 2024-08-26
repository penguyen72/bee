import { getHistoricalData } from '@/actions/get-historical-data';
import { MemberHistoryCard } from '@/components/business/member-history-card';
import { MemberHistoryTable } from '@/components/member-history-table';

export default async function Home() {
  const data = await getHistoricalData();

  if (data.error) return null;

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <MemberHistoryCard overview={data.overview} />
      <MemberHistoryTable data={data.transactions ?? []} />
    </div>
  );
}
