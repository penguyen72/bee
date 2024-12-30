"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { AddPromotionSchema } from "@/schemas"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const addPromotion = async (
  values: z.infer<typeof AddPromotionSchema>,
  deliveredMessages: number
) => {
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

    const { title, unit, value, type, expiration } = values

    if (!title) {
      return { error: "Title is Required!" }
    }

    if (!unit) {
      return { error: "Unit is Required!" }
    }

    if (!value) {
      return { error: "Value is Required!" }
    }

    if (!type) {
      return { error: "Type is Required!" }
    }

    if (!expiration) {
      return { error: "Expiration is Required!" }
    }

    await prisma.promotion.create({
      data: {
        title,
        unit,
        expiration,
        type,
        deliveredMessages,
        value: Number(value),
        organizationId: organization.id
      }
    })

    revalidatePath("/", "layout")
    return { success: "Promotion Added!" }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
