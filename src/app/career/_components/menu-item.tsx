import Checkbox from '@/components/ui/checkbox';
import type { CareerFilterItem } from '@/types/career';

type Props = {
  menu: CareerFilterItem;
};

const MenuItem = ({ menu }: Props) => (
  <div className='flex items-center space-x-2'>
    <label
      htmlFor={menu}
      className='flex w-full cursor-pointer items-center space-x-2 rounded-md px-3 py-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700'
    >
      <Checkbox id={menu} />
      <span className='text-body-md text-slate-600 dark:text-slate-400'>{menu}</span>
    </label>
  </div>
);

export default MenuItem;
