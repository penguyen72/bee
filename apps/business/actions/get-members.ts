"use server"

import { prisma } from "@/lib/prisma"
import { getOrganization } from "./get-organization"

export const getMembers = async () => {
  try {
    const organizationResponse = await getOrganization()

    if (organizationResponse.error) return { error: organizationResponse.error }

    const organization = organizationResponse.data

    if (!organization) return { error: "Invalid Organization!" }

    const users = await prisma.customer.findMany({
      where: {
        organizationId: organization.id
      },
      orderBy: {
        updatedAt: "desc"
      }
    })

    return {
      success: "Success",
      users
    }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
