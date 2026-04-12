import type { PropsWithChildren } from 'react';
import { RxCross2 } from 'react-icons/rx';

import { Button } from '@/components/ui/button';

type Props = {
  onClose?: (text?: string) => void;
};

const SectionTitle = ({ onClose, children }: PropsWithChildren<Props>) => {
  const handleClose = () => {
    if (typeof children === 'string') {
      onClose?.(children);
    } else {
      onClose?.();
    }
  };

  return (
    <div className='flex h-[57px] w-max max-w-[min(100%,10rem)] min-w-0 flex-none shrink items-center justify-between border-r border-slate-400 px-2 pl-3 sm:max-w-48 sm:pl-4 lg:max-w-56 xl:max-w-60 xl:pl-6 dark:border-slate-700'>
      <span className='min-w-0 flex-1 truncate pr-1 text-body-md text-slate-700 dark:text-slate-500'>
        {children}
      </span>
      {onClose && (
        <Button size='icon' variant='ghost' onClick={handleClose}>
          <RxCross2 className='h-4 w-4 text-slate-500' />
        </Button>
      )}
    </div>
  );
};

export default SectionTitle;
