'use client';
import { useRef, useState } from 'react';

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
        className='inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
      >
        이력서 다운로드
      </button>
      <ResumeDownloadModal open={open} onClose={() => setOpen(false)} triggerRef={triggerRef} />
    </>
  );
}
