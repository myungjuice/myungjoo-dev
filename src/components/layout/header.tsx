import Link from 'next/link';

const Header = () => (
  <header className='w-full border-b px-4 py-3'>
    <div className='mx-auto flex max-w-screen-2xl items-center justify-between'>
      <Link href='/' className='text-xl font-bold'>
        PORTFOLIO
      </Link>
    </div>
  </header>
);

export default Header;
