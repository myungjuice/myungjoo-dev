import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

import { cn } from '@/lib/utils';

type ResumeCopyToastProps = {
  type: 'success' | 'error';
  message: string;
  theme: 'light' | 'dark';
};

const toastStyles = {
  success: {
    light: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    dark: 'border-emerald-900 bg-emerald-950 text-emerald-200',
  },
  error: {
    light: 'border-red-200 bg-red-50 text-red-800',
    dark: 'border-red-900 bg-red-950 text-red-200',
  },
} as const;

const ResumeCopyToast = ({ type, message, theme }: ResumeCopyToastProps) => {
  const Icon = type === 'success' ? FiCheckCircle : FiAlertCircle;

  return (
    <div
      aria-live='polite'
      className={cn(
        'relative left-1/2 inline-flex w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium shadow-sm transition-[opacity,transform] duration-200 ease-out',
        'scale-95 opacity-0 [[data-sonner-toast][data-mounted=true]_&]:scale-100 [[data-sonner-toast][data-mounted=true]_&]:opacity-100 [[data-sonner-toast][data-removed=true]_&]:scale-95 [[data-sonner-toast][data-removed=true]_&]:opacity-0',
        toastStyles[type][theme]
      )}
      role='status'
    >
      <Icon
        aria-hidden='true'
        className='size-4 shrink-0'
        data-testid={`resume-copy-toast-${type}`}
      />
      <span className='min-w-0 break-words'>{message}</span>
    </div>
  );
};

export default ResumeCopyToast;
