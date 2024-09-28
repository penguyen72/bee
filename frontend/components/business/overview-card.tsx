import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, convertToUSD } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { formatInTimeZone, getTimezoneOffset } from 'date-fns-tz';

interface Props {
  overview:
    | {
        checkInUserCount: number;
        checkOutUserCount: number;
        netRevenue: number;
        rewardsRedeemed: number;
        timezone: string;
      }
    | undefined;
}

export function OverviewCard({ overview }: Props) {
  if (!overview) return null;

  const items = [
    {
      title: 'Checked-In Members',
      content: overview.checkInUserCount,
      color: 'bg-blue-300',
    },
    {
      title: 'Checked-Out Members',
      content: overview.checkOutUserCount,
      color: 'bg-green-200',
    },
    {
      title: 'Rewards Redeemed',
      content: convertToUSD(overview.rewardsRedeemed),
      color: 'bg-violet-300',
    },
    {
      title: 'Net Revenue',
      content: convertToUSD(overview.netRevenue),
      color: 'bg-yellow-100',
    },
  ];

  const currentDateBasedOnTimeZone = formatInTimeZone(
    Date.now(),
    overview.timezone,
    'MM/dd/yyyy'
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Today&apos;s Overview - {currentDateBasedOnTimeZone}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-4 gap-8">
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
