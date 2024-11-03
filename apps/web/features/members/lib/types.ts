import { ObjectType } from "@/lib/utils"
import { Member } from "./constants"

export type MemberType = ObjectType<typeof Member>

export type Redepemtion = {
  id: string
  listLabel: string
  buttonLabel: string
  pointsRequired: number
  value: number
}
