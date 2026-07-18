'use client';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiDownload } from 'react-icons/fi';

import { Button } from '@/components/ui/button';

import ResumeDownloadModal from './resume-download-modal';

export default function ResumeDownloadButton() {
  const { t } = useTranslation('header');
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button
        ref={triggerRef}
        type='button'
        onClick={() => setOpen(true)}
        className='!border-cyan-500 !bg-cyan-500/20 text-cyan-700 hover:!bg-cyan-500/30 dark:!border-cyan-400 dark:text-cyan-200'
      >
        <FiDownload aria-hidden='true' className='size-4' />
        {t('resume-download')}
      </Button>
      <ResumeDownloadModal open={open} onClose={() => setOpen(false)} triggerRef={triggerRef} />
    </>
  );
}
