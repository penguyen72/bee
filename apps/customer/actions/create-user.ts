"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { formatPhoneNumber } from "@/lib/utils"
import { SignUpSchema } from "@/schemas"
import { formatISO } from "date-fns"
import { revalidatePath } from "next/cache"
import { isDate, isMobilePhone } from "validator"
import { z } from "zod"

export const createUser = async (values: z.infer<typeof SignUpSchema>) => {
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

    const { firstName, phoneNumber, birthday, consent } = values

    if (!consent) {
      return { error: "Consent is Required!" }
    }

    if (!firstName) {
      return { error: "First Name is Required!" }
    }

    if (!phoneNumber) {
      return { error: "Phone Number is Required!" }
    }

    if (!isMobilePhone(formatPhoneNumber(phoneNumber), "en-US")) {
      return { error: "Invalid Phone Number!" }
    }

    if (
      birthday &&
      (birthday.length < 10 || !isDate(birthday, { format: "MM/DD/YYYY" }))
    ) {
      return { error: "Invalid Date of Birth!" }
    }

    const existingUser = await prisma.customer.findUnique({
      where: {
        phoneNumber: phoneNumber
      }
    })

    if (existingUser) {
      return { error: "Phone Number already registered!" }
    }

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
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
