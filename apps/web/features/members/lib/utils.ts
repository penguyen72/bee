import apiClient from "@/apiClient"
import { Customer } from "@prisma/client"
import { isAfter, subWeeks } from "date-fns"
import { Member, REDEPEMTIONS } from "./constants"
import { MemberType } from "./types"

export async function getMembers(): Promise<Customer[]> {
  const { data } = await apiClient.get("/get-members")
  return data
}

export async function getMember(userId: string): Promise<Customer> {
  const { data } = await apiClient.get("/get-member", {
    params: { userId }
  })
  return data
}

export function findNextPossibleRedemption(currentPoints: number) {
  let left = 0
  let right = REDEPEMTIONS.length - 1

  while (left < right) {
    const mid = Math.floor((left + right) / 2)

    if (currentPoints > REDEPEMTIONS[mid].pointsRequired) {
      left = mid + 1
    } else {
      right = mid
    }
  }

  return REDEPEMTIONS[left].pointsRequired
}

export function determineMemberType(user: Customer): MemberType {
  const today = new Date()
  if (user.visitCount === 1) {
    return "New"
  } else if (isAfter(user.updatedAt, subWeeks(today, 2))) {
    return "Vip"
  } else if (isAfter(user.updatedAt, subWeeks(today, 4))) {
    return "Regular"
  } else {
    return "At Risk"
  }
}

export function getMemberStats(data: Customer[] | undefined) {
  const totalMembers = data?.length ?? "-"
  const vipMembers =
    data?.filter((user) => determineMemberType(user) === "Vip").length ?? "-"
  const regularMembers =
    data?.filter((user) => determineMemberType(user) === "Regular").length ??
    "-"
  const atRiskMembers =
    data?.filter((user) => determineMemberType(user) === "At Risk").length ??
    "-"
  const newMembers =
    data?.filter((user) => determineMemberType(user) === "New").length ?? "-"

  return [
    {
      title: "Total Members",
      content: totalMembers
    },
    {
      title: "VIP Members",
      content: vipMembers
    },
    {
      title: "Regular Members",
      content: regularMembers
    },
    {
      title: "At Risk Members",
      content: atRiskMembers
    },
    {
      title: "New Members",
      content: newMembers
    }
  ]
}

export const MEMBER_TYPE_COLOR: Record<MemberType, string> = {
  [Member.NEW]: "text-blue-700",
  [Member.RISK]: "text-red-700",
  [Member.REGULAR]: "text-green-700",
  [Member.VIP]: "text-yellow-700"
}
