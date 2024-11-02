import { getMember } from '@/actions/get-member';
import { UserSummaryCard } from '@/components/ui/user-summary-card';

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function Home(props: Props) {
  const params = await props.params;
  const data = await getMember(params.userId);

  if (data.error || !data?.customer) return null;

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <UserSummaryCard user={data.customer} type="member" />
    </div>
  );
}
