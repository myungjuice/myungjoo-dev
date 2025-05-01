import { useMemo } from 'react';

import Checkbox from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useCareerPageStore } from '@/store/use-career-page-store';
import type { CareerFilterItem } from '@/types/career';

type Props = {
  careerKey: CareerFilterItem;
  name: string;
};

const MenuItem = ({ careerKey, name }: Props) => {
  const { selectedFilter, toggleFilter } = useCareerPageStore(state => ({
    selectedFilter: state.selectedFilter,
    toggleFilter: state.toggleFilter,
  }));

  const isSelected = useMemo(() => selectedFilter.includes(careerKey), [selectedFilter, careerKey]);

  const handleCheckedChange = () => {
    toggleFilter(careerKey);
  };

  return (
    <div className='flex items-center space-x-2'>
      <label
        htmlFor={careerKey}
        className='flex w-full cursor-pointer items-center space-x-2 rounded-md px-3 py-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700'
      >
        <Checkbox id={careerKey} checked={isSelected} onCheckedChange={handleCheckedChange} />
        <span
          className={cn(
            'text-body-md text-slate-600 dark:text-slate-400',
            isSelected && 'dark:text-slate-200'
          )}
        >
          {name}
        </span>
      </label>
    </div>
  );
};

export default MenuItem;
