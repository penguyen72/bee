"use client"

import { checkInUser } from "@/actions/check-in-user"
import { createUser } from "@/actions/create-user"
import { PhoneInput } from "@/components/phone-input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn, formatDateOfBirth } from "@/lib/utils"
import { SignInSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleArrowLeft, CircleArrowRight, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { FormError } from "./form-error"

interface Props {
  organization: {
    id: string
    businessName: string
  }
}

export function CheckInForm({ organization }: Props) {
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      phoneNumber: "",
      firstName: "",
      birthday: ""
    }
  })

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    if (step === 1) {
      startTransition(async () => {
        const response = await checkInUser(values)
        if (response.error === "User Not Found!") {
          setStep(2)
          form.clearErrors()
          return
        }

        if (response.error) {
          form.setError("phoneNumber", { message: response.error })
          return
        }

        if (response.data) {
          router.push(`/${response.data}`)
        }
      })
    } else if (step === 2) {
      startTransition(async () => {
        const response = await createUser(values)

        if (response.error) {
          setError(response.error)
          return
        }

        if (response.data) {
          router.push(`/${response.data}`)
        }
      })
    }
  }

  function goBack() {
    setStep(1)
    form.resetField("firstName")
    form.resetField("birthday")
    setError("")
  }

  if (isPending) {
    return <Loader2 className="m-auto size-20 animate-spin" />
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-between h-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {step === 1 ? (
          <div className="flex flex-col gap-4 xl:gap-6">
            <div className="text-base xl:text-lg">
              <p>
                Enter your{" "}
                <span className="font-semibold underline">Phone Number</span>{" "}
                and Earn Points for your Next Visits!
              </p>
              <span className="font-medium italic">
                Earn 1 Point for each $1 Spent
              </span>
            </div>
            <PhoneInput
              value={form.watch("phoneNumber")}
              setValue={form.setValue}
              error={form.formState.errors.phoneNumber?.message}
            />
            <p className="my-2 text-sm xl:text-base">
              By providing your phone number, you consent to receive marketing
              and promotional text messages (such as discounts, special offers,
              and updates) from {organization.businessName} at the phone number
              provided. Message and data rates may apply. You can opt out at any
              time by replying STOP to any message. Please see our Terms of
              Service and Privacy Notice.
            </p>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="text-lg">
                    <p>
                      What&apos;s your{" "}
                      <span className="font-semibold underline">
                        First Name
                      </span>
                      ?
                    </p>
                    <p className="font-semibold italic">(Required)</p>
                  </div>
                  <FormControl>
                    <Input
                      className="w-[250px] mx-auto text-xl px-12 py-6 bg-amber-100 border-none text-black font-semibold placeholder:font-normal rounded-2xl text-center"
                      placeholder="Insert"
                      {...field}
                      onChange={(event) => {
                        event.target.value = event.target.value.replace(" ", "")
                        field.onChange(event)
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <div className="text-lg">
                    <p>
                      Do you want to sign up for{" "}
                      <span className="font-semibold underline">Birthday</span>{" "}
                      Promotions?
                    </p>
                    <p className="font-semibold italic">(Optional)</p>
                  </div>
                  <FormControl>
                    <Input
                      className="w-[250px] mx-auto text-xl px-12 py-6 bg-amber-100 border-none text-black font-semibold placeholder:font-normal rounded-2xl text-center"
                      placeholder="Insert"
                      type="text"
                      {...field}
                      value={formatDateOfBirth(field.value ?? "")}
                      onChange={(event) => {
                        event.target.value = event.target.value.slice(0, 10)
                        field.onChange(event)
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormError message={error} />
          </div>
        ) : null}
        <div className="flex justify-between">
          {step === 2 ? (
            <Button
              className="hover:bg-amber-100 rounded-full size-12"
              variant="ghost"
              size="icon"
              type="button"
              onClick={goBack}
            >
              <CircleArrowLeft className="size-10" />
            </Button>
          ) : null}
          <Button
            className={cn(
              "hover:bg-amber-100 rounded-full size-10 xl:size-12",
              step === 1 && "ml-auto"
            )}
            variant="ghost"
            size="icon"
          >
            <CircleArrowRight className="size-8 xl:size-10" />
          </Button>
        </div>
      </form>
    </Form>
  )
}
