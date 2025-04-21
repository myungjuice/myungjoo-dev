import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { navLinks } from '@/constants/header';
import { techList } from '@/constants/projects';
import type { Tech } from '@/types/projects';

import MenuItem from './menu-item';

const accordionTitle = navLinks.find(item => item.href === '/projects')?.label || '_projects';

const SidebarContent = () => (
  <>
    <div className='block px-6 lg:hidden'>
      <Accordion type='single' collapsible className='flex w-full flex-col gap-1 sm:flex-row'>
        <AccordionItem value='projects' className='flex-1'>
          <AccordionTrigger className='rounded-none bg-gray-300 px-4 dark:bg-slate-700'>
            {accordionTitle}
          </AccordionTrigger>
          <AccordionContent className='border border-gray-300 pb-0 dark:border-slate-700'>
            {Object.keys(techList).map(menu => (
              <MenuItem key={menu} menu={menu as Tech} />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <div className='hidden space-y-1 px-6 py-5 lg:block'>
      {Object.keys(techList).map(menu => (
        <MenuItem key={menu} menu={menu as Tech} />
      ))}
    </div>
  </>
);
export default SidebarContent;
