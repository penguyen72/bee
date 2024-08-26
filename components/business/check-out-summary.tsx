'use client';

import { checkOutUser } from '@/actions/check-out-user';
import { FormError } from '@/components/form-error';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { REDEPEMTIONS } from '@/lib/constants';
import { Redepemtion } from '@/lib/types';
import { cn, convertToUSD } from '@/lib/utils';

import { Customer, Status } from '@prisma/client';
import { Fragment, useState } from 'react';

import { CheckOutSummaryItem } from './check-out-summary-item';
import { FormSuccess } from '../form-success';

interface Props {
  user: Customer;
  addedCharges: number[];
  setAddedCharges: React.Dispatch<React.SetStateAction<number[]>>;
}

export function CheckOutSummary({
  user,
  addedCharges,
  setAddedCharges,
}: Props) {
  const [selected, setSelected] = useState<Redepemtion | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const disableCheckOut = addedCharges.length === 0;

  function removeCharge(i: number) {
    setAddedCharges((prevValue) => {
      const newValue = prevValue.filter((_, index) => index !== i);
      return newValue;
    });
  }

  function handleSelected(id: string) {
    setSelected(REDEPEMTIONS.find((item) => item.id === id) ?? null);
  }

  function handleCheckOut() {
    checkOutUser(user.id, addedCharges, selected)
      .then((data) => {
        if (data.success) {
          setSelected(null);
          setAddedCharges([]);
        }
        setSuccess(data.success);
        setError(data.error);
      })
      .finally(() => {});
  }

  const balance =
    addedCharges.reduce((acc, charge) => acc + charge, 0) -
    (selected?.value ?? 0);

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
          );
        })}
        {selected ? (
          <CheckOutSummaryItem
            label={selected.listLabel}
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
              {REDEPEMTIONS.map((redepemtion) => {
                return (
                  <Button
                    key={redepemtion.id}
                    className={cn(
                      'rounded-2xl font-normal shadow-md',
                      selected?.id === redepemtion.id &&
                        'bg-purple-300 border-purple-300 hover:bg-purple-400 hover:border-purple-400 transition-all'
                    )}
                    disabled={user.currentPoints < redepemtion.pointsRequired}
                    variant="outline"
                    onClick={() => handleSelected(redepemtion.id)}
                  >
                    {redepemtion.buttonLabel}
                  </Button>
                );
              })}
              <p className="text-sm text-red-600 mb-6">
                Maximum $20 Off per day
              </p>
            </div>
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
              disabled={disableCheckOut}
              onClick={handleCheckOut}
            >
              Check out
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
