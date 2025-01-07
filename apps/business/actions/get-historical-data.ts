"use server"

import { prisma } from "@/lib/prisma"
import { getOrganization } from "./get-organization"

export const getHistoricalData = async () => {
  try {
    const organizationResponse = await getOrganization()

    if (organizationResponse.error) return { error: organizationResponse.error }

    const organization = organizationResponse.data

    if (!organization) return { error: "Invalid Organization!" }

    const [users, transactions] = await prisma.$transaction([
      prisma.customer.findMany({
        where: {
          organizationId: organization.id
        }
      }),
      prisma.transactions.findMany({
        include: {
          customer: true
        },
        where: {
          checkOutTime: {
            not: null
          },
          organizationId: organization.id
        },
        orderBy: {
          updatedAt: "desc"
        }
      })
    ])

    const totalMembers = users.length
    const netRevenue = transactions.reduce(
      (acc, transaction) => acc + (transaction.profit ?? 0),
      0
    )
    const rewardsRedeemed = transactions.reduce(
      (acc, transaction) => acc + (transaction.expense ?? 0),
      0
    )

    return {
      success: "Success",
      overview: { totalMembers, netRevenue, rewardsRedeemed },
      transactions
    }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
