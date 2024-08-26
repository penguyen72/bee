'use server';

import prisma from '@/lib/prisma';
import { ProfileSchema } from '@/schemas';
import { z } from 'zod';

export const updateOrganizationProfile = async (
  id: string,
  values: z.infer<typeof ProfileSchema>
) => {
  try {
    await prisma.organizations.update({
      where: { id },
      data: values,
    });

    return { success: 'Profile Updated!' };
  } catch (error) {
    console.error(error);
    return { error: 'Internal Server Error!' };
  }
};
