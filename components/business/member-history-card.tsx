'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const items = [
  {
    title: 'Total Members',
    content: '12',
    color: 'bg-green-200',
  },
  {
    title: 'Net Revenue',
    content: '12',
    color: 'bg-yellow-100',
  },
  {
    title: 'Rewards Redeemed',
    content: '12',
    color: 'bg-violet-300',
  },
];

export function MemberHistoryCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Today's Overview - {format(Date.now(), 'mm/dd/yyyy')}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-8">
        {items.map((item, index) => {
          return (
            <Card key={index} className={cn(item.color)}>
              <CardHeader className="px-4 pt-4 pb-2">
                <p className="font-semibold">{item.title}</p>
              </CardHeader>
              <CardContent className="px-4 pt-0 pb-4">
                <p className="text-2xl font-semibold">{item.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}
