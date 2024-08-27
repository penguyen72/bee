import { getTransaction } from '@/actions/get-transaction';
import { UserSummaryCard } from '@/components/business/user-summary-card';
import { RedemptionForm } from '@/components/redemption-form';

interface Props {
  params: { transactionId: string };
}

export default async function Home({ params }: Props) {
  const data = await getTransaction(params.transactionId);

  if (data.error || !data.transaction?.customer) return null;

  const user = data.transaction.customer;

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <UserSummaryCard user={user} />
      <RedemptionForm transaction={data.transaction} />
    </div>
  );
}
