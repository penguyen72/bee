"use server"

import { prisma } from "@/lib/prisma"
import { getOrganization } from "./get-organization"

export const getPromotions = async () => {
  try {
    const organizationResponse = await getOrganization()

    if (organizationResponse.error) return { error: organizationResponse.error }

    const organization = organizationResponse.data

    if (!organization) return { error: "Invalid Organization!" }

    const promotions = await prisma.promotion.findMany({
      where: {
        organizationId: organization.id
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return {
      success: "Success",
      promotions
    }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
