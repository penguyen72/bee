'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col flex-wrap">
      <div
        className="bg-amber-300 min-h-[50vh] flex items-center justify-center"
        onClick={() => router.push('/sign-up')}
      >
        <p className="text-4xl">New User</p>
      </div>
      <div
        className="bg-amber-200 min-h-[50vh] flex items-center justify-center"
        onClick={() => router.push('/sign-in')}
      >
        <p className="text-4xl">Returning User</p>
      </div>
    </main>
  );
}
