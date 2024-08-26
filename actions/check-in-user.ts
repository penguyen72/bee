'use server';

import prisma from '@/lib/prisma';
import { formatPhoneNumber } from '@/lib/utils';
import { SignInSchema } from '@/schemas';
import { Status } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { isMobilePhone } from 'validator';
import { z } from 'zod';

export const checkInUser = async (values: z.infer<typeof SignInSchema>) => {
  try {
    const { firstName, phoneNumber } = values;
    if (!firstName || !phoneNumber) {
      return { error: 'All Fields Required!' };
    }

    if (!isMobilePhone(formatPhoneNumber(phoneNumber), 'en-US')) {
      return { error: 'Invalid Phone Number!' };
    }

    const existingUser = await prisma.customer.findUnique({
      where: {
        firstName,
        phoneNumber,
      },
    });

    if (!existingUser) {
      return { error: 'User Not Found!' };
    }

    const user = await prisma.customer.update({
      where: {
        firstName: existingUser.firstName,
        phoneNumber: existingUser.phoneNumber,
      },
      data: {
        visitCount: existingUser.visitCount + 1,
        status: Status.CHECK_IN,
      },
    });

    revalidatePath('/');
    return { success: 'User Checked In', userId: user.id };
  } catch (error) {
    console.error(error);
    return { error: 'Internal Server Error!' };
  }
};
