"use client"

import { createUser } from "@/actions/create-user"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formatDateOfBirth, formatPhoneNumber } from "@/lib/utils"
import { SignUpSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Fragment, useState, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { FormError } from "./form-error"
import { Link } from "./link"

export function SignUpForm() {
  const [isPending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | undefined>()
  const router = useRouter()

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      phoneNumber: "",
      birthday: "",
      consent: false
    }
  })

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    startTransition(async () => {
      try {
        const userId = await createUser(values)
        router.push(`/${userId}`)
      } catch (error) {
        if (error instanceof Error) {
          setFormError(error.message)
        } else {
          setFormError("Unknown Error Occurred!")
        }
      }
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
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
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
        <FormField
          control={form.control}
          name="consent"
          disabled={isPending}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  disabled={isPending}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>
                By providing your phone number, you consent to receive marketing
                and promotional text messages (such as discounts, special
                offers, and updates) from Sun Nails & Spa at the phone number
                provided. Message and data rates may apply. You can opt out at
                any time by replying STOP to any message. Please see our{" "}
                <Link href="terms-of-service">Terms of Service</Link> and{" "}
                <Link href="terms-of-service">Privacy Policy</Link>.
              </FormLabel>
            </FormItem>
          )}
        />
        <FormError message={formError} />
        <Button
          className="flex gap-2 mx-auto mt-2"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <Fragment>
              <Loader2 className="animate-spin" />
              Loading...
            </Fragment>
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </Form>
  )
}
