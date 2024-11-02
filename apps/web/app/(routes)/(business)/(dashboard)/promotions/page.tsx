'use client';

import { AddPromotionButton } from '@/components/business/promotions/add-promotion-button';
import { Table } from '@/components/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';

const columnHelper = createColumnHelper<Promotion>();

const columns = [
  columnHelper.display({
    id: 'type',
    header: 'NO.',
    cell: (info) => {
      return <p>{info.row.index + 1}</p>;
    },
  }),
  columnHelper.display({
    id: 'details',
    cell: (info) => {
      const title = info.row.original.title;
      const unit = info.row.original.unit;
      const value = info.row.original.value;
      const type = info.row.original.type;
      const expiration = info.row.original.expiration;
      const deliveredMessages = info.row.original.deliveredMessages;
      const createdAt = info.row.original.createdAt;

      return (
        <div className="flex justify-between mr-12 my-12">
          <div className="flex flex-col gap-2">
            <p>
              {title} - {value}
              {unit} Off {type}
            </p>
            <p className="text-xs text-slate-500">
              Joined {format(createdAt, 'MMMM yyyy')}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p>
              <span className="font-semibold">EXP: </span>
              {format(expiration, 'MM/dd/yyyy')}
            </p>
            <p className="text-sm text-green-700">
              {deliveredMessages} Messages Delivered
            </p>
          </div>
        </div>
      );
    },
  }),
];

type Promotion = {
  id: string;
  title: string;
  unit: string;
  value: number;
  type: string;
  expiration: Date;
  deliveredMessages: number;
  createdAt: Date;
};

const dataSource: Promotion[] = [
  {
    id: '134809340jjalsdkfj',
    title: 'Member Special',
    unit: '%',
    value: 5,
    type: 'Everything',
    expiration: new Date(),
    deliveredMessages: 123,
    createdAt: new Date(),
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Promotions</CardTitle>
        </CardHeader>
        <CardContent>
          <Card className="bg-rose-300">
            <CardHeader className="px-4 pt-4 pb-2">
              <p className="font-semibold">Members Redeemed</p>
            </CardHeader>
            <CardContent className="px-4 pt-0 pb-4">
              <p className="text-2xl font-semibold">15</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <div className="flex flex-col">
        <div className="relative flex items-center justify-center">
          <AddPromotionButton />
          <Button variant="link">Active</Button>
          <Separator className="bg-black" orientation="vertical" />
          <Button variant="link">Expired</Button>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          hideHeader
          tableRowProps={() => ({
            className: 'bg-white',
          })}
          tableCellProps={({ cellIndex, cellSelf }) => ({
            className: cn(
              cellIndex === 0 &&
                'rounded-l-md border-l-[12px] border-l-rose-300',
              cellIndex === cellSelf.length - 1 && 'rounded-r-md'
            ),
          })}
        />
      </div>
    </div>
  );
}
