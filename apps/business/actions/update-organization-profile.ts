"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { ProfileSchema } from "@/schemas"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const updateOrganizationProfile = async (
  id: string,
  values: z.infer<typeof ProfileSchema>
) => {
  try {
    const session = await auth()

    if (!session) return { error: "Unauthorized User!" }

    const email = session.user?.email

    if (!email) return { error: "Invalid Email!" }

    const organization = await prisma.organizations.update({
      where: {
        emailAddress: email
      },
      data: values
    })

    revalidatePath("/", "layout")
    return { success: "Profile Updated!", organization }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
