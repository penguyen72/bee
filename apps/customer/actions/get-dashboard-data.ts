import { prisma } from "@/lib/prisma"
import { getOrganization } from "./get-organization"

export const getDashboardData = async () => {
  try {
    const organizationResponse = await getOrganization()

    if (organizationResponse.error) return { error: organizationResponse.error }

    const organization = organizationResponse.data

    if (!organization) return { error: "Invalid Organization!" }

    const redemptions = await prisma.redemptions.findMany({
      where: {
        organizationId: organization.id
      },
      orderBy: {
        pointsRequired: "asc"
      }
    })

    return { data: { organization, redemptions } }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
