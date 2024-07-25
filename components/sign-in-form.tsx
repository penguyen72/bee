'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { useRouter } from 'next/navigation';
import { useSessionStorage } from 'usehooks-ts';

const formSchema = z.object({
  firstName: z.string(),
  phoneNumber: z.string(),
  birthday: z.string(),
});

export function SignInForm() {
  const [user, setUser] = useSessionStorage<{
    firstName: string;
    visits: number;
  } | null>('user-info', null);

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      phoneNumber: '',
      birthday: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setUser({ firstName: values.firstName, visits: 1 });
    router.push('/check-in');
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
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-[100px] mt-2 mx-auto" type="submit">
          Continue
        </Button>
      </form>
    </Form>
  );
}
