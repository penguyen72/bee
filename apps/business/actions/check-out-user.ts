"use server"

import { prisma } from "@/lib/prisma"
import { Redepemtion } from "@/lib/types"
import { revalidatePath } from "next/cache"
import { getOrganization } from "./get-organization"

export const checkOutUser = async (
  transactionId: string,
  charges: number[],
  redepemtion: Redepemtion | null
) => {
  try {
    const organizationResponse = await getOrganization()

    if (organizationResponse.error) return { error: organizationResponse.error }

    const organization = organizationResponse.data

    if (!organization) return { error: "Invalid Organization!" }

    if (charges.length === 0) {
      return { error: "No Charges Applied!" }
    }

    const pointsRedeemed = redepemtion?.pointsRequired ?? null
    const expense = redepemtion?.value ?? null

    const transaction = await prisma.transactions.findUnique({
      include: {
        customer: true
      },
      where: {
        id: transactionId,
        organizationId: organization.id
      }
    })

    if (!transaction) {
      return { error: "Transaction Not Found!" }
    }

    if (transaction.checkOutTime) {
      return { error: "User Already Checked Out!" }
    }

    const totalCharge = charges.reduce((acc, charge) => {
      return acc + charge
    }, 0)

    const pointsEarned = Math.floor(totalCharge) - (expense ?? 0)

    const existingUser = transaction.customer

    if (existingUser.currentPoints < (pointsRedeemed ?? 0)) {
      return { error: "Insufficient Points!" }
    }

    const currentPoints =
      existingUser.currentPoints + pointsEarned - (pointsRedeemed ?? 0)

    await prisma.$transaction([
      prisma.transactions.update({
        where: {
          id: transaction.id,
          organizationId: organization.id
        },
        data: {
          expense,
          pointsEarned,
          pointsRedeemed,
          currentPoints,
          profit: totalCharge,
          checkOutTime: new Date()
        }
      }),
      prisma.customer.update({
        where: {
          id: existingUser.id,
          organizationId: organization.id
        },
        data: {
          currentPoints: currentPoints,
          lifetimePoints: existingUser.currentPoints + pointsEarned
        }
      })
    ])

    revalidatePath("/", "layout")
    return { success: "User Checked Out!" }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
