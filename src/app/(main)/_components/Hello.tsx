import { useTranslation } from 'react-i18next';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

const Hello = () => {
  const { t } = useTranslation('main');

  return (
    <div className='flex flex-col justify-center gap-4 rounded-xl bg-white p-6 pt-14 shadow-md xl:h-[400px] dark:bg-slate-800'>
      <h4 className='text-body-md-bold sm:text-heading-h5'>{t('title')}!</h4>
      <div className='space-y-4 sm:space-y-2'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
          <FaGithub className='hidden sm:block' />
          <span className='text-body-sm sm:text-body-md'>{t('github')} 👉</span>
          <a
            href={process.env.NEXT_PUBLIC_GITHUB_URL}
            className='text-body-sm underline underline-offset-4 transition-colors hover:text-teal-500 sm:text-body-md'
            target='_blank'
            rel='noopener noreferrer'
          >
            Github
          </a>
        </div>
        <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
          <FaEnvelope className='hidden sm:block' />
          <span className='text-body-sm sm:text-body-md'>{t('email')} 📨</span>
          <a
            href='mailto:wkdaudwn1028@gmail.com'
            className='text-body-sm underline underline-offset-4 transition-colors hover:text-teal-500 sm:text-body-md'
          >
            {t('email_button')}
          </a>
        </div>
      </div>
      <div className='space-y-1'>
        <p className='text-body-sm text-gray-600 dark:text-gray-300'>{t('text_04')}</p>
        <p className='text-body-sm text-gray-500 italic'>&quot;{t('text_05')}&quot;</p>
      </div>
    </div>
  );
};

export default Hello;
