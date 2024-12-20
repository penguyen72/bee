import { z } from "zod"

export const SignUpSchema = z.object({
  firstName: z.string(),
  phoneNumber: z.string(),
  birthday: z.string(),
  consent: z.boolean().default(false)
})

export const SignInSchema = z.object({
  firstName: z.string(),
  phoneNumber: z.string()
})
