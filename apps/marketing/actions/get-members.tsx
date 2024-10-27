'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export const getMembers = async () => {
  try {
    const session = await auth();

    if (!session) {
      return { error: 'Authorized User' };
    }

    const users = await prisma.customer.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return {
      success: 'Success',
      users,
    };
  } catch (error) {
    console.error(error);
    return { error: 'Internal Server Error!' };
  }
};
