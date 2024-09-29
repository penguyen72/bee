'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  Row,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

interface Props<TData extends RowData> {
  dataSource: TData[];
  columns: ColumnDef<TData, any>[];
  tableRowProps?: (
    row: Row<TData>,
    index: number,
    self: Row<TData>[]
  ) => React.HTMLAttributes<HTMLTableRowElement>;
  tableCellProps?: ({
    row,
    rowIndex,
    rowSelf,
    cell,
    cellIndex,
    cellSelf,
  }: {
    row: Row<TData>;
    rowIndex: number;
    rowSelf: Row<TData>[];
    cell: Cell<TData, unknown>;
    cellIndex: number;
    cellSelf: Cell<TData, unknown>[];
  }) => React.TdHTMLAttributes<HTMLTableCellElement>;
}

export function Table<TData extends RowData>({
  dataSource,
  columns,
  tableRowProps,
  tableCellProps,
}: Props<TData>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const { pageIndex, pageSize } = pagination;
  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data: dataSource,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
  });

  function goToPage(page: number) {
    if (page < 0 || page >= Math.ceil(dataSource.length / pageSize)) return;

    setPagination((prevValue) => {
      return {
        ...prevValue,
        pageIndex: page,
      };
    });
  }

  return (
    <div>
      <ShadcnTable className="border-separate border-spacing-y-3">
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
          {getRowModel().rows.map((row, rowIndex, rowSelf) => {
            const _tableRowProps =
              typeof tableRowProps === 'function'
                ? tableRowProps(row, rowIndex, rowSelf)
                : tableRowProps;

            return (
              <TableRow key={row.id} {..._tableRowProps}>
                {row.getVisibleCells().map((cell, cellIndex, cellSelf) => {
                  const _tableCellProps =
                    typeof tableCellProps === 'function'
                      ? tableCellProps({
                          row,
                          rowIndex,
                          rowSelf,
                          cell,
                          cellIndex,
                          cellSelf,
                        })
                      : tableCellProps;

                  return (
                    <TableCell key={cell.id} {..._tableCellProps}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </ShadcnTable>
      <Pagination>
        <PaginationContent className="w-full">
          {pageIndex !== 0 ? (
            <PaginationItem className="hover:cursor-pointer mr-auto">
              <PaginationPrevious onClick={() => goToPage(pageIndex - 1)} />
            </PaginationItem>
          ) : null}
          {pageIndex !== Math.floor(dataSource.length / pageSize) ? (
            <PaginationItem className="hover:cursor-pointer ml-auto">
              <PaginationNext onClick={() => goToPage(pageIndex + 1)} />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
