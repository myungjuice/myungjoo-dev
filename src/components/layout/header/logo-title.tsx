import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const LogoTitle = () => {
  const { t } = useTranslation('header');
  return (
    <Link
      href='/'
      className='flex h-full items-center text-body-md font-bold text-slate-500 dark:text-slate-400'
    >
      {t('title')}
    </Link>
  );
};

export default LogoTitle;
