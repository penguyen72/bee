import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function MembersCard() {
  const items = [
    {
      title: 'Total Members',
      content: 1254,
    },
    {
      title: 'VIP Members',
      content: 202,
    },
    {
      title: 'Regular Members',
      content: 800,
    },
    {
      title: 'At Risk Members',
      content: 212,
    },
    {
      title: 'New Members',
      content: 40,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>
      <CardContent>
        <Card className="bg-amber-300 p-4 grid grid-cols-5">
          {items.map((item, index) => {
            return (
              <div
                className={cn(
                  'flex flex-col justify-between gap-1',
                  index === 0 && 'font-semibold border-r-2 border-r-white',
                  index !== 0 && 'ml-6'
                )}
              >
                <p>{item.title}</p>
                <p className="text-2xl">{item.content}</p>
              </div>
            );
          })}
        </Card>
      </CardContent>
    </Card>
  );
}
