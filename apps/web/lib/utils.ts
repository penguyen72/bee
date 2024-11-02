import { clsx, type ClassValue } from 'clsx';
import { endOfDay, isAfter, startOfDay, subWeeks } from 'date-fns';
import {
  formatInTimeZone,
  fromZonedTime,
  getTimezoneOffset,
} from 'date-fns-tz';
import { twMerge } from 'tailwind-merge';
import { REDEPEMTIONS } from './constants';
import { Customer } from '@prisma/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(parsedValue: string) {
  if (!parsedValue) return parsedValue;

  const str = parsedValue.replace(/\D/g, '');

  if (str.length <= 0) {
    return '';
  } else if (str.length <= 3) {
    return `${str.slice(0, 3)}`;
  } else if (str.length <= 6) {
    return `${str.slice(0, 3)}-${str.slice(3, 6)}`;
  } else {
    return `${str.slice(0, 3)}-${str.slice(3, 6)}-${str.slice(6, 10)}`;
  }
}

export function formatDateOfBirth(parsedValue: string) {
  if (!parsedValue) return parsedValue;
  const value = parsedValue.replace(/\D/g, '');

  if (value.length <= 2) {
    return `${value}`;
  } else if (value.length <= 4) {
    return `${value.slice(0, 2)}/${value.slice(2, 4)}`;
  } else {
    return `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
  }
}

export function findNextPossibleRedemption(currentPoints: number) {
  let left = 0;
  let right = REDEPEMTIONS.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (currentPoints > REDEPEMTIONS[mid].pointsRequired) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return REDEPEMTIONS[left].pointsRequired;
}

export function convertToUSD(value: number | undefined | null) {
  if (value === undefined || value === null) return null;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(value);
}

function formatOffset(offset: number) {
  const sign = offset >= 0 ? '+' : '-';
  const absOffset = Math.abs(offset);
  const hours = String(Math.floor(absOffset / 60000)).padStart(2, '0');
  const minutes = String(absOffset % 60).padStart(2, '0');
  return `UTC${sign}${hours}:${minutes}`;
}

function getTimezones() {
  return Intl.supportedValuesOf('timeZone')
    .map((timezone: string) => {
      const offset = getTimezoneOffset(timezone);
      return {
        offset,
        timezone,
      };
    })
    .filter((item) => item.timezone.includes('America'))
    .sort((a, b) => a.offset - b.offset)
    .map((item) => {
      const offset = getTimezoneOffset(item.timezone);
      const formattedOffset = formatOffset(offset / 60);

      return {
        label: `(${formattedOffset}) ${item.timezone}`,
        value: item.timezone,
      };
    });
}

export const TIMEZONES = getTimezones();

export function getStartAndEndDate(today: Date, timezone: string) {
  const currentDateBasedOnTimeZone = formatInTimeZone(
    today,
    timezone,
    "yyyy-MM-dd'T'HH:mm:ss"
  );

  const startDate = fromZonedTime(
    startOfDay(currentDateBasedOnTimeZone),
    timezone
  );
  const endDate = fromZonedTime(endOfDay(currentDateBasedOnTimeZone), timezone);

  return { startDate, endDate };
}

export const Member = {
  VIP: 'Vip',
  REGULAR: 'Regular',
  RISK: 'At Risk',
  NEW: 'New',
} as const;

type ObjectType<T> = T[keyof T];

type MemberType = ObjectType<typeof Member>;

export function determineMemberType(user: Customer): MemberType {
  const today = new Date();
  if (user.visitCount === 1) {
    return 'New';
  } else if (isAfter(user.updatedAt, subWeeks(today, 2))) {
    return 'Vip';
  } else if (isAfter(user.updatedAt, subWeeks(today, 4))) {
    return 'Regular';
  } else {
    return 'At Risk';
  }
}

export const MEMBER_TYPE_COLOR: Record<MemberType, string> = {
  [Member.NEW]: 'text-blue-700',
  [Member.RISK]: 'text-red-700',
  [Member.REGULAR]: 'text-green-700',
  [Member.VIP]: 'text-yellow-700',
};
