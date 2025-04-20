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
    <div className='flex w-60 items-center justify-between border-r border-slate-400 pr-2 pl-6 dark:border-slate-700'>
      <span className='slate-700 dark:slate-500 text-body-md'>{children}</span>
      <Button size='icon' variant='ghost' onClick={handleClose}>
        <RxCross2 className='h-4 w-4 text-slate-500' />
      </Button>
    </div>
  );
};

export default SectionTitle;
