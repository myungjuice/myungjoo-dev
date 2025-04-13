import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind 클래스명을 병합하고 중복 제거하는 유틸 함수
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(...inputs));
