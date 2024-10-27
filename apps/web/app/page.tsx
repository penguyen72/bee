'use client';

import { Button } from '@bee/ui/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex h-full flex-col text-center">
      <div className="bg-[#FFF3D0] flex-1 flex flex-col gap-8 items-center justify-center p-12">
        <p className="text-6xl font-extrabold mb-12">Welcome to Sun Nails & Spa!</p>
        <Button
          className="bg-amber-300 hover:bg-amber-400 text-black text-2xl font-semibold w-96 h-14 py-4 rounded-xl shadow-md"
          onClick={() => router.push('/customer/sign-up')}
        >
          New User
        </Button>
        <Button
          className="bg-amber-200 hover:bg-amber-300 text-black text-2xl font-semibold w-96 h-14 py-4 rounded-xl shadow-md"
          onClick={() => router.push('/customer/sign-in')}
        >
          Returning User
        </Button>
      </div>
      <div className="bg-[#FFF7EA] flex flex-col items-center justify-center p-12 gap-1">
        <p className="text-3xl font-semibold mb-2">Check In and Earn Points for your Next Visits!</p>
        <p className="text-xl">250 Points = $10 Off</p>
        <p className="text-xl">500 Points = $20 Off</p>
        <p className="text-xl">750 Points = $35 Off</p>
      </div>
    </main>
  );
}
