"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export const getOrganizationProfile = async (
  emailAddress: string | undefined
) => {
  try {
    const session = await auth()

    if (!session) {
      return { error: "Authorized User" }
    }

    if (!emailAddress) {
      return { error: "Email Environment Variable Not Set!" }
    }
    const organization = await prisma.organizations.findUnique({
      where: { emailAddress }
    })

    return { success: "Success!", organization }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
