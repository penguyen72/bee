"use client"

import { createPromotion } from "@/actions/create-promotion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { PromotionConfirmation } from "@/features/promotions/components/promotion-confirmation"
import { PromotionInput } from "@/features/promotions/components/promotion-input"
import { PromotionPreview } from "@/features/promotions/components/promotion-preview"
import { PromotionProgress } from "@/features/promotions/lib/types"
import { AddPromotionSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export function AddPromotionButton() {
  const [isPending, startTransition] = useTransition()
  const [state, setState] = useState<PromotionProgress | null>(null)
  const [error, setError] = useState<string | undefined>()
  const form = useForm<z.infer<typeof AddPromotionSchema>>({
    resolver: zodResolver(AddPromotionSchema),
    defaultValues: {
      title: "",
      unit: "$",
      value: "",
      type: "everything",
      addBusinessPhoneNumber: true,
      welcomeWalkin: true,
      optOut: true,
      expiration: new Date(),
      message: ""
    }
  })

  async function onSubmit(values: z.infer<typeof AddPromotionSchema>) {
    startTransition(async () => {
      const response = await createPromotion(values)
      if (response.data !== undefined) {
        form.setValue("deliveredMessages", response.data)
        setState("Confirmed")
      }
      setError(response.error)
    })
  }

  return (
    <Dialog open={state !== null}>
      <Button
        className="absolute left-0"
        variant="outline"
        size="icon"
        type="button"
        onClick={() => setState("In Progress")}
      >
        <Plus className="size-4" />
      </Button>
      <DialogContent className="max-w-4xl">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {state === "In Progress" ? (
              <PromotionInput
                form={form}
                error={error}
                setState={setState}
                isPending={isPending}
              />
            ) : null}
            {state === "Preview" ? (
              <PromotionPreview
                form={form}
                error={error}
                setState={setState}
                isPending={isPending}
              />
            ) : null}
            {state === "Confirmed" ? (
              <PromotionConfirmation
                form={form}
                setState={setState}
                isPending={isPending}
              />
            ) : null}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
