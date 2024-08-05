import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
