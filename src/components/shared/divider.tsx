import { cn } from '@/lib/utils';

interface DividerProps {
  stickyTopClassName?: string;
}

const Divider = ({ stickyTopClassName = 'lg:top-[73px]' }: DividerProps) => (
  <div className='flex h-10 w-full justify-center border-t border-b border-slate-400 py-4 2xl:h-auto 2xl:min-h-0 2xl:w-10 2xl:self-stretch 2xl:border-t-0 2xl:border-r 2xl:border-b-0 2xl:border-l dark:border-slate-700'>
    <div className={cn('h-2 w-6 bg-slate-500 lg:sticky lg:self-start', stickyTopClassName)} />
  </div>
);

export default Divider;
