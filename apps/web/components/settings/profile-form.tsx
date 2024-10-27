'use client';

import { updateOrganizationProfile } from '@/actions/update-organization-profile';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@bee/ui/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@bee/ui/components/ui/form';
import { Input } from '@bee/ui/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@bee/ui/components/ui/select';
import { TIMEZONES } from '@/lib/utils';
import { ProfileSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Organizations } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
  organizationInfo: Organizations;
}

export function ProfileForm({ organizationInfo }: Props) {
  const { id, ...defaultValues } = organizationInfo;
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues,
  });

  const disabled = true;

  function onSubmit(values: z.infer<typeof ProfileSchema>) {
    if (disabled) {
      updateOrganizationProfile(id, values).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between gap-12">
            <div className="flex flex-col gap-6 min-w-[450px]">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Business Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex gap-6 items-end min-w-[450px]">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md font-semibold">State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-md font-semibold">Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Zip Code" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Zone</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TIMEZONES.map((item, index) => {
                          return (
                            <SelectItem key={index} value={item.value}>
                              {item.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-6 w-[450px]">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="ml-auto mt-auto" type="submit" disabled={disabled}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
