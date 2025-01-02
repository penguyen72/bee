"use client"

import { checkInUser } from "@/actions/check-in-user"
import { FormError } from "@/components/form-error"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formatPhoneNumber } from "@/lib/utils"
import { SignInSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Fragment, useState, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

export function SignInForm() {
  const [isPending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | undefined>()
  const router = useRouter()

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      firstName: "",
      phoneNumber: ""
    }
  })

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    startTransition(async () => {
      try {
        const userId = await checkInUser(values)
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
        <FormMessage className="mb-2" />
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
