import { AddPromotionSchema } from "@/schemas"
import { format } from "date-fns"
import { z } from "zod"
import { PROMOTION_TYPE_OPTIONS } from "./constants"

function formatPromotionValue(unit: string, value: string) {
  if (unit !== "$" && unit !== "%") return ""
  if (unit === "$") return `${unit}${value}`
  if (unit === "%") return `${value}${unit}`
}

export function generateMessage(
  values: z.infer<typeof AddPromotionSchema>
): string | null {
  const {
    title,
    unit,
    value,
    type,
    expiration,
    addBusinessPhoneNumber,
    welcomeWalkin,
    optOut
  } = values

  if (!title || !value) return null

  const businessPhoneNumberMessage = addBusinessPhoneNumber
    ? " Call us at 770-886-0072!"
    : ""
  const walkInMessage = welcomeWalkin ? " Walk-Ins Welcome!" : ""
  const optOutMessage = optOut
    ? " Reply STOP to opt out of future promotions."
    : ""

  const promotionValue = formatPromotionValue(unit, value)
  const promotionType = PROMOTION_TYPE_OPTIONS.find(
    (item) => item.value === type
  )?.label
  const expirationDate = format(expiration, "MM/dd/yyyy")

  const organization = "Sun Nails & Spa"

  return `${organization}: ${title} - Get ${promotionValue} Off${promotionType !== "Everything" ? " all " : " "}${promotionType}! Offer EXP: ${expirationDate}.${businessPhoneNumberMessage}${walkInMessage}${optOutMessage}`
}
