"use server"

import { prisma } from "@/lib/prisma"
import { AddPromotionSchema } from "@/schemas"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { getOrganization } from "./get-organization"

export const addPromotion = async (
  values: z.infer<typeof AddPromotionSchema>,
  deliveredMessages: number
) => {
  try {
    const organizationResponse = await getOrganization()

    if (organizationResponse.error) return { error: organizationResponse.error }

    const organization = organizationResponse.data

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
