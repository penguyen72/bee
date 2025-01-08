"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getOrganization } from "./get-organization"
import { sendSMS } from "@/lib/twilio"
import { findNextPossibleRedemption } from "@/lib/utils"

export const checkOutUser = async (
  transactionId: string,
  charges: number[],
  redepemtionId: string | undefined
) => {
  try {
    const organizationResponse = await getOrganization()

    if (organizationResponse.error) return { error: organizationResponse.error }

    const organization = organizationResponse.data

    if (!organization) return { error: "Invalid Organization!" }

    if (charges.length === 0) {
      return { error: "No Charges Applied!" }
    }

    const redemption = redepemtionId
      ? await prisma.redemptions.findUnique({
          where: {
            id: redepemtionId,
            organizationId: organization.id
          }
        })
      : null

    const redemptions = await prisma.redemptions.findMany({
      where: {
        organizationId: organization.id
      }
    })

    const pointsRedeemed = redemption?.pointsRequired ?? null
    const expense = redemption?.value ?? null

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

    const customer = await prisma.$transaction(async (tx) => {
      await tx.transactions.update({
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
      })

      const customer = await tx.customer.update({
        where: {
          id: existingUser.id,
          organizationId: organization.id
        },
        data: {
          currentPoints: currentPoints,
          lifetimePoints: existingUser.currentPoints + pointsEarned
        }
      })
      return customer
    })

    const phoneNumber = "+1" + customer.phoneNumber.replaceAll("-", "")

    const nextPossibleRedemption = findNextPossibleRedemption(
      customer.currentPoints,
      redemptions
    )

    const nextRedemptionMessage =
      nextPossibleRedemption !== null &&
      customer.currentPoints < nextPossibleRedemption.pointsRequired
        ? `You need ${nextPossibleRedemption.pointsRequired - customer.currentPoints} more points for $${nextPossibleRedemption.value} off any purchase. `
        : ""

    await sendSMS(
      phoneNumber,
      `You are checked out of ${organization.businessName}! Your current balance is ${customer.currentPoints} Points. ${nextRedemptionMessage}Give us a call when you are ready to schedule your next appointment! ${organization.phoneNumber}`
    )

    revalidatePath("/", "layout")
    return { data: customer.id }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
