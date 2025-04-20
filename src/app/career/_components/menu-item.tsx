import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Checkbox from '@/components/ui/checkbox';
import { careerKoMap } from '@/constants/career';
import { cn } from '@/lib/utils';
import { useCareerPageStore } from '@/store/use-career-page-store';
import type { CareerFilterItem } from '@/types/career';

type Props = {
  menu: CareerFilterItem;
};

const MenuItem = ({ menu }: Props) => {
  const { selectedFilter, toggleFilter } = useCareerPageStore(state => ({
    selectedFilter: state.selectedFilter,
    toggleFilter: state.toggleFilter,
  }));

  const isSelected = useMemo(() => selectedFilter.includes(menu), [selectedFilter, menu]);

  const {
    i18n: { language },
  } = useTranslation();

  const handleCheckedChange = () => {
    toggleFilter(menu);
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
          {language === 'ko' ? careerKoMap[menu as CareerFilterItem] : menu}
        </span>
      </label>
    </div>
  );
};

export default MenuItem;
