'use client';
import { useState } from 'react';

import ResumeDownloadModal from './resume-download-modal';

export default function ResumeDownloadButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='rounded border border-slate-500 px-3 py-2 text-sm hover:border-cyan-400'
      >
        이력서 다운로드
      </button>
      <ResumeDownloadModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
