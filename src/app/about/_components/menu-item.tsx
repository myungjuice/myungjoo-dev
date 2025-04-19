import { FaFolder } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Menu } from '@/types/about';

type Props = {
  menu: Menu;
  selectedMenu: Menu;
  folderColor: string;
  onMenuClick: (menu: Menu) => () => void;
};

const MenuItem = ({ menu, selectedMenu, folderColor, onMenuClick }: Props) => (
  <Button
    variant={selectedMenu === menu ? 'outline' : 'ghost'}
    className='w-full justify-start rounded-none px-6 py-5'
    onClick={onMenuClick(menu)}
  >
    <div className='flex items-center gap-2'>
      <FaFolder size={20} className={folderColor} />
      <span
        className={cn(
          'text-body-md text-slate-500 dark:text-slate-400',
          selectedMenu === menu && 'text-slate-900 dark:text-slate-100'
        )}
      >
        {menu}
      </span>
    </div>
  </Button>
);

export default MenuItem;
