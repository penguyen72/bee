'use client';

import { createUser } from '@/actions/create-user';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatDateOfBirth, formatPhoneNumber } from '@/lib/utils';
import { SignUpSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormError } from '../form-error';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormError } from '../form-error';

export function SignUpForm() {
  const [error, setError] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: '',
      phoneNumber: '',
      birthday: '',
      birthday: '',
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    createUser(values).then((data) => {
      if (data.success) {
        router.push(`/customer/${data.userId}`);
      }
      setError(data.error);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        <FormMessage className="mb-2" />
        <FormDescription>Please enter your basic information.</FormDescription>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Controller
        <Controller
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Phone Number"
                  type="text"
                  {...field}
                  value={formatPhoneNumber(field.value)}
                  onChange={(event) => {
                    event.target.value = event.target.value.slice(0, 12);
                    field.onChange(event);
                  }}
                />
                <Input
                  placeholder="Phone Number"
                  type="text"
                  {...field}
                  value={formatPhoneNumber(field.value)}
                  onChange={(event) => {
                    event.target.value = event.target.value.slice(0, 12);
                    field.onChange(event);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Controller
        <Controller
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Date of Birth"
                  type="text"
                  {...field}
                  value={formatDateOfBirth(field.value)}
                  onChange={(event) => {
                    event.target.value = event.target.value.slice(0, 10);
                    field.onChange(event);
                  }}
                />
                <Input
                  placeholder="Date of Birth"
                  type="text"
                  {...field}
                  value={formatDateOfBirth(field.value)}
                  onChange={(event) => {
                    event.target.value = event.target.value.slice(0, 10);
                    field.onChange(event);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormError message={error} />
        <Button className="w-[100px] mt-2 mx-auto" type="submit">
          Continue
        </Button>
      </form>
    </Form>
  );
}
