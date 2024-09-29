'use client';

import { Button } from '@/components/ui/button';
import { History, Home, Settings, Users } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 justify-between w-full">
      <h2 className="text-xl font-semibold">Sun Nails & Spa</h2>
      <div className="flex items-center">
        {!pathname.includes('/overview') ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/overview')}
          >
            <Home />
          </Button>
        ) : null}
        {!pathname.includes('/transactions') ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/transactions')}
          >
            <History />
          </Button>
        ) : null}
        {!pathname.includes('/members') ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/members')}
          >
            <Users />
          </Button>
        ) : null}
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
