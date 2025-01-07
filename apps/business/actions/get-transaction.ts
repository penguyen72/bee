"use server"

import { prisma } from "@/lib/prisma"
import { getOrganization } from "./get-organization"

export const getTransacton = async (transactionId: string) => {
  try {
    const organizationResponse = await getOrganization()

    if (organizationResponse.error) return { error: organizationResponse.error }

    const organization = organizationResponse.data

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
