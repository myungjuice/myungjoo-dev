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
import { useLangStore } from '@/store/use-lang-store';

const ResumeCopyButton = () => {
  const lang = useLangStore(state => state.lang);
  const { t } = useTranslation('header');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timer = window.setTimeout(() => {
      setFeedback('');
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [feedback]);

  const handleCopy = async (format: ResumeFormat) => {
    try {
      await navigator.clipboard.writeText(createResumeText(lang, format));
      setFeedback(t(`resume-copy-${format}-success`));
    } catch {
      setFeedback(t('resume-copy-failure'));
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type='button'
            className='inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
          >
            <FiCopy aria-hidden='true' className='size-4' />
            {t('resume-copy')}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onSelect={() => void handleCopy('summary')}>
            {t('resume-copy-summary')}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => void handleCopy('detailed')}>
            {t('resume-copy-detailed')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span aria-live='polite' className='text-sm text-muted-foreground'>
        {feedback}
      </span>
    </div>
  );
};

export default ResumeCopyButton;
