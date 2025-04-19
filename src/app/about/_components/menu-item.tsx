import { useTranslation } from 'react-i18next';
import { FaFolder } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { aboutMenuKoMap } from '@/constants/about';
import { cn } from '@/lib/utils';
import type { Menu } from '@/types/about';

type Props = {
  menu: Menu;
  selectedMenu: Menu;
  folderColor: string;
  onMenuClick: (menu: Menu) => () => void;
};

const MenuItem = ({ menu, selectedMenu, folderColor, onMenuClick }: Props) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
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
          {language === 'ko' ? aboutMenuKoMap[menu] : menu}
        </span>
      </div>
    </Button>
  );
};

export default MenuItem;
