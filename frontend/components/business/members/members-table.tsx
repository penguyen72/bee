'use client';

import { Table } from '@/components/table';
import { cn } from '@/lib/utils';
import { Customer } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<Customer>();

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
      const name = info.row.original.firstName;
      const createdAt = info.row.original.createdAt;
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
      const phoneNumber = info.row.original.phoneNumber;
      return <p>{phoneNumber}</p>;
    },
  }),
  columnHelper.display({
    id: 'last-visit',
    header: 'LAST VISIT',
    cell: (info) => {
      const checkInTime = info.row.original.updatedAt;
      return <p>{format(checkInTime, 'MM/dd/yyyy')}</p>;
    },
  }),
  columnHelper.display({
    id: 'last-visit',
    header: 'MEMBER TYPE',
    cell: (info) => {
      return null;
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
  data: Customer[];
}

export function MembersTable({ data }: Props) {
  const dataSource = useMemo(() => data, [data]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      tableRowProps={() => ({
        className: 'bg-white',
      })}
      tableCellProps={({ cellIndex, cellSelf }) => ({
        className: cn(
          'border-l-amber-300',
          cellIndex === 0 && 'rounded-l-md border-l-[12px]',
          cellIndex === cellSelf.length - 1 && 'rounded-r-md'
        ),
      })}
    />
  );
}
