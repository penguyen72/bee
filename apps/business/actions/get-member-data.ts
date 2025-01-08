import { prisma } from "@/lib/prisma"
import { getOrganization } from "./get-organization"

export const getMemberData = async (userId: string) => {
  try {
    const organizationResponse = await getOrganization()

    if (organizationResponse.error) return { error: organizationResponse.error }

    const organization = organizationResponse.data

    if (!organization) return { error: "Invalid Organization!" }

    const customer = await prisma.customer.findUnique({
      where: {
        id: userId,
        organizationId: organization.id
      }
    })

    const redemptions = await prisma.redemptions.findMany({
      where: {
        organizationId: organization.id
      },
      orderBy: {
        pointsRequired: "asc"
      }
    })

    return { data: { customer, redemptions } }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
