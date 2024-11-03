import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return new NextResponse("Authorized", { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")

    if (!userId) {
      return new NextResponse("User Id Missing", { status: 500 })
    }

    const customer = await prisma.customer.findUnique({
      where: {
        id: userId
      }
    })

    if (!customer) {
      return new NextResponse("Invalid User Id", { status: 500 })
    }

    return NextResponse.json(customer, { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Server Error!", { status: 500 })
  }
}
