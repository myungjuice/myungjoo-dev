import { FaGithub, FaLinkedin, FaLink, FaTelegram } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { IconType } from 'react-icons/lib';

import { cn } from '@/lib/utils';

type FooterLink = {
  label: string;
  href?: string;
  icon: IconType;
};

const footerLinks: FooterLink[] = [
  {
    label: 'Github',
    href: process.env.NEXT_PUBLIC_GITHUB_URL,
    icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    icon: FaLinkedin,
  },
  {
    label: 'Wanted',
    href: process.env.NEXT_PUBLIC_WANTED_URL,
    icon: FaLink,
  },
  {
    label: 'Telegram',
    href: process.env.NEXT_PUBLIC_TELEGRAM_URL,
    icon: FaTelegram,
  },
];

const Footer = () => (
  <footer className='min-h-14 w-full rounded-b-lg border-t border-slate-400 text-slate-500 dark:border-slate-700 dark:text-slate-400'>
    <div className='flex h-full flex-col items-center sm:flex-row'>
      {footerLinks.map(({ label, href, icon: Icon }, idx) => (
        <a
          key={label}
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${label} Link`}
          className={cn(
            'flex h-full w-full items-center justify-between border-slate-400 px-4 py-3 transition-colors duration-200 ease-in-out will-change-auto hover:bg-gray-200 sm:px-4 sm:py-0 dark:border-slate-700 hover:dark:bg-slate-800',
            idx > 0 && 'sm:border-l',
            idx < footerLinks.length - 1 && 'border-b',
            idx === footerLinks.length - 1 && 'sm:border-r'
          )}
        >
          <div className='flex items-center gap-2'>
            <Icon className='h-4 w-4 text-slate-500 dark:text-slate-400' />
            <span className='text-body-sm'>{label}</span>
          </div>
          <IoIosArrowForward className='h-4 w-4 text-slate-500 dark:text-slate-400' />
        </a>
      ))}
    </div>
  </footer>
);

export default Footer;
