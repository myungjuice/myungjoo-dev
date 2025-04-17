export const navLinks = [
  { href: '/', label: '_hello' },
  { href: '/about', label: '_about-me' },
  { href: '/career', label: '_career' },
  { href: '/contact', label: '_contact-me' },
];

export const baseLinkClass =
  'text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200';
export const activeLinkClass = 'font-bold text-slate-600 dark:text-slate-050';

export const overlayAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export const menuAnimation = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};
