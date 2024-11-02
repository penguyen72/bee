'use client';

import { Table } from '@/components/table';
import { TransactionsWithCustomer } from '@/lib/types';
import { cn } from '@/lib/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<TransactionsWithCustomer>();

const columns = [
  columnHelper.display({
    id: 'type',
    header: 'NO.',
    cell: (info) => {
      return <p>{info.row.index + 1}</p>;
    },
  }),
  columnHelper.display({
    id: 'firstName',
    header: 'NAME',
    cell: (info) => {
      const name = info.row.original.customer.firstName;
      const createdAt = info.row.original.customer.createdAt;
      return (
        <div className="flex flex-col gap-2">
          <p>{name}</p>
          <p className="text-xs text-slate-500">
            Joined {format(createdAt, 'MMMM yyyy')}
          </p>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: 'phoneNumber',
    header: 'PHONE NUMBER',
    cell: (info) => {
      const phoneNumber = info.row.original.customer.phoneNumber;
      return <p>{phoneNumber}</p>;
    },
  }),
  columnHelper.display({
    id: 'check-in',
    header: 'CHECK-IN TIME',
    cell: (info) => {
      const checkInTime = info.row.original.checkInTime;
      return <p>{format(checkInTime, 'MM/dd/yyyy h:mm a')}</p>;
    },
  }),
  columnHelper.display({
    id: 'check-out',
    header: 'CHECK-OUT TIME',
    cell: (info) => {
      const checkOutTime = info.row.original.checkOutTime;
      return (
        <p>{checkOutTime ? format(checkOutTime, 'MM/dd/yyyy h:mm a') : null}</p>
      );
    },
  }),
  columnHelper.display({
    id: 'points-change',
    header: 'POINT CHANGE',
    cell: (info) => {
      const pointsEarned = info.row.original.pointsEarned;
      const pointsRedeemed = info.row.original.pointsRedeemed;
      return (
        <div className="flex flex-col gap-2">
          <p className="text-destructive">-{pointsRedeemed}</p>
          <p className="text-green-600">+{pointsEarned}</p>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: 'current-points',
    header: 'CURRENT POINTS',
    cell: (info) => {
      const currentPoints = info.row.original.currentPoints;

      return <p>{currentPoints}</p>;
    },
  }),
];

interface Props {
  data: TransactionsWithCustomer[];
}

export function TransactionsTable({ data }: Props) {
  const dataSource = useMemo(() => data, [data]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      tableRowProps={() => ({ className: 'bg-white hover:cursor-pointer' })}
      tableCellProps={({ row, cellIndex, cellSelf }) => ({
        className: cn(
          cellIndex === 0 && 'rounded-l-md border-l-[12px]',
          cellIndex === cellSelf.length - 1 && 'rounded-r-md',
          row.original.pointsRedeemed
            ? 'border-l-violet-300'
            : 'border-l-green-200'
        ),
      })}
    />
  );
}
