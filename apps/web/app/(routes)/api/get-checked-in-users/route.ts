import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await auth()

    if (!session) {
      return new NextResponse("Authorized", { status: 401 })
    }

    const checkInUsers = await prisma.transactions.findMany({
      where: {
        checkOutTime: {
          equals: null
        }
      },
      include: {
        customer: true
      }
    })

    return NextResponse.json(checkInUsers, { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Server Error!", { status: 500 })
  }
}
