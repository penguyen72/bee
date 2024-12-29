import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { sendSMS } from "@/lib/twilio"
import { subYears } from "date-fns"

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session) {
      throw new Error("Unauthorized User!")
    }

    const customers = await prisma.customer.findMany({
      select: {
        phoneNumber: true,
        updatedAt: true
      },
      where: {
        updatedAt: {
          gte: subYears(new Date(), 2)
        }
      }
    })

    const customerNumbers = [
      ...new Set(
        customers.map((item) => "+1" + item.phoneNumber.replaceAll("-", ""))
      )
    ]

    const data = await request.formData()

    const message = data.get("message")

    if (typeof message !== "string") {
      throw new Error("Invalid Input!")
    }

    const response = await Promise.allSettled(
      customerNumbers.map((number) => sendSMS(number, message))
    )

    const deliveredMessages = response.filter(
      (item) => item.status === "fulfilled"
    ).length

    return Response.json({ success: "Success", deliveredMessages })
  } catch (error) {
    console.error(error)
    throw new Error("Internal Server Error!")
  }
}
