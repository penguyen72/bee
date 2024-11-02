import { getCheckInUsers } from '@/actions/get-check-in-users';
import { OverviewCard } from '@/components/business/overview/overview-card';
import { OverviewTable } from '@/components/business/overview/overview-table';

export default async function Home() {
  const data = await getCheckInUsers(process.env.BUSINESS_EMAIL);

  if (data.error) return null;

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <OverviewCard overview={data.overview} />
      <OverviewTable data={data.checkInUsers ?? []} />
    </div>
  );
}
