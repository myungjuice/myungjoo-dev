'use client';

import { PDFViewer, pdf } from '@react-pdf/renderer';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { FiX } from 'react-icons/fi';
import { toast } from 'sonner';

import { createResumePdfData, createResumePdfFileName } from '@/lib/resume-pdf/data';
import { ResumePdfDocument } from '@/lib/resume-pdf/ResumePdfDocument';
import type { ResumePdfFormat, ResumePdfLanguage, ResumePdfTemplate } from '@/lib/resume-pdf/types';

type Props = {
  open: boolean;
  onClose: () => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
};
const defaults = {
  language: 'ko' as ResumePdfLanguage,
  format: 'summary' as ResumePdfFormat,
  template: 'A' as ResumePdfTemplate,
};

export default function ResumeDownloadModal({ open, onClose, triggerRef }: Props) {
  const { t } = useTranslation('header');
  const [selection, setSelection] = useState(defaults);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstControlRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) {
      setSelection(defaults);
      requestAnimationFrame(() => firstControlRef.current?.focus());
    }
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        requestAnimationFrame(() => triggerRef?.current?.focus());
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open, onClose]);
  if (!open) return null;
  const data = createResumePdfData(
    selection.language,
    selection.format,
    selection.template,
    typeof window !== 'undefined' ? window.location.href : undefined
  );
  const set = (key: keyof typeof selection, value: string) =>
    setSelection(s => ({ ...s, [key]: value }) as typeof s);
  return (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-2 sm:p-4 dark:bg-black/70'
      role='presentation'
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby='resume-download-title'
        className='flex h-[94vh] max-h-[98vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-slate-300 bg-white text-slate-900 max-md:h-[96vh] max-md:max-w-full dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
      >
        <header className='flex items-center justify-between border-b border-slate-300 px-5 py-4 dark:border-slate-700'>
          <h2 id='resume-download-title' className='text-lg font-semibold'>
            {t('resume-download')}
          </h2>
          <button
            type='button'
            aria-label={t('resume-download-close')}
            onClick={() => {
              onClose();
              requestAnimationFrame(() => triggerRef?.current?.focus());
            }}
            className='cursor-pointer rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-800'
          >
            <FiX />
          </button>
        </header>
        <div className='grid min-h-0 flex-1 grid-cols-[300px_1fr] max-md:grid-cols-1'>
          <aside className='space-y-5 overflow-y-auto border-r border-slate-300 p-5 max-md:border-r-0 max-md:border-b dark:border-slate-700'>
            {(
              [
                [
                  'language',
                  t('resume-download-language'),
                  [
                    ['ko', t('resume-download-korean')],
                    ['en', t('resume-download-english')],
                  ],
                ],
                [
                  'format',
                  t('resume-download-format'),
                  [
                    ['summary', t('resume-download-summary')],
                    ['detailed', t('resume-download-detailed')],
                  ],
                ],
                [
                  'template',
                  t('resume-download-template'),
                  [
                    ['A', t('resume-download-template-a')],
                    ['B', t('resume-download-template-b')],
                    ['C', t('resume-download-template-c')],
                  ],
                ],
              ] as const
            ).map(([key, label, options]) => (
              <fieldset key={key}>
                <legend className='mb-2 text-sm text-slate-500 dark:text-slate-400'>{label}</legend>
                <div className='flex flex-wrap gap-2'>
                  {options.map(([value, text]) => (
                    <button
                      key={value}
                      type='button'
                      ref={key === 'language' ? firstControlRef : undefined}
                      aria-pressed={selection[key as keyof typeof selection] === value}
                      onClick={() => set(key as keyof typeof selection, value)}
                      className={`cursor-pointer rounded border px-3 py-2 text-sm ${selection[key as keyof typeof selection] === value ? 'border-cyan-500 bg-cyan-500/20 text-cyan-700 dark:border-cyan-400 dark:text-cyan-200' : 'border-slate-300 hover:border-slate-500 dark:border-slate-600 dark:hover:border-slate-400'}`}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
            <div className='grid grid-cols-3 gap-2' aria-label={t('resume-download-template')}>
              {(['A', 'B', 'C'] as ResumePdfTemplate[]).map(templateId => (
                <button
                  key={templateId}
                  type='button'
                  onClick={() => set('template', templateId)}
                  aria-label={`${t('resume-download-template')} ${templateId}`}
                  className={`cursor-pointer rounded border p-2 ${selection.template === templateId ? 'border-cyan-500' : 'border-slate-300 dark:border-slate-700'}`}
                >
                  <div className='h-16 bg-white p-2 text-[5px] text-slate-800'>
                    {templateId === 'A' && (
                      <>
                        <div className='mb-1 h-2 w-2/3 bg-slate-800' />
                        <div className='mb-1 h-px bg-slate-400' />
                        <div className='h-1 w-full bg-slate-300' />
                        <div className='mt-1 h-1 w-4/5 bg-slate-300' />
                      </>
                    )}
                    {templateId === 'B' && (
                      <div className='grid h-full grid-cols-[35%_65%] gap-1'>
                        <div className='bg-slate-200 p-1'>
                          <div className='h-1 w-full bg-slate-700' />
                          <div className='mt-1 h-1 w-3/4 bg-slate-400' />
                        </div>
                        <div>
                          <div className='h-1 w-2/3 bg-slate-800' />
                          <div className='mt-2 h-px bg-slate-400' />
                          <div className='mt-1 h-1 w-full bg-slate-300' />
                          <div className='mt-1 h-1 w-4/5 bg-slate-300' />
                        </div>
                      </div>
                    )}
                    {templateId === 'C' && (
                      <>
                        <div className='mb-1 flex justify-between'>
                          <span className='h-2 w-1/3 bg-slate-800' />
                          <span className='h-1 w-1/4 bg-slate-400' />
                        </div>
                        <div className='border-l-2 border-slate-500 pl-1'>
                          <div className='h-1 w-full bg-slate-300' />
                          <div className='mt-1 h-1 w-3/4 bg-slate-300' />
                        </div>
                        <div className='mt-2 border-l-2 border-slate-500 pl-1'>
                          <div className='h-1 w-4/5 bg-slate-300' />
                        </div>
                      </>
                    )}
                  </div>
                  <span className='text-xs'>
                    {t(`resume-download-template-${templateId.toLowerCase()}`)}
                  </span>
                </button>
              ))}
            </div>
          </aside>
          <section className='resume-pdf-viewer min-h-[420px] border-0 bg-slate-100 p-3 dark:bg-slate-800 [&>iframe]:border-0'>
            <PDFViewer
              showToolbar={false}
              width='100%'
              height='100%'
              className='min-h-[520px] border-0 bg-white'
              style={{ border: '0', backgroundColor: '#ffffff' }}
            >
              <ResumePdfDocument data={data} />
            </PDFViewer>
          </section>
        </div>
        <footer className='flex justify-end border-t border-slate-300 p-4 dark:border-slate-700'>
          <button
            type='button'
            className='cursor-pointer rounded-md border border-slate-300 bg-transparent px-4 py-2 font-medium text-slate-900 transition-colors hover:bg-accent hover:text-accent-foreground dark:border-slate-600 dark:text-slate-100'
            onClick={async () => {
              try {
                const blob = await pdf(<ResumePdfDocument data={data} />).toBlob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = createResumePdfFileName(
                  selection.language,
                  selection.format,
                  selection.template
                );
                a.rel = 'noopener';
                document.body.appendChild(a);
                a.click();
                a.remove();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
              } catch {
                toast.error(t('resume-download-failure'));
              }
            }}
          >
            {t('resume-download-pdf')}
          </button>
        </footer>
      </div>
    </div>
  );
}
