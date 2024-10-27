'use server';

import { auth } from '@/auth';
import { AddPromotionSchema } from '@/schemas';
import { z } from 'zod';

export const sendMessage = async (
  values: z.infer<typeof AddPromotionSchema>
) => {
  try {
    const session = await auth();

    if (!session) {
      return { error: 'Authorized User' };
    }

    return { success: 'Success' };
  } catch (error) {
    console.error(error);
    return { error: 'Internal Server Error!' };
  }
};
