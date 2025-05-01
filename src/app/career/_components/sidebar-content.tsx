import { useTranslation } from 'react-i18next';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { navLinks } from '@/constants/header';
import { useCareerPageStore } from '@/store/use-career-page-store';
import type { Language } from '@/types/language';

import MenuItem from './menu-item';

const accordionTitle = navLinks.find(item => item.href === '/career')?.label || '_career';

const SidebarContent = () => {
  const { careerNames } = useCareerPageStore(state => ({
    careerNames: state.careerNames,
  }));

  const {
    i18n: { language },
  } = useTranslation();

  return (
    <>
      <div className='block px-6 lg:hidden'>
        <Accordion type='single' collapsible className='flex w-full flex-col gap-1 sm:flex-row'>
          <AccordionItem value='career' className='flex-1'>
            <AccordionTrigger className='rounded-none bg-gray-300 px-4 dark:bg-slate-700'>
              {accordionTitle}
            </AccordionTrigger>
            <AccordionContent className='border border-gray-300 pb-0 dark:border-slate-700'>
              {careerNames.map(career => (
                <MenuItem
                  key={career.key}
                  careerKey={career.key}
                  name={career.name[language as Language]}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className='hidden space-y-1 px-6 py-5 lg:block'>
        {careerNames.map(career => (
          <MenuItem
            key={career.key}
            careerKey={career.key}
            name={career.name[language as Language]}
          />
        ))}
      </div>
    </>
  );
};
export default SidebarContent;
