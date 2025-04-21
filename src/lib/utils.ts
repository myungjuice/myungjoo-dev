import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const getMappedKey = <T extends string>(
  map: Record<T, string>,
  text: string
): T | undefined => Object.entries(map).find(([, value]) => value === text)?.[0] as T;
