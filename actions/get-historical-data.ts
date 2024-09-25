'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export const getHistoricalData = async () => {
  try {
    const session = await auth();

    if (!session) {
      return { error: 'Authorized User' };
    }

    const [users, transactions] = await prisma.$transaction([
      prisma.customer.findMany(),
      prisma.transactions.findMany({
        include: {
          customer: true,
        },
        where: {
          checkOutTime: {
            not: null,
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      }),
    ]);

    const totalMembers = users.length;
    const netRevenue = transactions.reduce(
      (acc, transaction) => acc + (transaction.profit ?? 0),
      0
    );
    const rewardsRedeemed = transactions.reduce(
      (acc, transaction) => acc + (transaction.expense ?? 0),
      0
    );

    return {
      success: 'Success',
      overview: { totalMembers, netRevenue, rewardsRedeemed },
      transactions,
    };
  } catch (error) {
    console.error(error);
    return { error: 'Internal Server Error!' };
  }
};
