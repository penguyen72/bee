"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { formatPhoneNumber } from "@/lib/utils"
import { SignInSchema } from "@/schemas"
import { revalidatePath } from "next/cache"
import { isMobilePhone } from "validator"
import { z } from "zod"

export const checkInUser = async (values: z.infer<typeof SignInSchema>) => {
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

    const { firstName, phoneNumber } = values
    if (!firstName || !phoneNumber) {
      return { error: "All Fields Required!" }
    }

    if (!isMobilePhone(formatPhoneNumber(phoneNumber), "en-US")) {
      return { error: "Invalid Phone Number!" }
    }

    const existingUser = await prisma.customer.findUnique({
      where: {
        firstName,
        phoneNumber
      }
    })

    if (!existingUser) {
      return { error: "User Not Found!" }
    }

    const user = await prisma.$transaction(async (tx) => {
      const latestTransaction = await tx.transactions.findFirst({
        where: {
          customerId: {
            equals: existingUser.id
          }
        },
        orderBy: {
          updatedAt: "desc"
        }
      })

      if (latestTransaction && !latestTransaction.checkOutTime) {
        throw new Error("User Already Checked In!")
      }

      const customer = await tx.customer.update({
        where: {
          firstName: existingUser.firstName,
          phoneNumber: existingUser.phoneNumber
        },
        data: {
          visitCount: existingUser.visitCount + 1
        }
      })

      await prisma.transactions.create({
        data: {
          organizationId: organization.id,
          customerId: customer.id,
          checkInTime: new Date(),
          checkOutTime: null,
          currentPoints: customer.currentPoints
        }
      })

      return customer
    })

    revalidatePath("/", "layout")
    return { success: "User Checked In", userId: user.id }
  } catch (error: any) {
    if (error.message === "User Already Checked In!") {
      return { error: error.message }
    }

    return { error: "Internal Server Error!" }
  }
}
