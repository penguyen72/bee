'use client';

import { Header } from '@/components/header';
import { Button } from '@bee/ui/components/ui/button';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-full bg-gradient-to-b from-amber-200 to-white-500">
      <Header />
      <div className="my-12 max-w-[800px] text-center gap-6 flex flex-col items-center">
        <p className="text-4xl font-semibold">Effortless Check-Ins for Your Nail Salon</p>
        <p>
          Streamline client check-ins, reduce wait times, and elevate the experience with a solution built for busy salons. Simplify
          bookings and create a seamless visit for every client.
        </p>
        <Button>Get Started</Button>
      </div>
    </div>
  );
}
