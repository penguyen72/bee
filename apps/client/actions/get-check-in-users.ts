"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { getStartAndEndDate } from "@/lib/utils"
import { isAfter, isBefore } from "date-fns"

export const getCheckInUsers = async (emailAddress: string | undefined) => {
  try {
    const session = await auth()

    if (!session) {
      return { error: "Authorized User" }
    }

    if (!emailAddress) {
      return { error: "Email Environment Variable Not Set!" }
    }

    const organization = await prisma.organizations.findUnique({
      where: {
        emailAddress
      }
    })

    if (!organization || !organization.timezone) {
      return { error: "Time Zone Not Set!" }
    }

    const today = new Date()
    const timezone = organization.timezone
    const { startDate, endDate } = getStartAndEndDate(today, timezone)

    const transactions = await prisma.transactions.findMany({
      include: {
        customer: true
      }
    })

    const todayOverview = transactions.filter(
      (transaction) =>
        isBefore(startDate, transaction.updatedAt) &&
        !isAfter(transaction.updatedAt, endDate)
    )

    const checkInUsers = transactions.filter(
      (transaction) => !transaction.checkOutTime
    )

    const checkInUserCount = todayOverview.filter(
      (transaction) => !transaction.checkOutTime
    ).length

    const checkOutUserCount = todayOverview.filter(
      (transaction) => transaction.checkOutTime
    ).length

    const netRevenue = todayOverview.reduce(
      (acc, transaction) => acc + (transaction.profit ?? 0),
      0
    )

    const rewardsRedeemed = transactions.reduce(
      (acc, transaction) => acc + (transaction.expense ?? 0),
      0
    )

    return {
      success: "Success",
      checkInUsers,
      overview: {
        checkInUserCount,
        checkOutUserCount,
        netRevenue,
        rewardsRedeemed,
        timezone
      }
    }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
