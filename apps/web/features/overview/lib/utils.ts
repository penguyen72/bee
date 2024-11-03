import apiClient from "@/apiClient"
import { TransactionsWithCustomer } from "@/lib/types"
import { OverviewStats } from "./types"

export async function getOverviewStats(
  start: Date,
  end: Date
): Promise<OverviewStats> {
  const { data } = await apiClient.get("/get-overview-stats", {
    params: { start, end }
  })
  return data
}

export async function getCheckedInUsers(): Promise<TransactionsWithCustomer[]> {
  const { data } = await apiClient.get("/get-checked-in-users")
  return data
}
