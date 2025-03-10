import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn, findNextPossibleRedemption } from "@/lib/utils"
import { Customer, Redemptions } from "@prisma/client"
import { format } from "date-fns"
import { Cake, Phone } from "lucide-react"
import { EditMemberButton } from "../features/transactions/edit-member-button"

interface Props {
  type?: "member" | "transaction"
  user: Customer
  redemptions: Redemptions[]
}

export async function UserSummaryCard({ user, type, redemptions }: Props) {
  const nextPossibleRedemption = findNextPossibleRedemption(
    user.currentPoints,
    redemptions
  )

  const percentageOfNextRedemption =
    nextPossibleRedemption !== null
      ? Math.min(
          Math.floor(
            (user.currentPoints / nextPossibleRedemption.pointsRequired) * 100
          ),
          100
        )
      : null

  return (
    <Card
      className={cn(
        "w-full border-l-[12px]",
        type === "member" && "border-l-amber-300",
        type === "transaction" && "border-l-blue-300"
      )}
    >
      <CardContent className="grid grid-cols-4 gap-12 p-3">
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2">
            <p className="font-semibold">{user.firstName}</p>
            {type === "member" ? <EditMemberButton user={user} /> : null}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="size-4" />
            <p>{user.phoneNumber}</p>
          </span>
          {user.birthday ? (
            <span className="flex items-center gap-1">
              <Cake className="size-4" />
              <p>{format(user.birthday, "MM/dd/yyyy")}</p>
            </span>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Points</p>
          <p className="text-2xl font-semibold">{user.currentPoints}</p>
          <Progress value={percentageOfNextRedemption} />
          {nextPossibleRedemption !== null ? (
            percentageOfNextRedemption === 100 ? (
              <p>Points Redeemable</p>
            ) : (
              <p>
                {nextPossibleRedemption.pointsRequired - user.currentPoints}{" "}
                Points before Redemption
              </p>
            )
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Last Visit</p>
          <p className="text-2xl font-semibold">
            {format(user.updatedAt, "MM/dd/yyyy")}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Total Visits</p>
          <p className="text-2xl font-semibold">{user.visitCount}</p>
        </div>
      </CardContent>
    </Card>
  )
}
