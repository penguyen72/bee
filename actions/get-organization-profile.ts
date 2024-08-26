'use server';

import prisma from '@/lib/prisma';

export const getOrganizationProfile = async (
  emailAddress: string | undefined
) => {
  try {
    if (!emailAddress) {
      return { error: 'Email Environment Variable Not Set!' };
    }
    const organization = await prisma.organizations.findUnique({
      where: { emailAddress },
    });

    return { success: 'Success!', organization };
  } catch (error) {
    console.error(error);
    return { error: 'Internal Server Error!' };
  }
};
