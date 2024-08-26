'use server';

import prisma from '@/lib/prisma';
import { formatPhoneNumber } from '@/lib/utils';
import { SignUpSchema } from '@/schemas';
import { Status } from '@prisma/client';
import { formatISO } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { isDate, isMobilePhone } from 'validator';
import { z } from 'zod';

export const createUser = async (values: z.infer<typeof SignUpSchema>) => {
  try {
    const { firstName, phoneNumber, birthday } = values;

    if (!firstName || !phoneNumber || !birthday) {
      return { error: 'All Fields Required!' };
    }

    if (!isMobilePhone(formatPhoneNumber(phoneNumber), 'en-US')) {
      return { error: 'Invalid Phone Number!' };
    }

    if (birthday.length < 10 || !isDate(birthday, { format: 'MM/DD/YYYY' })) {
      return { error: 'Invalid Date of Birth!' };
    }

    const existingUser = await prisma.customer.findUnique({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (existingUser) {
      return { error: 'Phone Number already registered!' };
    }

    const user = await prisma.customer.create({
      data: {
        firstName,
        phoneNumber,
        birthday: formatISO(new Date(birthday)),
        currentPoints: 0,
        lifetimePoints: 0,
        visitCount: 1,
        status: Status.CHECK_IN,
      },
    });

    revalidatePath('/', 'layout');
    return { success: 'User Checked In', userId: user.id };
  } catch (error) {
    console.error(error);
    return { error: 'Internal Server Error!' };
  }
};
