import Link from 'next/link';

import DarkModeToggle from '@/components/shared/dark-mode-toggle';
import LanguageToggle from '@/components/shared/language-toggle';

const Header = () => (
  <header className='w-full border-b py-3'>
    <div className='mx-auto flex max-w-screen-2xl items-center justify-between px-6'>
      <Link href='/' className='text-xl font-bold'>
        PORTFOLIO
      </Link>

      <div className='flex items-center gap-4'>
        <LanguageToggle />
        <DarkModeToggle />
      </div>
    </div>
  </header>
);

export default Header;
