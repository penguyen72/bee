'use client';

import { Button } from '@/components/ui/button';
import { History, Home, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function OverviewHeader() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 justify-between w-full">
      <h2 className="text-xl font-semibold">Sun Nails & Spa</h2>
      <div className="flex items-center">
        {!pathname.includes('/dashboard') ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard')}
          >
            <Home />
          </Button>
        ) : null}
        {pathname.includes('/dashboard') ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/history')}
          >
            <History />
          </Button>
        ) : null}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/settings')}
        >
          <Settings />
        </Button>
      </div>
    </div>
  );
}
