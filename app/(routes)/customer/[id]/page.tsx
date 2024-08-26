import { getUser } from '@/actions/get-user';

interface Props {
  params: { id: string };
}

export default async function Home({ params }: Props) {
  const data = await getUser(params.id);

  if (data.error || !data.user) return null;

  if (data.user.visitCount > 1) {
    return (
      <main className="bg-amber-200 flex min-h-screen flex-col items-center justify-center gap-12">
        <p className="text-xl font-semibold">
          Thank you {data.user.firstName} for Checking In!
        </p>
        <p className="text-4xl">
          You currently have {data.user.currentPoints} Points!
        </p>
        <p className="text-xl">
          Please let us know at Check Out if you would like to Redeem
        </p>
      </main>
    );
  }

  return (
    <main className="bg-amber-300 flex min-h-screen flex-col items-center justify-center gap-8">
      <p className="text-xl font-semibold">
        Thank you {data.user.firstName} for Checking In!
      </p>
      <p className="text-xl">
        You will earn points for Today&apos;s Visit after Check Out!
      </p>
    </main>
  );
}
