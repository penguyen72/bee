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
import { Customer } from '@prisma/client';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<TransactionsWithCustomer>();

const columns = [
  columnHelper.display({
    id: 'type',
    header: 'NO.',
    cell: (info) => {
      return <p>{info.row.index}</p>;
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
    id: 'type',
    header: 'TYPE',
    cell: (info) => {
      return (
        <p>{info.row.original.customer.visitCount > 1 ? 'Returning' : 'New'}</p>
      );
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
    id: 'current-points',
    header: 'POINTS',
    cell: (info) => {
      const currentPoints = info.row.original.currentPoints;
      return <p>{currentPoints}</p>;
    },
  }),
];

interface Props {
  data: TransactionsWithCustomer[];
}

export function OverviewTable({ data }: Props) {
  const router = useRouter();
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
            <TableRow
              key={row.id}
              className="bg-white hover:cursor-pointer"
              onClick={() => router.push(`/overview/${row.original.id}`)}
            >
              {row.getVisibleCells().map((cell, index, self) => {
                return (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      index === 0 &&
                        'rounded-l-md border-l-[12px] border-l-blue-300',
                      index === self.length - 1 && 'rounded-r-md'
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
