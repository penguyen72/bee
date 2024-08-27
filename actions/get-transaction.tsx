'use server';

import prisma from '@/lib/prisma';

export const getTransaction = async (transactionId: string) => {
  try {
    const transaction = await prisma.transactions.findUnique({
      include: {
        customer: true,
      },
      where: {
        id: transactionId,
      },
    });

    return { success: 'Success', transaction };
  } catch (error) {
    console.error(error);
    return { error: 'Internal Server Error!' };
  }
};
