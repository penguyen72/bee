import { clsx, type ClassValue } from "clsx"
import { endOfDay, startOfDay } from "date-fns"
import { formatInTimeZone, fromZonedTime, getTimezoneOffset } from "date-fns-tz"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(parsedValue: string) {
  if (!parsedValue) return parsedValue

  const str = parsedValue.replace(/\D/g, "")

  if (str.length <= 0) {
    return ""
  } else if (str.length <= 3) {
    return `${str.slice(0, 3)}`
  } else if (str.length <= 6) {
    return `${str.slice(0, 3)}-${str.slice(3, 6)}`
  } else {
    return `${str.slice(0, 3)}-${str.slice(3, 6)}-${str.slice(6, 10)}`
  }
}

export function formatDateOfBirth(parsedValue: string) {
  if (!parsedValue) return parsedValue
  const value = parsedValue.replace(/\D/g, "")

  if (value.length <= 2) {
    return `${value}`
  } else if (value.length <= 4) {
    return `${value.slice(0, 2)}/${value.slice(2, 4)}`
  } else {
    return `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`
  }
}

export function convertToUSD(value: number | undefined | null) {
  if (value === undefined || value === null) return null

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  })

  return formatter.format(value)
}

function formatOffset(offset: number) {
  const sign = offset >= 0 ? "+" : "-"
  const absOffset = Math.abs(offset)
  const hours = String(Math.floor(absOffset / 60000)).padStart(2, "0")
  const minutes = String(absOffset % 60).padStart(2, "0")
  return `UTC${sign}${hours}:${minutes}`
}

function getTimezones() {
  return Intl.supportedValuesOf("timeZone")
    .map((timezone: string) => {
      const offset = getTimezoneOffset(timezone)
      return {
        offset,
        timezone
      }
    })
    .filter((item) => item.timezone.includes("America"))
    .sort((a, b) => a.offset - b.offset)
    .map((item) => {
      const offset = getTimezoneOffset(item.timezone)
      const formattedOffset = formatOffset(offset / 60)

      return {
        label: `(${formattedOffset}) ${item.timezone}`,
        value: item.timezone
      }
    })
}

export const TIMEZONES = getTimezones()

export function getStartAndEndDate(today: Date, timezone: string) {
  const currentDateBasedOnTimeZone = formatInTimeZone(
    today,
    timezone,
    "yyyy-MM-dd'T'HH:mm:ss"
  )

  const startDate = fromZonedTime(
    startOfDay(currentDateBasedOnTimeZone),
    timezone
  )
  const endDate = fromZonedTime(endOfDay(currentDateBasedOnTimeZone), timezone)

  return { startDate, endDate }
}

export type ObjectType<T> = T[keyof T]
