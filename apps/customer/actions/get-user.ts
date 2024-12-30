"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export const getUser = async (id: string) => {
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

    const user = await prisma.customer.findUnique({
      where: {
        id,
        organizationId: organization.id
      }
    })

    return { success: "Success", user }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
