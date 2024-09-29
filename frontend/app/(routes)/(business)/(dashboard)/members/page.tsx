import { getMembers } from '@/actions/get-members';
import { MembersCard } from '@/components/business/members/members-card';
import { MembersTable } from '@/components/business/members/members-table';

export default async function Home() {
  const data = await getMembers();

  if (data.error) return null;

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <MembersCard />
      <MembersTable data={data.users ?? []} />
    </div>
  );
}
