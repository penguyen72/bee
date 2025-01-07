"use client"

import { formatPhoneNumber } from "@/lib/utils"
import { SignInSchema } from "@/schemas"
import { Delete } from "lucide-react"
import { UseFormSetValue } from "react-hook-form"
import { z } from "zod"
import { FormError } from "./form-error"
import { Button } from "./ui/button"

const operations = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "", value: "" },
  { label: "0", value: "0" },
  { label: "x", value: "delete" }
]

interface Props {
  value: string
  setValue: UseFormSetValue<z.infer<typeof SignInSchema>>
  error: string | undefined
}

export function PhoneInput({ value, setValue, error }: Props) {
  function performOperation(operation: string) {
    if (!operation) return
    if (operation === "delete") {
      setValue("phoneNumber", value.slice(0, value.length - 1))
      return
    }
    if (value.length === 10) return
    setValue("phoneNumber", value + operation)
  }

  return (
    <div className="flex flex-col h-full gap-4 w-96 mx-auto">
      <p className="flex text-3xl h-16 bg-amber-100 border-none text-black font-semibold rounded-2xl text-center items-center justify-center">
        {formatPhoneNumber(value)}
      </p>
      <div className="grid grid-cols-3 gap-y-6 gap-x-4 h-fit">
        {operations.map((operation, index) => {
          const content =
            operation.value === "delete" ? (
              <Delete color="black" size={48} />
            ) : (
              operation.value
            )

          return (
            <Button
              key={index}
              className="text-3xl font-semibold hover:bg-amber-100 h-16 rounded-lg"
              variant="ghost"
              size="lg"
              type="button"
              onClick={() => performOperation(operation.value)}
            >
              {content}
            </Button>
          )
        })}
      </div>
      <FormError message={error} />
    </div>
  )
}
