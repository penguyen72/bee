import { Prisma } from "@prisma/client"
import { LucideProps } from "lucide-react"
import React from "react"

export type SettingsNavItem = {
  key: string
  path: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
  label: string
}

export type TransactionsWithCustomer = Prisma.TransactionsGetPayload<{
  include: { customer: true }
}>

export type ObjectValue<T> = T[keyof T]
