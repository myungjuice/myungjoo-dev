'use client';

import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { FiCopy } from 'react-icons/fi';
import { toast } from 'sonner';

import ResumeCopyToast from '@/components/shared/resume-copy-toast';
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
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  const showCopyToast = (type: 'success' | 'error', message: string) => {
    toast.custom(id => <ResumeCopyToast key={id} message={message} theme={theme} type={type} />, {
      style: {
        left: '50%',
        width: 'fit-content',
        maxWidth: 'calc(100vw - 2rem)',
        transform: 'var(--y) translateX(-50%)',
      },
    });
  };

  const handleCopy = async (format: ResumeFormat) => {
    try {
      await navigator.clipboard.writeText(createResumeText(lang, format));
      showCopyToast('success', t(`resume-copy-${format}-success`));
    } catch {
      showCopyToast('error', t('resume-copy-failure'));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type='button'
          className='inline-flex cursor-pointer items-center gap-2 rounded-md border border-cyan-500 bg-cyan-500/20 px-3 py-2 text-sm font-medium text-cyan-700 transition-colors hover:bg-cyan-500/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none dark:border-cyan-400 dark:text-cyan-200'
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
