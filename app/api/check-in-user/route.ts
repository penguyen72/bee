import prisma from '@/lib/prisma';
import { formatPhoneNumber } from '@/lib/utils';
import { NextResponse } from 'next/server';
import { isMobilePhone } from 'validator';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName, phoneNumber } = body;

    if (!firstName || !phoneNumber) {
      return new NextResponse('All Fields Required!', { status: 400 });
    }

    if (!isMobilePhone(formatPhoneNumber(phoneNumber), 'en-US')) {
      return new NextResponse('Invalid Phone Number!', { status: 400 });
    }

    const existingUser = await prisma.customer.findUnique({
      where: {
        firstName,
        phoneNumber,
      },
    });

    if (!existingUser) {
      return new NextResponse('User not found!', {
        status: 400,
      });
    }

    const user = await prisma.customer.update({
      where: {
        firstName: existingUser.firstName,
        phoneNumber: existingUser.phoneNumber,
      },
      data: {
        visits: existingUser.visits + 1,
      },
    });

    return Response.json({ id: user.id }, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
