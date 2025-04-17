import Link from 'next/link';

import LanguageToggle from '@/components/shared/language-toggle';
import ThemeDropdownButton from '@/components/shared/theme-dropdown-button';

const Header = () => (
  <header className='w-full border-b py-3'>
    <div className='mx-auto flex items-center justify-between'>
      <Link href='/' className='text-xl font-bold'>
        PORTFOLIO
      </Link>

      <div className='flex items-center gap-4'>
        <LanguageToggle />
        <ThemeDropdownButton />
      </div>
    </div>
  </header>
);

export default Header;
