'use client';

import { Globe, Loader } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import useMounted from '@/hooks/use-mounted';
import { useLangStore } from '@/store/use-lang-store';

const LanguageToggle = () => {
  const { lang, setLang } = useLangStore(state => ({
    lang: state.lang,
    setLang: state.setLang,
  }));

  const { i18n } = useTranslation();
  const mounted = useMounted();

  const iconAndText = useMemo(
    () =>
      !mounted ? (
        <Loader className='h-5 w-5 animate-spin' />
      ) : (
        <>
          <Globe className='h-5 w-5' />
          {lang === 'ko' ? 'EN' : 'KR'}
        </>
      ),
    [mounted, lang]
  );

  const handleToggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  return (
    <Button
      variant='outline'
      aria-label='Toggle dark mode'
      size='default'
      disabled={!mounted}
      className='flex items-center gap-2 rounded px-2 transition'
      onClick={handleToggleLanguage}
    >
      {iconAndText}
    </Button>
  );
};

export default LanguageToggle;
