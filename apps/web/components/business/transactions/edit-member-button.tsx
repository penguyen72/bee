"use client"

import { updateUserProfile } from "@/actions/update-user-profile"
import { FormError } from "@/components/form-error"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formatDateOfBirth, formatPhoneNumber } from "@/lib/utils"
import { EditMemberSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Customer } from "@prisma/client"
import { formatDate } from "date-fns"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

interface Props {
  user: Customer
}

export function EditMemberButton({ user }: Props) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const form = useForm<z.infer<typeof EditMemberSchema>>({
    resolver: zodResolver(EditMemberSchema),
    defaultValues: {
      firstName: user.firstName ?? "",
      phoneNumber: user.phoneNumber,
      birthday: user.birthday ? formatDate(user.birthday, "MM/dd/yyyy") : "",
      points: String(user.currentPoints)
    }
  })

  async function onSubmit(values: z.infer<typeof EditMemberSchema>) {
    updateUserProfile(user.id, values).then((data) => {
      if (data.success) {
        setOpen(false)
        setError(undefined)
      }
      setError(data.error)
    })
  }

  return (
    <Dialog open={open}>
      <Button
        className="size-6"
        size="icon"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        <Pencil className="size-4" />
      </Button>
      <DialogContent className="bg-amber-300 border-amber-300 px-16 py-12 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Edit Member Profile
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-3 gap-2 px-24"
          >
            <p className="text-base font-semibold">Name</p>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="col-span-2 w-full">
                  <FormControl>
                    <Input placeholder="First Name" type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <p className="text-base font-semibold">Phone Number</p>
            <Controller
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="col-span-2 w-full">
                  <FormControl>
                    <Input
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
            <p className="text-base font-semibold">Date of Birth</p>
            <Controller
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="col-span-2 w-full">
                  <FormControl>
                    <Input
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
            <p className="text-base font-semibold">Points</p>
            <Controller
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem className="col-span-2 w-full">
                  <FormControl>
                    <Input placeholder="Points" type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormError className="col-span-3" message={error} />
            <div className="flex col-span-3 gap-4 mt-4 mx-auto">
              <Button
                className="w-[100px]"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-white text-black hover:bg-slate-50 w-[100px]"
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
