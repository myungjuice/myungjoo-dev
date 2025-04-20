import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';
import { FiCheck } from 'react-icons/fi';

import { cn } from '@/lib/utils';

const Checkbox = ({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) => (
  <CheckboxPrimitive.Root
    data-slot='checkbox'
    className={cn(
      'peer size-5 shrink-0 rounded-xs border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
      'data-[state=checked]:border-none data-[state=checked]:!bg-slate-400 dark:data-[state=checked]:!bg-slate-600',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot='checkbox-indicator'
      className='flex items-center justify-center text-current transition-none'
    >
      <FiCheck size={20} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

export default Checkbox;
