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
import { FormError } from "../../components/form-error"

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
        router.push(`/customer/${data.userId}`)
      }
      setError(data.error)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        <FormDescription className="text-black text-base mb-2">
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
        <Button className="w-[100px] mt-2 mx-auto text-base" type="submit">
          Continue
        </Button>
      </form>
    </Form>
  )
}
