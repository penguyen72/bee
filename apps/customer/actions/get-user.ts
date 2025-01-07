import { prisma } from "@/lib/prisma"
import { getOrganization } from "./get-organization"

export const getUser = async (id: string) => {
  try {
    const organizationResponse = await getOrganization()
    if (organizationResponse.error) return { error: organizationResponse.error }

    const organization = organizationResponse.data
    if (!organization) return { error: "Invalid Organization!" }

    const user = await prisma.customer.findUnique({
      where: {
        id,
        organizationId: organization.id
      }
    })

    if (!user) return { error: "User Does Not Exist!" }
    return { data: user }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
