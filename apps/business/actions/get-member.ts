"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export const getMember = async (userId: string) => {
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

    const customer = await prisma.customer.findUnique({
      where: {
        id: userId,
        organizationId: organization.id
      }
    })

    return { success: "Success", customer }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
