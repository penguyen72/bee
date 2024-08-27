'use server';

import prisma from '@/lib/prisma';
import { getStartAndEndDate } from '@/lib/utils';

export const getCheckInUsers = async (emailAddress: string | undefined) => {
  try {
    if (!emailAddress) {
      return { error: 'Email Environment Variable Not Set!' };
    }

    const organization = await prisma.organizations.findUnique({
      where: {
        emailAddress,
      },
    });

    if (!organization || !organization.timezone) {
      return { error: 'Time Zone Not Set!' };
    }

    const today = new Date();
    const timezone = organization.timezone;
    const { startDate, endDate } = getStartAndEndDate(today, timezone);

    const transactions = await prisma.transactions.findMany({
      include: {
        customer: true,
      },
      where: {
        updatedAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    const checkInUsers = transactions.filter(
      (transaction) => !transaction.checkOutTime
    );

    const checkInUserCount = checkInUsers.length;

    const checkOutUserCount = transactions.filter(
      (transaction) => transaction.checkOutTime
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
        timezone,
      },
    };
  } catch (error) {
    console.error(error);
    return { error: 'Internal Server Error!' };
  }
};
