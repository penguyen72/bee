"use client"

import { FormError } from "@/components/form-error"
import { FormMenuItem } from "@/components/form-menu-item"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  PROMOTION_TYPE_OPTIONS,
  PROMOTION_UNIT_OPTIONS
} from "@/features/promotions/lib/constants"
import { PromotionProgress } from "@/features/promotions/lib/types"
import { generateMessage } from "@/features/promotions/lib/utils"
import { cn } from "@/lib/utils"
import { AddPromotionSchema } from "@/schemas"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Dispatch, Fragment, SetStateAction, useEffect } from "react"
import { Controller, UseFormReturn } from "react-hook-form"
import { z } from "zod"

interface Props {
  form: UseFormReturn<z.infer<typeof AddPromotionSchema>, any, undefined>
  error: string | undefined
  setState: Dispatch<SetStateAction<PromotionProgress | null>>
}

export function PromotionInput({ form, error, setState }: Props) {
  const title = form.watch("title")
  const unit = form.watch("unit")
  const value = form.watch("value")
  const type = form.watch("type")
  const expiration = form.watch("expiration")
  const addBusinessPhoneNumber = form.watch("addBusinessPhoneNumber")
  const welcomeWalkin = form.watch("welcomeWalkin")
  const optOut = form.watch("optOut")
  const message = form.watch("message")

  const values = form.getValues()

  useEffect(() => {
    const generatedMessage = generateMessage(values)
    if (generatedMessage) {
      form.setValue("message", generatedMessage)
    } else {
      form.resetField("message")
    }
  }, [
    title,
    unit,
    value,
    type,
    expiration,
    addBusinessPhoneNumber,
    welcomeWalkin,
    optOut
  ])

  return (
    <Fragment>
      <DialogHeader>
        <DialogTitle>Add New Promotion</DialogTitle>
      </DialogHeader>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-md">Promotion Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Insert Promotion Name Here"
                type="text"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="flex flex-col gap-2">
        <Label className="text-md">Promotion</Label>
        <div className="flex flex-col gap-3">
          <Controller
            control={form.control}
            name="unit"
            render={({ field: { value, onChange } }) => {
              return (
                <FormMenuItem
                  options={PROMOTION_UNIT_OPTIONS}
                  value={value}
                  onChange={onChange}
                  isIcon
                />
              )
            }}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4 max-w-[200px]">
                <FormControl>
                  <div className="relative">
                    {unit === "$" ? (
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-muted-foreground">$</span>
                      </div>
                    ) : null}
                    <Input
                      className={cn(
                        "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                        unit === "$" && "pl-9"
                      )}
                      placeholder="0"
                      type="number"
                      {...field}
                    />
                    {unit === "%" ? (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-muted-foreground">%</span>
                      </div>
                    ) : null}
                  </div>
                </FormControl>
                <p className="!m-0">Off</p>
              </FormItem>
            )}
          />
          <Controller
            control={form.control}
            name="type"
            render={({ field: { value, onChange } }) => {
              return (
                <FormMenuItem
                  options={PROMOTION_TYPE_OPTIONS}
                  value={value}
                  onChange={onChange}
                />
              )
            }}
          />
          <FormField
            control={form.control}
            name="expiration"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover modal>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
      </div>
      <FormField
        control={form.control}
        name="addBusinessPhoneNumber"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <p className="text-sm !m-0">Add Business Phone Number to Message</p>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="welcomeWalkin"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <p className="text-sm !m-0">Walk-Ins Welcome</p>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="optOut"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <p className="text-sm !m-0">Reply STOP to opt out</p>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-md">Message</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Insert Message Here"
                className="resize-none"
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
          onClick={() => setState(null)}
        >
          Cancel
        </Button>
        <Button
          className="w-24"
          type="button"
          disabled={!message}
          onClick={() => setState("Preview")}
        >
          Preview
        </Button>
      </div>
    </Fragment>
  )
}
