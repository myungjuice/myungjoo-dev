'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { createHighlighter, type Highlighter } from 'shiki';

import Spinner from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import type { Theme, Themes, CodeHighlightProps } from '@/types/code-highlight';

const defaultThemes: Themes = {
  dark: 'rose-pine-moon',
  light: 'rose-pine-dawn',
};

const getCodeHtml = async (
  code: string,
  theme: Theme = 'dark',
  themes: Themes
): Promise<string> => {
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

const CodeHighlight = ({ rawCode, className, themes = defaultThemes }: CodeHighlightProps) => {
  const { resolvedTheme } = useTheme();
  const [highlighted, setHighlighted] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCodeHtml(rawCode.trim(), resolvedTheme === 'light' ? 'light' : 'dark', themes).then(html => {
      setHighlighted(html);
      setIsLoading(false);
    });
  }, [rawCode, resolvedTheme, themes]);

  return (
    <div
      className={cn(
        'w-full overflow-x-hidden rounded-lg py-6 shadow-lg md:w-auto',
        !isLoading && 'overflow-x-auto bg-slate-050 py-6 md:pr-6 md:pl-2 dark:bg-slate-950'
      )}
    >
      {isLoading ? (
        <div className={cn('flex h-32 w-32 items-center justify-center', className)}>
          <Spinner />
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
