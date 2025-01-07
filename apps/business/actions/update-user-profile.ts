"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { formatPhoneNumber } from "@/lib/utils"
import { EditMemberSchema } from "@/schemas"
import { formatISO } from "date-fns"
import { revalidatePath } from "next/cache"
import { isDate, isMobilePhone } from "validator"
import { z } from "zod"
import { getOrganization } from "./get-organization"

export const updateUserProfile = async (
  id: string,
  values: z.infer<typeof EditMemberSchema>
) => {
  try {
    const organizationResponse = await getOrganization()

    if (organizationResponse.error) return { error: organizationResponse.error }

    const organization = organizationResponse.data

    if (!organization) return { error: "Invalid Organization!" }

    const { firstName, phoneNumber, birthday, points } = values

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

    if (isNaN(Number(points))) {
      return { error: "Invalid Points" }
    }

    await prisma.customer.update({
      where: {
        id,
        organizationId: organization.id
      },
      data: {
        firstName,
        phoneNumber,
        birthday: birthday ? formatISO(new Date(birthday)) : null,
        currentPoints: Number(points)
      }
    })

    revalidatePath("/", "layout")
    return { success: "User Profile Updated" }
  } catch (error) {
    console.error(error)
    return { error: "Internal Server Error!" }
  }
}
