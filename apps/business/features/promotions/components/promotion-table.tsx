"use client"

import { Table } from "@/components/table"
import { cn } from "@/lib/utils"
import { Promotion } from "@prisma/client"
import { createColumnHelper } from "@tanstack/react-table"
import { format } from "date-fns"

const columnHelper = createColumnHelper<Promotion>()

const columns = [
  columnHelper.display({
    id: "number",
    header: "NO.",
    cell: (info) => {
      return <p>{info.row.index + 1}</p>
    }
  }),
  columnHelper.display({
    id: "details",
    cell: (info) => {
      const title = info.row.original.title
      const unit = info.row.original.unit
      const value = info.row.original.value
      const type = info.row.original.type
      const expiration = info.row.original.expiration
      const deliveredMessages = info.row.original.deliveredMessages
      const createdAt = info.row.original.createdAt

      return (
        <div className="flex justify-between mr-12 my-12">
          <div className="flex flex-col gap-2">
            <p>
              {title} - {value}
              {unit} Off {type}
            </p>
            <p className="text-xs text-slate-500">
              Added {format(createdAt, "MMMM yyyy")}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p>
              <span className="font-semibold">EXP: </span>
              {format(expiration, "MM/dd/yyyy")}
            </p>
            <p className="text-sm text-green-700">
              {deliveredMessages} Messages Delivered
            </p>
          </div>
        </div>
      )
    }
  })
]

interface Props {
  data: Promotion[]
}

export function PromotionTable({ data }: Props) {
  return (
    <Table
      dataSource={data}
      columns={columns}
      hideHeader
      tableRowProps={() => ({
        className: "bg-white"
      })}
      tableCellProps={({ cellIndex, cellSelf }) => ({
        className: cn(
          cellIndex === 0 && "rounded-l-md border-l-[12px] border-l-rose-300",
          cellIndex === cellSelf.length - 1 && "rounded-r-md"
        )
      })}
    />
  )
}
