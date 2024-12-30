"use server"

import { ProjectError } from "@/lib/errors"
import { prisma } from "@/lib/prisma"
import { formatPhoneNumber } from "@/lib/utils"
import { SignInSchema } from "@/schemas"
import { revalidatePath } from "next/cache"
import { isMobilePhone } from "validator"
import { z } from "zod"
import { getOrganization } from "./get-organization"

const validInputs = (values: z.infer<typeof SignInSchema>) => {
  const { firstName, phoneNumber } = values

  if (!firstName || !phoneNumber)
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "All Fields Required!"
    })

  if (!isMobilePhone(formatPhoneNumber(phoneNumber), "en-US"))
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Invalid Phone Number!"
    })

  return { firstName, phoneNumber }
}

export const checkInUser = async (values: z.infer<typeof SignInSchema>) => {
  const organization = await getOrganization()

  const { firstName, phoneNumber } = validInputs(values)

  const existingUser = await prisma.customer.findUnique({
    where: {
      customer_identifier: {
        phoneNumber,
        organizationId: organization.id
      },
      firstName
    }
  })

  if (!existingUser)
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "User Not Found!"
    })

  const user = await prisma.$transaction(async (tx) => {
    const latestTransaction = await tx.transactions.findFirst({
      where: {
        customerId: existingUser.id,
        organizationId: organization.id
      },
      orderBy: {
        updatedAt: "desc"
      }
    })

    if (latestTransaction && !latestTransaction.checkOutTime) {
      throw new ProjectError({
        name: "INTERNAL_SERVER_ERROR",
        message: "User Already Checked In!"
      })
    }

    const customer = await tx.customer.update({
      where: {
        customer_identifier: {
          phoneNumber: existingUser.phoneNumber,
          organizationId: organization.id
        },
        firstName: existingUser.firstName
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
  return user.id
}
