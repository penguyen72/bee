import { auth } from "@/auth"
import { ProjectError } from "@/lib/errors"
import { prisma } from "@/lib/prisma"

export const getOrganization = async () => {
  const session = await auth()

  if (!session)
    throw new ProjectError({
      name: "UNAUTHORIZED",
      message: "Unauthorized User!"
    })

  const email = session.user?.email

  if (!email)
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Invalid Email!"
    })

  const organization = await prisma.organizations.findUnique({
    select: {
      id: true,
      businessName: true
    },
    where: {
      emailAddress: email
    }
  })

  if (!organization)
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Invalid Organization!"
    })

  return organization
}
