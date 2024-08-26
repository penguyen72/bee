'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Customer } from '@prisma/client';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<Customer>();

const columns = [
  columnHelper.display({
    id: 'type',
    header: 'NO.',
    cell: (info) => {
      return <p>{info.row.index}</p>;
    },
  }),
  columnHelper.accessor('firstName', {
    header: 'NAME',
    cell: (info) => {
      const createdAt = info.row.original.createdAt;

      return (
        <div className="flex flex-col gap-2">
          <p>{info.getValue()}</p>
          <p className="text-xs text-slate-500">
            Joined {format(createdAt, 'MMMM yyyy')}
          </p>
        </div>
      );
    },
  }),
  columnHelper.accessor('phoneNumber', {
    header: 'PHONE NUMBER',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.display({
    id: 'type',
    header: 'TYPE',
    cell: (info) => {
      return <p>{info.row.original.visitCount > 1 ? 'Returning' : 'New'}</p>;
    },
  }),
  columnHelper.display({
    id: 'check-in',
    header: 'CHECK-IN TIME',
    cell: (info) => {
      const updatedAt = info.row.original.updatedAt;
      return <p>{format(updatedAt, 'MM/dd/yyyy h:mm a')}</p>;
    },
  }),
  columnHelper.accessor('currentPoints', {
    header: 'POINTS',
    footer: (info) => info.column.id,
  }),
];

interface Props {
  data: Customer[];
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
