import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { findNextPossibleRedemption } from '@/lib/utils';
import { Customer } from '@prisma/client';
import { format } from 'date-fns';

import { Cake, Pencil, Phone } from 'lucide-react';

interface Props {
  user: Customer;
}

export async function UserSummaryCard({ user }: Props) {
  const nextPossibleRedemption = findNextPossibleRedemption(user.currentPoints);
  const pointsUntilNextRedemption = nextPossibleRedemption - user.currentPoints;
  const percentageOfNextRedemption = Math.min(
    Math.floor((user.currentPoints / nextPossibleRedemption) * 100),
    100
  );

  return (
    <Card className="w-full border-l-blue-300 border-l-[12px]">
      <CardContent className="grid grid-cols-4 gap-12 p-3">
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-1">
            <p className="font-semibold">{user.firstName}</p>
            <Pencil className="size-4" />
          </span>
          <span className="flex items-center gap-1">
            <Phone className="size-4" />
            <p>{user.phoneNumber}</p>
          </span>
          <span className="flex items-center gap-1">
            <Cake className="size-4" />
            <p>{user.birthday ? format(user.birthday, 'MM/dd/yyyy') : null}</p>
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Points</p>
          <p className="text-2xl font-semibold">{user.currentPoints}</p>
          <Progress value={percentageOfNextRedemption} />
          {percentageOfNextRedemption === 100 ? (
            <p>Points Redeemable</p>
          ) : (
            <p>{pointsUntilNextRedemption} Points before Redemption</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Last Visit</p>
          <p className="text-2xl font-semibold">
            {format(user.updatedAt, 'MM/dd/yyyy')}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Total Visits</p>
          <p className="text-2xl font-semibold">{user.visitCount}</p>
        </div>
      </CardContent>
    </Card>
  );
}
