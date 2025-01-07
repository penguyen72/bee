import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export const getOrganization = async () => {
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

    return { data: organization }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
