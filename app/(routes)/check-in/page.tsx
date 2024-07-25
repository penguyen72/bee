'use client';

import { useSessionStorage } from 'usehooks-ts';

export default function Home() {
  const [user, setUser] = useSessionStorage<{
    firstName: string;
    visits: number;
  } | null>('user-info', null);

  if (!user?.visits) return null;

  if (user?.visits > 1) {
    return (
      <main className="bg-amber-200 flex min-h-screen flex-col items-center justify-center gap-12">
        <p className="text-xl font-semibold">
          Thank you {user.firstName} for Checking In!
        </p>
        <p className="text-4xl">You currently have (###) Points!</p>
        <p className="text-xl">
          Please let us know at Check Out if you would like to Redeem
        </p>
      </main>
    );
  }

  return (
    <main className="bg-amber-200 flex min-h-screen flex-col items-center justify-center gap-8">
      <p className="text-xl font-semibold">Thank you (Name) for Checking In!</p>
      <p className="text-xl">
        You will earn points for Today&apos;s Visit after Check Out!
      </p>
    </main>
  );
}
