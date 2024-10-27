'use client';

import { Button } from '@bee/ui/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@bee/ui/components/ui/form';
import { Input } from '@bee/ui/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});

export function ChangePasswordForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-12 justify-between">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="min-w-[450px]">
                <FormLabel className="text-md font-semibold">Old Password</FormLabel>
                <FormControl>
                  <Input placeholder="Type here..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-6 w-[450px]">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Type here..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Type here..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="ml-auto" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
