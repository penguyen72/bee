import { prisma } from "@/lib/prisma"
import { getOrganization } from "./get-organization"
import { ProjectError } from "@/lib/errors"

export const getUser = async (id: string) => {
  const organization = await getOrganization()

  const user = await prisma.customer.findUnique({
    where: {
      id,
      organizationId: organization.id
    }
  })

  if (!user)
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "User Does Not Exist!"
    })

  return user
}
