"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export const getOrganizationProfile = async () => {
  try {
    const session = await auth()

    if (!session) return { error: "Unauthorized User!" }

    const email = session.user?.email

    if (!email) return { error: "Invalid Email!" }

    const organization = await prisma.organizations.findUnique({
      where: {
        emailAddress: email
      }
    })

    if (!organization) return { error: "Invalid Organization!" }

    return { success: "Success!", organization }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
