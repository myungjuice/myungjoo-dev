'use client';

import { PDFViewer, pdf } from '@react-pdf/renderer';
import { useTheme } from 'next-themes';
import { memo, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { FiCopy, FiDownload, FiLoader } from 'react-icons/fi';
import { toast } from 'sonner';

import ResumeCopyToast from '@/components/shared/resume-copy-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { createResumeText } from '@/lib/resume-copy';
import { createResumePdfData, createResumePdfFileName } from '@/lib/resume-pdf/data';
import { ResumePdfDocument } from '@/lib/resume-pdf/ResumePdfDocument';
import type { ResumePdfFormat, ResumePdfLanguage } from '@/lib/resume-pdf/types';
import { cn } from '@/lib/utils';

type Props = {
  open: boolean;
  onClose: () => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
};

const ResumePdfPreview = memo(function ResumePdfPreview({
  data,
}: {
  data: ReturnType<typeof createResumePdfData>;
}) {
  return (
    <PDFViewer
      showToolbar={false}
      width='100%'
      height='100%'
      className='min-h-[520px] border-0 bg-white'
    >
      <ResumePdfDocument data={data} />
    </PDFViewer>
  );
});

const defaults = {
  language: 'ko' as ResumePdfLanguage,
  format: 'summary' as ResumePdfFormat,
};
const PREVIEW_READY_DELAY_MS = 1000;
const PREVIEW_FALLBACK_DELAY_MS = 1500;

const resolveResumeLanguage = (language?: string): ResumePdfLanguage =>
  language?.toLowerCase().startsWith('en') ? 'en' : 'ko';

export default function ResumeDownloadModal({ open, onClose, triggerRef }: Props) {
  const { t, i18n } = useTranslation('header');
  const { resolvedTheme } = useTheme();
  const toastTheme = resolvedTheme === 'dark' ? 'dark' : 'light';
  const [selection, setSelection] = useState(() => ({
    ...defaults,
    language: resolveResumeLanguage(i18n.language),
  }));
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const viewerRef = useRef<HTMLElement>(null);
  const firstControlRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) {
      setSelection({
        ...defaults,
        language: resolveResumeLanguage(i18n.language),
      });
      setIsPreviewLoading(true);
      requestAnimationFrame(() => firstControlRef.current?.focus());
    }
  }, [i18n.language, open]);
  useEffect(() => {
    if (!isPreviewLoading) return;
    let iframe: HTMLIFrameElement | null = null;
    let finishId: number | undefined;
    const handleLoad = () => {
      finishId = window.setTimeout(() => setIsPreviewLoading(false), PREVIEW_READY_DELAY_MS);
    };
    const attach = () => {
      const nextIframe = viewerRef.current?.querySelector('iframe') ?? null;
      if (nextIframe === iframe) return;
      iframe?.removeEventListener('load', handleLoad);
      iframe = nextIframe;
      if (iframe) {
        iframe.addEventListener('load', handleLoad, { once: true });
        if (iframe.contentDocument?.readyState === 'complete') handleLoad();
      }
    };
    attach();
    const observer = new MutationObserver(attach);
    if (viewerRef.current) observer.observe(viewerRef.current, { childList: true, subtree: true });
    const fallbackId = window.setTimeout(handleLoad, PREVIEW_FALLBACK_DELAY_MS);
    return () => {
      observer.disconnect();
      iframe?.removeEventListener('load', handleLoad);
      if (finishId) window.clearTimeout(finishId);
      window.clearTimeout(fallbackId);
    };
  }, [isPreviewLoading, selection.language, selection.format]);
  const data = useMemo(
    () =>
      createResumePdfData(
        selection.language,
        selection.format,
        'A',
        typeof window !== 'undefined' ? window.location.href : undefined
      ),
    [selection.language, selection.format]
  );
  const set = (key: keyof typeof selection, value: string) => {
    if (selection[key] === value) return;
    setIsPreviewLoading(true);
    setSelection(s => ({ ...s, [key]: value }) as typeof s);
  };
  return (
    <Dialog open={open} onOpenChange={nextOpen => !nextOpen && onClose()}>
      <DialogContent
        closeLabel={t('resume-download-close')}
        className='flex h-[94vh] max-h-[98vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-slate-300 bg-white p-0 text-slate-900 max-md:h-[96vh] max-md:max-w-full dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
        onOpenAutoFocus={event => {
          event.preventDefault();
          requestAnimationFrame(() => firstControlRef.current?.focus());
        }}
        onCloseAutoFocus={event => {
          event.preventDefault();
          requestAnimationFrame(() => triggerRef?.current?.focus());
        }}
      >
        <DialogHeader className='flex-row items-center justify-between border-b border-slate-300 px-5 py-4 dark:border-slate-700'>
          <DialogTitle className='text-lg font-semibold'>{t('resume-download')}</DialogTitle>
        </DialogHeader>
        <div className='flex min-h-0 flex-1 flex-col'>
          <aside className='flex flex-wrap items-end gap-x-8 gap-y-4 border-b border-slate-300 p-4 pr-56 max-md:pr-4 dark:border-slate-700'>
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
                      className={cn(
                        'cursor-pointer rounded border px-3 py-2 text-sm',
                        selection[key as keyof typeof selection] === value
                          ? 'border-cyan-500 bg-cyan-500/20 text-cyan-700 dark:border-cyan-400 dark:text-cyan-200'
                          : 'border-slate-300 hover:border-slate-500 dark:border-slate-600 dark:hover:border-slate-400'
                      )}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </aside>
          <section
            ref={viewerRef}
            className='resume-pdf-viewer relative min-h-[420px] flex-1 border-0 bg-slate-100 p-3 after:pointer-events-none after:absolute after:top-0 after:right-3 after:z-10 after:h-full after:w-4 after:bg-slate-100 dark:bg-slate-800 dark:after:bg-slate-800 [&>iframe]:border-0'
            aria-busy={isPreviewLoading}
          >
            {isPreviewLoading ? (
              <div className='absolute inset-0 z-20 flex items-center justify-center bg-slate-100 dark:bg-slate-800'>
                <FiLoader
                  aria-label='PDF 미리보기 로딩 중'
                  className='size-7 animate-spin text-cyan-600 dark:text-cyan-300'
                />
              </div>
            ) : null}
            <ResumePdfPreview data={data} />
          </section>
        </div>
        <footer className='absolute top-[88px] right-4 z-10 flex justify-end gap-3 border-0 p-0 max-md:top-[116px] max-md:right-2'>
          <button
            type='button'
            className='inline-flex cursor-pointer items-center gap-2 rounded border border-slate-300 bg-transparent px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800'
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  createResumeText(selection.language, selection.format)
                );
                toast.custom(
                  id => (
                    <ResumeCopyToast
                      key={id}
                      message={t(`resume-copy-${selection.format}-success`)}
                      theme={toastTheme}
                      type='success'
                    />
                  ),
                  {
                    style: {
                      left: '50%',
                      width: 'fit-content',
                      maxWidth: 'calc(100vw - 2rem)',
                      transform: 'var(--y) translateX(-50%)',
                    },
                  }
                );
              } catch {
                toast.custom(
                  id => (
                    <ResumeCopyToast
                      key={id}
                      message={t('resume-copy-failure')}
                      theme={toastTheme}
                      type='error'
                    />
                  ),
                  {
                    style: {
                      left: '50%',
                      width: 'fit-content',
                      maxWidth: 'calc(100vw - 2rem)',
                      transform: 'var(--y) translateX(-50%)',
                    },
                  }
                );
              }
            }}
          >
            <FiCopy aria-hidden='true' className='size-4' />
            {t('resume-copy')}
          </button>
          <button
            type='button'
            className='inline-flex cursor-pointer items-center gap-2 rounded border border-cyan-500 bg-cyan-500/20 px-4 py-2 font-medium text-cyan-700 transition-colors hover:bg-cyan-500/30 dark:border-cyan-400 dark:text-cyan-200'
            onClick={async () => {
              try {
                const blob = await pdf(<ResumePdfDocument data={data} />).toBlob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = createResumePdfFileName(selection.language, selection.format, 'A');
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
            <FiDownload aria-hidden='true' className='size-4' />
            {t('resume-download-pdf')}
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
