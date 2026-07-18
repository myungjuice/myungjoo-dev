'use client';
import { useRef, useState } from 'react';
import { FiDownload } from 'react-icons/fi';

import ResumeDownloadModal from './resume-download-modal';

export default function ResumeDownloadButton() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={triggerRef}
        type='button'
        onClick={() => setOpen(true)}
        className='inline-flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
      >
        <FiDownload aria-hidden='true' className='size-4' />
        이력서 다운로드
      </button>
      <ResumeDownloadModal open={open} onClose={() => setOpen(false)} triggerRef={triggerRef} />
    </>
  );
}
