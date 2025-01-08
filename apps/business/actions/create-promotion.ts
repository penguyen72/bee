"use server"

import { prisma } from "@/lib/prisma"
import { AddPromotionSchema } from "@/schemas"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { getOrganization } from "./get-organization"
import { sendSMS } from "@/lib/twilio"
import { subYears } from "date-fns"

export const createPromotion = async (
  values: z.infer<typeof AddPromotionSchema>
) => {
  try {
    const organizationResponse = await getOrganization()

    if (organizationResponse.error) return { error: organizationResponse.error }

    const organization = organizationResponse.data

    if (!organization) return { error: "Invalid Organization!" }

    const { title, unit, value, type, expiration, message } = values

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

    if (!message) {
      return { error: "Message is Required!" }
    }

    const customers = await prisma.customer.findMany({
      select: {
        phoneNumber: true,
        updatedAt: true
      },
      where: {
        updatedAt: {
          gte: subYears(new Date(), 2)
        },
        organizationId: organization.id
      }
    })

    const customerNumbers = [
      ...new Set(
        customers.map((item) => "+1" + item.phoneNumber.replaceAll("-", ""))
      )
    ]

    const response = await Promise.allSettled(
      customerNumbers.map((number) => sendSMS(number, message))
    )

    const deliveredMessages = response.filter(
      (item) => item.status === "fulfilled"
    ).length

    const promotion = await prisma.promotion.create({
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
    return { data: promotion.id }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
