'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { createHighlighter, type Highlighter } from 'shiki';

import { cn } from '@/lib/utils';

type CodeHighlightProps = {
  rawCode: string;
};

type Theme = 'dark' | 'light';

const themes: Record<Theme, string> = {
  dark: 'rose-pine-moon',
  light: 'rose-pine-dawn',
};

const getCodeHtml = async (code: string, theme: Theme = 'dark'): Promise<string> => {
  const cachedHighlighter: Highlighter = await createHighlighter({
    themes: [themes.light, themes.dark],
    langs: ['js', 'ts', 'jsx', 'tsx', 'json', 'html', 'css'],
  });

  const html = cachedHighlighter.codeToHtml(code, {
    lang: 'tsx',
    theme: themes[theme],
  });

  return html;
};

const CodeHighlight = ({ rawCode }: CodeHighlightProps) => {
  const { resolvedTheme } = useTheme();
  const [highlighted, setHighlighted] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCodeHtml(rawCode.trim(), resolvedTheme === 'light' ? 'light' : 'dark').then(html => {
      setHighlighted(html);
      setIsLoading(false);
    });
  }, [rawCode, resolvedTheme]);

  return (
    <div
      className={cn(
        'w-full overflow-x-hidden rounded-lg py-6 shadow-lg md:w-auto',
        !isLoading && 'overflow-x-auto bg-slate-050 py-6 md:pr-6 md:pl-2 dark:bg-slate-950'
      )}
    >
      {isLoading ? (
        <div className='flex h-96 w-96 items-center justify-center'>
          <div className='h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent dark:border-gray-600 dark:border-t-transparent' />
        </div>
      ) : (
        <div
          className='max-w-none font-fira text-[12px] leading-[1.4]'
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      )}
    </div>
  );
};

export default CodeHighlight;
