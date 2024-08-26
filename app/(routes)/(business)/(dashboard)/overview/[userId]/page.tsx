import { getUser } from '@/actions/get-user';
import { UserSummaryCard } from '@/components/business/user-summary-card';
import { RedemptionForm } from '@/components/redemption-form';

interface Props {
  params: { userId: string };
}

export default async function Home({ params }: Props) {
  const data = await getUser(params.userId);

  if (data.error || !data.user) return null;

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <UserSummaryCard user={data.user} />
      <RedemptionForm user={data.user} />
    </div>
  );
}
