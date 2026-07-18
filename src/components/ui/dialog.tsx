'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ComponentProps } from 'react';
import { FiX } from 'react-icons/fi';

import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

type DialogContentProps = DialogPrimitive.DialogContentProps & {
  closeLabel: string;
};

const DialogContent = ({ className, children, closeLabel, ...props }: DialogContentProps) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className='fixed inset-0 z-50 bg-slate-950/70 data-[state=closed]:animate-out data-[state=open]:animate-in' />
    <DialogPrimitive.Content
      className={cn(
        'fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-700 bg-slate-950 shadow-lg',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        aria-label={closeLabel}
        className='absolute top-4 right-4 inline-flex size-6 cursor-pointer items-center justify-center rounded-sm transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none dark:hover:bg-slate-800'
      >
        <FiX aria-hidden='true' className='size-6' />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

const DialogHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
