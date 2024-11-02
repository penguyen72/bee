'use client';

import { FormMenuItem } from '@/components/form-menu-item';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AddPromotionSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Plus } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const promotionTypeOptions = [
  {
    label: 'Everything',
    value: 'everything',
  },
  {
    label: 'Nail Care',
    value: 'nailCare',
  },
  {
    label: 'Foot Care',
    value: 'footCare',
  },
];

const promotionUnitsOptions = [
  { label: '$', value: '$' },
  { label: '%', value: '%' },
];

function formatPromotionValue(unit: string, value: string) {
  if (unit !== '$' && unit !== '%') return '';
  if (unit === '$') return `${unit}${value}`;
  if (unit === '%') return `${value}${unit}`;
}

function generateMessage(
  values: z.infer<typeof AddPromotionSchema>
): string | null {
  const {
    name,
    unit,
    value,
    type,
    expiration,
    addBusinessPhoneNumber,
    welcomeWalkin,
    optOut,
  } = values;

  if (!name || !value) return null;

  const businessPhoneNumberMessage = addBusinessPhoneNumber
    ? ' Call us at 770-886-0072!'
    : '';
  const walkInMessage = welcomeWalkin ? ' Walk-Ins Welcome!' : '';
  const optOutMessage = optOut
    ? ' Reply STOP to opt out of future promotions.'
    : '';

  const promotionValue = formatPromotionValue(unit, value);
  const promotionType = promotionTypeOptions.find(
    (item) => item.value === type
  )?.label;
  const expirationDate = format(expiration, 'MM/dd/yyyy');

  const title = `Sun Nails & Spa: ${name} -`;

  return `${title} Get ${promotionValue} Off all ${promotionType}! Offer EXP: ${expirationDate}.${businessPhoneNumberMessage}${walkInMessage}${optOutMessage}`;
}

export function AddPromotionButton() {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const form = useForm<z.infer<typeof AddPromotionSchema>>({
    resolver: zodResolver(AddPromotionSchema),
    defaultValues: {
      name: '',
      unit: '$',
      value: '',
      type: 'everything',
      addBusinessPhoneNumber: true,
      welcomeWalkin: true,
      optOut: false,
      expiration: new Date(),
      message: '',
      messagePreview: '',
    },
  });

  async function onSubmit(values: z.infer<typeof AddPromotionSchema>) {
    console.log(values);
  }

  const name = form.watch('name');
  const unit = form.watch('unit');
  const value = form.watch('value');
  const type = form.watch('type');
  const expiration = form.watch('expiration');
  const addBusinessPhoneNumber = form.watch('addBusinessPhoneNumber');
  const welcomeWalkin = form.watch('welcomeWalkin');
  const optOut = form.watch('optOut');

  const values = form.getValues();

  useEffect(() => {
    const message = generateMessage(values);
    if (message) {
      form.setValue('message', message);
    } else {
      form.resetField('message');
    }
  }, [
    name,
    unit,
    value,
    type,
    expiration,
    addBusinessPhoneNumber,
    welcomeWalkin,
    optOut,
  ]);

  return (
    <Dialog open={open}>
      <Button
        className="absolute left-0"
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
      >
        <Plus className="size-4" />
      </Button>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {!preview ? 'Add New Promotion' : 'Confirm New Promotion Message'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              {!preview ? (
                <Fragment>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-md">
                          Promotion Name
                        </FormLabel>
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
                              options={promotionUnitsOptions}
                              value={value}
                              onChange={onChange}
                              isIcon
                            />
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-4 max-w-[200px]">
                            <FormControl>
                              <div className="relative">
                                {unit === '$' ? (
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-muted-foreground">
                                      $
                                    </span>
                                  </div>
                                ) : null}
                                <Input
                                  className={cn(
                                    '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                                    unit === '$' && 'pl-9'
                                  )}
                                  placeholder={unit === '$' ? '0.00' : '0'}
                                  type="number"
                                  {...field}
                                />
                                {unit === '%' ? (
                                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <span className="text-muted-foreground">
                                      %
                                    </span>
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
                              options={promotionTypeOptions}
                              value={value}
                              onChange={onChange}
                            />
                          );
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
                                    variant={'outline'}
                                    className={cn(
                                      'w-[240px] pl-3 text-left font-normal',
                                      !field.value && 'text-muted-foreground'
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, 'PPP')
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date('1900-01-01')
                                  }
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
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <p className="text-sm !m-0">
                          Add Business Phone Number to Message
                        </p>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="welcomeWalkin"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
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
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <p className="text-sm !m-0">Reply STOP to opt out</p>
                      </FormItem>
                    )}
                  />
                </Fragment>
              ) : null}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">
                      Message {preview && 'Preview'}
                    </FormLabel>
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
            </div>
            {!preview ? (
              <div className="flex gap-4 mt-6">
                <Button
                  className="w-24"
                  type="button"
                  variant="secondary"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="w-24"
                  type="button"
                  onClick={() => setPreview(true)}
                >
                  Preview
                </Button>
              </div>
            ) : (
              <div className="flex gap-4 mt-6">
                <Button
                  className="w-24"
                  type="button"
                  variant="secondary"
                  onClick={() => setPreview(false)}
                >
                  Go Back
                </Button>
                <Button className="w-24" type="submit">
                  Send
                </Button>
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
