import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { SignUpSchema } from '@/schemas';
import { isDate, isMobilePhone } from 'validator';
import { formatPhoneNumber } from '@/lib/utils';
import { formatISO } from 'date-fns';

import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return new NextResponse('Invalid User', { status: 400 });
    }

    const user = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return new NextResponse('User Does Not Exist!', { status: 400 });
    }

    return Response.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
