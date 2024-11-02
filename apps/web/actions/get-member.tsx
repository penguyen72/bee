"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export const getMember = async (userId: string) => {
  try {
    const session = await auth()

    if (!session) {
      return { error: "Authorized User" }
    }

    const customer = await prisma.customer.findUnique({
      where: {
        id: userId
      }
    })

    return { success: "Success", customer }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
