'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { REDEPEMTIONS } from '@/lib/constants';
import { Redepemtion } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Fragment, useState } from 'react';
import { CheckOutSummaryItem } from './check-out-summary-item';

interface Props {
  addedCharges: number[];
  setAddedCharges: React.Dispatch<React.SetStateAction<number[]>>;
}

export function CheckOutSummary({ addedCharges, setAddedCharges }: Props) {
  const [selected, setSelected] = useState<Redepemtion | null>(null);

  function removeCharge(i: number) {
    setAddedCharges((prevValue) => {
      const newValue = prevValue.filter((_, index) => index === i);
      return newValue;
    });
  }

  function handleSelected(id: string) {
    setSelected(REDEPEMTIONS.find((item) => item.id === id) ?? null);
  }

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
          <Separator />
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 justify-between">
              <p className="text-2xl font-semibold">Balance:</p>
              <p className="text-2xl font-semibold">$50.00</p>
            </div>
            <Button
              className="rounded-2xl text-xl bg-green-300 border-green-300 hover:bg-green-400 hover:border-green-400 transition-all"
              variant="outline"
            >
              Check out
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
