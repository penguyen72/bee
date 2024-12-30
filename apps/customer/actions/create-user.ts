"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { formatPhoneNumber } from "@/lib/utils"
import { SignUpSchema } from "@/schemas"
import { formatISO } from "date-fns"
import { revalidatePath } from "next/cache"
import { isDate, isMobilePhone } from "validator"
import { z } from "zod"
import { getOrganization } from "./get-organization"
import { ProjectError } from "@/lib/errors"

const validInputs = (values: z.infer<typeof SignUpSchema>) => {
  const { firstName, phoneNumber, birthday, consent } = values

  if (!firstName) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "First Name is Required!"
    })
  }

  if (!phoneNumber) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Phone Number is Required!"
    })
  }

  if (!isMobilePhone(formatPhoneNumber(phoneNumber), "en-US")) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Invalid Phone Number!"
    })
  }

  if (!birthday)
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Birthday is Required!"
    })

  if (
    birthday &&
    (birthday.length < 10 || !isDate(birthday, { format: "MM/DD/YYYY" }))
  ) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Invalid Date of Birth!"
    })
  }

  if (!consent) {
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Consent is Required!"
    })
  }

  return { firstName, phoneNumber, birthday, consent }
}

export const createUser = async (values: z.infer<typeof SignUpSchema>) => {
  const organization = await getOrganization()

  const { firstName, phoneNumber, birthday } = validInputs(values)

  const existingUser = await prisma.customer.findUnique({
    where: {
      customer_identifier: {
        phoneNumber: phoneNumber,
        organizationId: organization.id
      }
    }
  })

  if (existingUser)
    throw new ProjectError({
      name: "INTERNAL_SERVER_ERROR",
      message: "Phone Number already registered!"
    })

  const user = await prisma.$transaction(async (tx) => {
    const customer = await tx.customer.create({
      data: {
        firstName,
        phoneNumber,
        birthday: birthday ? formatISO(new Date(birthday)) : null,
        currentPoints: 0,
        lifetimePoints: 0,
        visitCount: 1,
        organizationId: organization.id
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
