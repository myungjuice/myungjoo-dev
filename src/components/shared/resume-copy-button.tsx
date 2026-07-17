'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiCopy } from 'react-icons/fi';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createResumeText, type ResumeFormat } from '@/lib/resume-copy';
import { cn } from '@/lib/utils';
import { useLangStore } from '@/store/use-lang-store';

type Toast = {
  message: string;
  variant: 'success' | 'error';
};

const ResumeCopyButton = () => {
  const lang = useLangStore(state => state.lang);
  const { t } = useTranslation('header');
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [toast]);

  const handleCopy = async (format: ResumeFormat) => {
    try {
      await navigator.clipboard.writeText(createResumeText(lang, format));
      setToast({
        message: t(`resume-copy-${format}-success`),
        variant: 'success',
      });
    } catch {
      setToast({ message: t('resume-copy-failure'), variant: 'error' });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type='button'
            className='inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
          >
            <FiCopy aria-hidden='true' className='size-4' />
            {t('resume-copy')}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem className='cursor-pointer' onSelect={() => void handleCopy('summary')}>
            {t('resume-copy-summary')}
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' onSelect={() => void handleCopy('detailed')}>
            {t('resume-copy-detailed')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {toast && (
        <div
          role='status'
          aria-live='polite'
          className={cn(
            'fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-md px-4 py-3 text-sm shadow-lg',
            toast.variant === 'success'
              ? 'bg-emerald-600 text-white'
              : 'text-destructive-foreground bg-destructive'
          )}
        >
          {toast.message}
        </div>
      )}
    </>
  );
};

export default ResumeCopyButton;
