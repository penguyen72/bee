import { z } from "zod"

export const SignUpSchema = z.object({
  firstName: z.string(),
  birthday: z.string().optional()
})

export const SignInSchema = z.object({
  phoneNumber: z.string(),
  firstName: z.string().optional(),
  birthday: z.string().optional()
})
