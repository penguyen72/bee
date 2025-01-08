import { prisma } from "@/lib/prisma"
import { getOrganization } from "./get-organization"

export const getTransactionData = async (transactionId: string) => {
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

    const redemptions = await prisma.redemptions.findMany({
      where: {
        organizationId: organization.id
      },
      orderBy: {
        pointsRequired: "asc"
      }
    })

    return { data: { transaction, redemptions } }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
