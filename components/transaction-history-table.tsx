'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TransactionsWithCustomer } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
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

  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data: dataSource,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="border-separate border-spacing-y-3">
      <TableHeader>
        {getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {getRowModel().rows.map((row) => {
          return (
            <TableRow key={row.id} className="bg-white hover:cursor-pointer">
              {row.getVisibleCells().map((cell, index, self) => {
                return (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      index === 0 && 'rounded-l-md border-l-[12px]',
                      index === self.length - 1 && 'rounded-r-md',
                      row.original.pointsRedeemed
                        ? 'border-l-violet-300'
                        : 'border-l-green-200'
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
