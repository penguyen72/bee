"use server"

import { prisma } from "@/lib/prisma"
import { formatPhoneNumber } from "@/lib/utils"
import { SignInSchema } from "@/schemas"
import { formatISO } from "date-fns"
import { revalidatePath } from "next/cache"
import { isDate, isMobilePhone } from "validator"
import { z } from "zod"
import { getOrganization } from "./get-organization"

export const createUser = async (values: z.infer<typeof SignInSchema>) => {
  try {
    const { firstName, phoneNumber, birthday } = values

    if (!firstName) return { error: "First Name is Required!" }

    if (!phoneNumber) return { error: "Phone Number is Required!" }
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber)

    if (!isMobilePhone(formattedPhoneNumber, "en-US")) {
      return { error: "Invalid Phone Number!" }
    }

    if (
      birthday &&
      (birthday.length < 10 || !isDate(birthday, { format: "MM/DD/YYYY" }))
    ) {
      return { error: "Invalid Date of Birth!" }
    }

    const organizationResponse = await getOrganization()

    if (organizationResponse.error) return { error: organizationResponse.error }

    const organization = organizationResponse.data

    if (!organization) return { error: "Invalid Organization!" }

    const existingUser = await prisma.customer.findUnique({
      where: {
        customer_identifier: {
          phoneNumber: formattedPhoneNumber,
          organizationId: organization.id
        }
      }
    })

    if (existingUser) return { error: "Phone Number already registered!" }

    const user = await prisma.$transaction(async (tx) => {
      const customer = await tx.customer.create({
        data: {
          firstName,
          phoneNumber: formattedPhoneNumber,
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
    return { data: user.id }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
