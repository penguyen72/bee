'use server';

import prisma from '@/lib/prisma';

export const getUser = async (id: string) => {
  try {
    const user = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    return { success: 'Success', user };
  } catch {
    return { error: 'Internal Server Error!' };
  }
};
