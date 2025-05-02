import { useMemo } from 'react';

import Checkbox from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useProjectsPageStore } from '@/store/use-projects-page-store';

type Props = {
  menu: string;
};

const MenuItem = ({ menu }: Props) => {
  const { selectedTechs, toggleTech } = useProjectsPageStore(state => ({
    selectedTechs: state.selectedTechs,
    toggleTech: state.toggleTech,
  }));

  const isSelected = useMemo(() => selectedTechs.includes(menu), [selectedTechs, menu]);

  const handleCheckedChange = () => {
    toggleTech(menu);
  };

  return (
    <div className='flex items-center space-x-2'>
      <label
        htmlFor={menu}
        className='flex w-full cursor-pointer items-center space-x-2 rounded-md px-3 py-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700'
      >
        <Checkbox id={menu} checked={isSelected} onCheckedChange={handleCheckedChange} />
        <span
          className={cn(
            'text-body-md text-slate-600 dark:text-slate-400',
            isSelected && 'dark:text-slate-200'
          )}
        >
          {menu}
        </span>
      </label>
    </div>
  );
};

export default MenuItem;
