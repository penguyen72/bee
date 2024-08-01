'use client';

import { SignUpForm } from '@/components/customer/sign-up-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col flex-wrap">
      <div className="bg-amber-300 min-h-[75vh] flex items-center justify-center">
        <div className="max-w-md w-full flex flex-col items-center px-4">
          <p className="text-3xl font-semibold mb-20">Nice to meet you!</p>
          <SignUpForm />
        </div>
      </div>
      <div className="bg-amber-200 min-h-[25vh] flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold">
          Start earning points for your Next Visits!
        </p>
        <p className="text-2xl">Every $1 = 1 Point</p>
        <p className="text-2xl">100 Points = $5 OFF</p>
      </div>
    </main>
  );
}
