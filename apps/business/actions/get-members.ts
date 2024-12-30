"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export const getMembers = async () => {
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
