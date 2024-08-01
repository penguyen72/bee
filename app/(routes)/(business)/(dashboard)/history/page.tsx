'use client';

import { MemberHistoryCard } from '@/components/business/member-history-card';

export default function Home() {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <MemberHistoryCard />
    </div>
  );
}
