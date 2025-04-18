'use client';

import { cn } from '@/lib/utils';

type CellType = 'empty' | 'snake' | 'food';

interface SnakeCellProps {
  type: CellType;
}

const SnakeCell = ({ type }: SnakeCellProps) => (
  <div
    className={cn(
      'flex h-full w-full flex-shrink-0',
      type === 'empty' && 'bg-transparent',
      type === 'snake' && 'bg-[#43D9AD]',
      type === 'food' && 'rounded-full bg-[#43D9AD]'
    )}
  />
);

export default SnakeCell;
