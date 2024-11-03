import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { endOfDay, startOfDay } from "date-fns"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return new NextResponse("Authorized", { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const start = searchParams.get("start")
    const end = searchParams.get("end")

    if (!start || !end) {
      return new NextResponse("Start or End of Day Missing", { status: 500 })
    }

    const startDate = startOfDay(new Date(start))
    const endDate = endOfDay(new Date(end))

    const transactions = await prisma.transactions.findMany({
      where: {
        updatedAt: { gte: startDate, lte: endDate }
      }
    })

    const checkInUserCount = transactions.filter(
      (transaction) => !transaction.checkOutTime
    ).length

    const checkOutUserCount = transactions.filter(
      (transaction) => transaction.checkOutTime
    ).length

    const netRevenue = transactions.reduce(
      (acc, transaction) => acc + (transaction.profit ?? 0),
      0
    )

    const rewardsRedeemed = transactions.reduce(
      (acc, transaction) => acc + (transaction.expense ?? 0),
      0
    )

    const overview = {
      checkInUserCount,
      checkOutUserCount,
      netRevenue,
      rewardsRedeemed
    }

    return NextResponse.json(overview, { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Server Error!", { status: 500 })
  }
}
