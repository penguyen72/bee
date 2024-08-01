'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Cake, Pencil, Phone } from 'lucide-react';

export function UserSummaryCard() {
  return (
    <Card className="w-full border-l-blue-300 border-l-[12px]">
      <CardContent className="grid grid-cols-4 gap-12 p-3">
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-1">
            <p className="font-semibold">Peyton</p>
            <Pencil className="size-4" />
          </span>
          <span className="flex items-center gap-1">
            <Phone className="size-4" />
            <p>123-456-7890</p>
          </span>
          <span className="flex items-center gap-1">
            <Cake className="size-4" />
            <p>1/11/2000</p>
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Points</p>
          <p className="text-2xl font-semibold">75</p>
          <Progress value={33} />
          <p>25 Points before Redemption</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Last Visit</p>
          <p className="text-2xl font-semibold">06/20/2024</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Total Visits</p>
          <p className="text-2xl font-semibold">10</p>
        </div>
      </CardContent>
    </Card>
  );
}
