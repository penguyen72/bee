'use server';

import prisma from '@/lib/prisma';
import { Redepemtion } from '@/lib/types';
import { Status } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const checkOutUser = async (
  userId: string,
  charges: number[],
  redepemtion: Redepemtion | null
) => {
  try {
    const pointsRedeemed = redepemtion?.pointsRequired;
    const expense = redepemtion?.value;

    const existingUser = await prisma.customer.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return { error: 'User Not Found!' };
    }

    if (existingUser.status !== Status.CHECK_IN) {
      return { error: 'User Not Checked In!' };
    }

    const totalCharge = charges.reduce((acc, charge) => {
      return acc + charge;
    }, 0);

    const pointsEarned = Math.floor(totalCharge);

    if (existingUser.currentPoints < (pointsRedeemed ?? 0)) {
      return { error: 'Insufficient Points!' };
    }

    await prisma.$transaction([
      prisma.customer.update({
        where: {
          id: existingUser.id,
        },
        data: {
          status: Status.CHECK_OUT,
          currentPoints:
            existingUser.currentPoints + pointsEarned - (pointsRedeemed ?? 0),
          lifetimePoints: existingUser.currentPoints + pointsEarned,
        },
      }),
      prisma.transactions.create({
        data: {
          expense,
          pointsEarned,
          pointsRedeemed,
          userId: existingUser.id,
          profit: totalCharge,
        },
      }),
    ]);

    revalidatePath('/overview');
    return { success: 'User Checked Out!' };
  } catch (error) {
    console.error(error);
    return { error: 'Internal Server Error!' };
  }
};
