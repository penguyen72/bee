'use client';

import { Button } from '@/components/ui/button';
import { History, Home, Settings, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 justify-between w-full">
      <h2 className="text-xl font-semibold">Sun Nails & Spa</h2>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/overview')}
        >
          <Home />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/transactions')}
        >
          <History />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/members')}
        >
          <Users />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/settings/profile')}
        >
          <Settings />
        </Button>
      </div>
    </div>
  );
}
