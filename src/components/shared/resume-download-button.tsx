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
        className='rounded border border-slate-500 px-3 py-2 text-sm hover:border-cyan-400'
      >
        이력서 다운로드
      </button>
      <ResumeDownloadModal open={open} onClose={() => setOpen(false)} triggerRef={triggerRef} />
    </>
  );
}
