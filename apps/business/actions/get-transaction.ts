"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export const getTransacton = async (transactionId: string) => {
  try {
    const session = await auth()

    if (!session) return { error: "Unauthorized User!" }

    const email = session.user?.email

    if (!email) return { error: "Invalid Email!" }

    const organization = await prisma.organizations.findUnique({
      select: {
        id: true
      },
      where: {
        emailAddress: email
      }
    })

    if (!organization) return { error: "Invalid Organization!" }

    const transaction = await prisma.transactions.findUnique({
      include: {
        customer: true
      },
      where: {
        id: transactionId,
        organizationId: organization.id
      }
    })

    return {
      success: "Success",
      transaction
    }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
