"use client"

import { createUser } from "@/actions/create-user"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formatDateOfBirth, formatPhoneNumber } from "@/lib/utils"
import { SignUpSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { FormError } from "./form-error"
import { Link } from "./link"

export function SignUpForm() {
  const [error, setError] = useState<string | undefined>()
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      phoneNumber: "",
      birthday: ""
    }
  })

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    createUser(values).then((data) => {
      if (data.success) {
        router.push(`/${data.userId}`)
      }
      setError(data.error)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <FormDescription className="mb-2 text-base text-black">
          Please enter your basic information.
        </FormDescription>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="text-base"
                  placeholder="First Name"
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="text-base"
                  placeholder="Phone Number"
                  type="text"
                  {...field}
                  value={formatPhoneNumber(field.value)}
                  onChange={(event) => {
                    event.target.value = event.target.value.slice(0, 12)
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
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="text-base"
                  placeholder="Date of Birth"
                  type="text"
                  {...field}
                  value={formatDateOfBirth(field.value)}
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

        <p className="text-xs text-center">
          By providing your phone number, you consent to receive marketing and
          promotional text messages (such as discounts, special offers, and
          updates) from Sun Nails & Spa at the phone number provided. Message
          and data rates may apply. You can opt out at any time by replying STOP
          to any message. Please see our{" "}
          <Link href="terms-of-service">Terms of Service</Link> and{" "}
          <Link href="terms-of-service">Privacy Policy</Link>.
        </p>

        <Button className="w-[100px] mt-2 mx-auto text-base" type="submit">
          Continue
        </Button>
      </form>
    </Form>
  )
}
