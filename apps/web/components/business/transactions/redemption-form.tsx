'use client';

import { Calculator } from '@/components/calculator';
import { Button } from '@bee/ui/components/ui/button';
import { TransactionsWithCustomer } from '@/lib/types';
import { useState } from 'react';
import { CheckOutSummary } from './check-out-summary';

interface Props {
  transaction: TransactionsWithCustomer;
}

export function RedemptionForm({ transaction }: Props) {
  const [value, setValue] = useState<string>('');
  const [addedCharges, setAddedCharges] = useState<number[]>([]);

  function addCharge() {
    setAddedCharges((prevValue) => {
      const newValue = [...prevValue];
      newValue.push(Number(value));
      return newValue;
    });
    setValue('');
  }

  return (
    <div className="grid grid-cols-12 w-full flex-grow gap-16 h-full">
      <div className="col-span-4 h-full">
        <div className="flex flex-col gap-6 h-full">
          <Button className="w-full rounded-2xl" onClick={addCharge}>
            <p>Insert &gt; &gt;</p>
          </Button>
          <Calculator value={value} setValue={setValue} />
        </div>
      </div>
      <div className="col-span-8 h-full flex flex-col justify-between">
        <CheckOutSummary transaction={transaction} addedCharges={addedCharges} setAddedCharges={setAddedCharges} />
      </div>
    </div>
  );
}
