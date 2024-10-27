import { cn, findNextPossibleRedemption } from '@/lib/utils';
import { Card, CardContent } from '@bee/ui/components/ui/card';
import { Progress } from '@bee/ui/components/ui/progress';
import { Customer } from '@prisma/client';
import { format } from 'date-fns';
import { Cake, Phone } from 'lucide-react';
import { EditMemberButton } from './business/transactions/edit-member-button';

interface Props {
  user: Customer;
  type?: 'member' | 'transaction';
}

export async function UserSummaryCard({ user, type }: Props) {
  const nextPossibleRedemption = findNextPossibleRedemption(user.currentPoints);
  const pointsUntilNextRedemption = nextPossibleRedemption - user.currentPoints;
  const percentageOfNextRedemption = Math.min(Math.floor((user.currentPoints / nextPossibleRedemption) * 100), 100);

  return (
    <Card
      className={cn('w-full border-l-[12px]', type === 'member' && 'border-l-amber-300', type === 'transaction' && 'border-l-blue-300')}
    >
      <CardContent className="grid grid-cols-4 gap-12 p-3">
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2">
            <p className="font-semibold">{user.firstName}</p>
            {type === 'member' ? <EditMemberButton user={user} /> : null}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="size-4" />
            <p>{user.phoneNumber}</p>
          </span>
          {user.birthday ? (
            <span className="flex items-center gap-1">
              <Cake className="size-4" />
              <p>{format(user.birthday, 'MM/dd/yyyy')}</p>
            </span>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Points</p>
          <p className="text-2xl font-semibold">{user.currentPoints}</p>
          <Progress value={percentageOfNextRedemption} />
          {percentageOfNextRedemption === 100 ? <p>Points Redeemable</p> : <p>{pointsUntilNextRedemption} Points before Redemption</p>}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Last Visit</p>
          <p className="text-2xl font-semibold">{format(user.updatedAt, 'MM/dd/yyyy')}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Total Visits</p>
          <p className="text-2xl font-semibold">{user.visitCount}</p>
        </div>
      </CardContent>
    </Card>
  );
}
