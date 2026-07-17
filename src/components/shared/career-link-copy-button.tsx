'use client';

import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { FiLink } from 'react-icons/fi';
import { toast } from 'sonner';

import ResumeCopyToast from '@/components/shared/resume-copy-toast';
import { createCareerLink } from '@/lib/career-link';
import type { CareerFilterItem } from '@/types/career';

type CareerLinkCopyButtonProps = {
  slug: CareerFilterItem;
  projectId?: number;
  label: string;
  successMessage: string;
};

const CareerLinkCopyButton = ({
  slug,
  projectId,
  label,
  successMessage,
}: CareerLinkCopyButtonProps) => {
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

  const handleCopy = async () => {
    try {
      const link = createCareerLink({
        slug,
        projectId,
        origin: window.location.origin,
        environment: process.env.NODE_ENV,
      });
      await navigator.clipboard.writeText(link);
      showCopyToast('success', successMessage);
    } catch {
      showCopyToast('error', t('resume-copy-failure'));
    }
  };

  return (
    <button
      type='button'
      aria-label={label}
      title={label}
      className='inline-flex shrink-0 cursor-pointer items-center rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
      onClick={() => void handleCopy()}
    >
      <FiLink aria-hidden='true' className='size-4' />
    </button>
  );
};

export default CareerLinkCopyButton;
