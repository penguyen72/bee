"use client"

import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { PromotionProgress } from "@/features/promotions/lib/types"
import { AddPromotionSchema } from "@/schemas"
import { Dispatch, Fragment, SetStateAction } from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

interface Props {
  form: UseFormReturn<z.infer<typeof AddPromotionSchema>, any, undefined>
  setState: Dispatch<SetStateAction<PromotionProgress | null>>
  isPending: boolean
}

export function PromotionConfirmation({ form, setState, isPending }: Props) {
  const deliveredMessages = form.watch("deliveredMessages")

  return (
    <Fragment>
      <DialogHeader>
        <DialogTitle>New Promotion Confirmed!</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Final Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Insert Message Here"
                  className="resize-none"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormSuccess
          message={`Message sent to ${deliveredMessages} Members!`}
        />
        <div className="flex gap-4 mt-2">
          <Button
            className="w-24"
            type="button"
            variant="secondary"
            disabled={isPending}
            onClick={() => {
              setState(null)
              form.reset()
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Fragment>
  )
}
