'use client';

import { useTranslation } from 'react-i18next';
import { FiCopy } from 'react-icons/fi';
import { toast } from 'sonner';

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

  const handleCopy = async (format: ResumeFormat) => {
    try {
      await navigator.clipboard.writeText(createResumeText(lang, format));
      toast.success(t(`resume-copy-${format}-success`));
    } catch {
      toast.error(t('resume-copy-failure'));
    }
  };

  return (
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
  );
};

export default ResumeCopyButton;
