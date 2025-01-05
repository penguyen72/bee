"use client"

import { FormError } from "@/components/form-error"
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
import { Loader2 } from "lucide-react"
import { Dispatch, Fragment, SetStateAction } from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

interface Props {
  form: UseFormReturn<z.infer<typeof AddPromotionSchema>, any, undefined>
  error: string | undefined
  setState: Dispatch<SetStateAction<PromotionProgress | null>>
  isPending: boolean
}

export function PromotionPreview({ form, error, setState, isPending }: Props) {
  return (
    <Fragment>
      <DialogHeader>
        <DialogTitle>Confirm New Promotion Message</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Message Preview</FormLabel>
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
        <FormError message={error} />
        <div className="flex gap-4 mt-2">
          <Button
            className="w-24"
            type="button"
            variant="secondary"
            disabled={isPending}
            onClick={() => setState("In Progress")}
          >
            Go Back
          </Button>
          <Button className="w-24" type="submit" disabled={isPending}>
            {isPending ? (
              <Fragment>
                <Loader2 className="animate-spin" />
                Loading...
              </Fragment>
            ) : (
              "Send"
            )}
          </Button>
        </div>
      </div>
    </Fragment>
  )
}
