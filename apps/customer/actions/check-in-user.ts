"use server"

import { prisma } from "@/lib/prisma"
import { formatPhoneNumber } from "@/lib/utils"
import { SignInSchema } from "@/schemas"
import { revalidatePath } from "next/cache"
import { isMobilePhone } from "validator"
import { z } from "zod"
import { getOrganization } from "./get-organization"

export const checkInUser = async (values: z.infer<typeof SignInSchema>) => {
  try {
    const organizationResponse = await getOrganization()

    if (organizationResponse.error) {
      return { error: organizationResponse.error }
    }

    const organization = organizationResponse.data
    if (!organization) return { error: "Invalid Organization!" }

    const { phoneNumber } = values
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber)

    if (!isMobilePhone(formattedPhoneNumber, "en-US")) {
      return { error: "Invalid Phone Number!" }
    }

    const existingUser = await prisma.customer.findUnique({
      where: {
        customer_identifier: {
          phoneNumber: formattedPhoneNumber,
          organizationId: organization.id
        }
      }
    })

    if (!existingUser) {
      return { error: "User Not Found!" }
    }

    const latestTransaction = await prisma.transactions.findFirst({
      where: {
        customerId: existingUser.id,
        organizationId: organization.id
      },
      orderBy: {
        updatedAt: "desc"
      }
    })

    if (latestTransaction && !latestTransaction.checkOutTime) {
      return { error: "User Already Checked In!" }
    }

    const user = await prisma.$transaction(async (tx) => {
      const customer = await tx.customer.update({
        where: {
          customer_identifier: {
            phoneNumber: existingUser.phoneNumber,
            organizationId: organization.id
          }
        },
        data: {
          visitCount: existingUser.visitCount + 1
        }
      })

      await tx.transactions.create({
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
    return { data: user.id }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
