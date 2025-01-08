"use client"

import { checkOutUser } from "@/actions/check-out-user"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TransactionsWithCustomer } from "@/lib/types"
import { cn, convertToUSD } from "@/lib/utils"
import { Redemptions } from "@prisma/client"
import { Fragment, TransitionStartFunction, useState } from "react"
import { CheckOutSummaryItem } from "./check-out-summary-item"

interface Props {
  transaction: TransactionsWithCustomer
  redemptions: Redemptions[]
  addedCharges: number[]
  setAddedCharges: React.Dispatch<React.SetStateAction<number[]>>
  isPending: boolean
  startTransition: TransitionStartFunction
}

export function CheckOutSummary({
  transaction,
  redemptions,
  addedCharges,
  setAddedCharges,
  isPending,
  startTransition
}: Props) {
  const [selected, setSelected] = useState<Redemptions | null>(null)
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const disableCheckOut = addedCharges.length === 0

  function removeCharge(i: number) {
    setAddedCharges((prevValue) => {
      const newValue = prevValue.filter((_, index) => index !== i)
      return newValue
    })
  }

  function handleSelected(id: string) {
    setSelected(redemptions.find((item) => item.id === id) ?? null)
  }

  function handleCheckOut() {
    startTransition(async () => {
      checkOutUser(transaction.id, addedCharges, selected?.id).then((data) => {
        if (data.success) {
          setSelected(null)
          setAddedCharges([])
        }
        setSuccess(data.success)
        setError(data.error)
      })
    })
  }

  const balance =
    addedCharges.reduce((acc, charge) => acc + charge, 0) -
    (selected?.value ?? 0)

  return (
    <Fragment>
      <div className="flex flex-col gap-2">
        {addedCharges.map((charge, index) => {
          return (
            <CheckOutSummaryItem
              key={index}
              label="Added Charge"
              value={charge}
              handleDelete={() => removeCharge(index)}
            />
          )
        })}
        {selected ? (
          <CheckOutSummaryItem
            label={`${selected.pointsRequired} Point Redemption`}
            value={selected.value}
            handleDelete={() => setSelected(null)}
          />
        ) : null}
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <Separator />
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Redemption:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {redemptions.map((item) => {
                return (
                  <Button
                    key={item.id}
                    className={cn(
                      "rounded-2xl font-normal shadow-md",
                      selected?.id === item.id &&
                        "bg-purple-300 border-purple-300 hover:bg-purple-400 hover:border-purple-400 transition-all"
                    )}
                    disabled={
                      transaction.customer.currentPoints <
                        item.pointsRequired || isPending
                    }
                    variant="outline"
                    onClick={() => handleSelected(item.id)}
                  >
                    {item.pointsRequired} Points - ${item.value} Off
                  </Button>
                )
              })}
            </div>
            <p className="text-sm text-red-600 mb-6">Maximum $35 Off per day</p>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Separator />
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 justify-between">
              <p className="text-2xl font-semibold">Balance:</p>
              <p className="text-2xl font-semibold">{convertToUSD(balance)}</p>
            </div>
            <Button
              className="rounded-2xl text-xl bg-green-300 border-green-300 hover:bg-green-400 hover:border-green-400 transition-all"
              variant="outline"
              disabled={disableCheckOut || isPending}
              onClick={handleCheckOut}
            >
              Check out
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
