'use client';

import { Table } from '@/components/table';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { MemberSearchSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Customer } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Fuse from 'fuse.js';

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
  const router = useRouter();
  const form = useForm<z.infer<typeof MemberSearchSchema>>({
    resolver: zodResolver(MemberSearchSchema),
    defaultValues: {
      searchString: '',
    },
  });

  const searchString = form.watch('searchString');

  const dataSource = useMemo(() => {
    if (!searchString) return data;

    const fuse = new Fuse(data, {
      isCaseSensitive: false,
      threshold: 0.2,
      keys: ['firstName', 'phoneNumber'],
    });

    return fuse.search(searchString).map((member) => member.item);
  }, [data, searchString]);

  return (
    <div>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="searchString"
            render={({ field }) => (
              <FormItem className="w-[300px]">
                <FormControl>
                  <Input placeholder="Search Name or Phone Number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Table
        dataSource={dataSource}
        columns={columns}
        tableRowProps={(row) => ({
          className: 'bg-white hover:cursor-pointer',
          onClick: () => router.push(`/members/${row.original.id}`),
        })}
        tableCellProps={({ cellIndex, cellSelf }) => ({
          className: cn(
            'border-l-amber-300',
            cellIndex === 0 && 'rounded-l-md border-l-[12px]',
            cellIndex === cellSelf.length - 1 && 'rounded-r-md'
          ),
        })}
      />
    </div>
  );
}
