"use client"

import { Table } from "@/components/table"
import { getCheckedInUsers } from "@/features/overview/lib/utils"
import { TransactionsWithCustomer } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createColumnHelper } from "@tanstack/react-table"

import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

const columnHelper = createColumnHelper<TransactionsWithCustomer>()

const columns = [
  columnHelper.display({
    id: "index",
    header: "NO.",
    cell: (info) => {
      return <p>{info.row.index + 1}</p>
    }
  }),
  columnHelper.display({
    id: "firstName",
    header: "NAME",
    cell: (info) => {
      const name = info.row.original.customer.firstName
      const createdAt = info.row.original.customer.createdAt
      return (
        <div className="flex flex-col gap-2">
          <p>{name}</p>
          <p className="text-xs text-slate-500">
            Joined {format(createdAt, "MMMM yyyy")}
          </p>
        </div>
      )
    }
  }),
  columnHelper.display({
    id: "phoneNumber",
    header: "PHONE NUMBER",
    cell: (info) => {
      const phoneNumber = info.row.original.customer.phoneNumber
      return <p>{phoneNumber}</p>
    }
  }),
  columnHelper.display({
    id: "type",
    header: "TYPE",
    cell: (info) => {
      return (
        <p>{info.row.original.customer.visitCount > 1 ? "Returning" : "New"}</p>
      )
    }
  }),
  columnHelper.display({
    id: "check-in",
    header: "CHECK-IN TIME",
    cell: (info) => {
      const checkInTime = info.row.original.checkInTime
      return <p>{format(checkInTime, "MM/dd/yyyy h:mm a")}</p>
    }
  }),
  columnHelper.display({
    id: "current-points",
    header: "POINTS",
    cell: (info) => {
      const currentPoints = info.row.original.currentPoints
      return <p>{currentPoints}</p>
    }
  })
]

export function OverviewTable() {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ["checked-in-users"],
    queryFn: () => getCheckedInUsers()
  })

  const dataSource = useMemo(() => data, [data])
  const router = useRouter()

  if (isLoading) return null

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      tableRowProps={(row) => ({
        className: "bg-white hover:cursor-pointer",
        onClick: () => router.push(`/overview/${row.original.id}`)
      })}
      tableCellProps={({ cellIndex, cellSelf }) => ({
        className: cn(
          cellIndex === 0 && "rounded-l-md border-l-[12px] border-l-blue-300",
          cellIndex === cellSelf.length - 1 && "rounded-r-md"
        )
      })}
    />
  )
}
