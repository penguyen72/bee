"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export const getPromotions = async () => {
  try {
    const session = await auth()

    if (!session) {
      return { error: "Authorized User" }
    }

    const promotions = await prisma.promotion.findMany({
      select: {
        id: true,
        title: true,
        unit: true,
        value: true,
        type: true,
        expiration: true,
        deliveredMessages: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return {
      success: "Success",
      promotions
    }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
