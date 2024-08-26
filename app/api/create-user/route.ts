import prisma from '@/lib/prisma';
import { formatPhoneNumber } from '@/lib/utils';
import { formatISO } from 'date-fns';
import { NextResponse } from 'next/server';
import { isDate, isMobilePhone } from 'validator';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName, phoneNumber, birthday } = body;

    if (!firstName || !phoneNumber || !birthday) {
      return new NextResponse('All Fields Required!', { status: 400 });
    }

    if (!isMobilePhone(formatPhoneNumber(phoneNumber), 'en-US')) {
      return new NextResponse('Invalid Phone Number!', { status: 400 });
    }

    if (birthday.length < 10 || !isDate(birthday, { format: 'MM/DD/YYYY' })) {
      return new NextResponse('Invalid Date of Birth!', { status: 400 });
    }

    const existingUser = await prisma.customer.findUnique({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (existingUser) {
      return new NextResponse('Phone Number already registered!', {
        status: 400,
      });
    }

    const user = await prisma.customer.create({
      data: {
        firstName,
        phoneNumber,
        birthday: formatISO(new Date(birthday)),
        points: 0,
        visits: 1,
      },
    });

    return Response.json({ id: user.id }, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
