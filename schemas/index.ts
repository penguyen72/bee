import { z } from 'zod';

export const SignUpSchema = z.object({
  firstName: z.string(),
  phoneNumber: z.string(),
  birthday: z.string(),
});

export const SignInSchema = z.object({
  firstName: z.string(),
  phoneNumber: z.string(),
});

export const ProfileSchema = z.object({
  businessName: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  timezone: z.string().optional(),
  phoneNumber: z.string().optional(),
  emailAddress: z.string(),
});
