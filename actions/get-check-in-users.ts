'use server';

import prisma from '@/lib/prisma';
import { Status } from '@prisma/client';
import { endOfDay, startOfDay } from 'date-fns';

export const getCheckInUsers = async () => {
  const today = new Date();
  const startDate = startOfDay(today);
  const endDate = endOfDay(today);
  try {
    const [users, transactions] = await prisma.$transaction([
      prisma.customer.findMany({
        where: {
          updatedAt: {
            gte: startDate,
            lt: endDate,
          },
        },
      }),
      prisma.transactions.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
      }),
    ]);

    const checkInUsers = users.filter(
      (user) => user.status === Status.CHECK_IN
    );

    const checkInUserCount = users.filter(
      (user) => user.status === Status.CHECK_IN
    ).length;

    const checkOutUserCount = users.filter(
      (user) => user.status === Status.CHECK_OUT
    ).length;

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
      checkInUsers,
      overview: {
        checkInUserCount,
        checkOutUserCount,
        netRevenue,
        rewardsRedeemed,
      },
    };
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error!' };
  }
};
