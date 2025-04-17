'use client';

import { ChevronDown } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useCountStore } from '@/store/use-count-store';

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <section className='flex flex-col space-y-6 rounded-2xl bg-secondary p-6 shadow'>
    <h2 className='text-2xl font-semibold'>{title}</h2>
    {children}
  </section>
);

const HomePage = () => {
  const { count, increase, decrease, reset } = useCountStore(state => ({
    count: state.count,
    increase: state.increase,
    decrease: state.decrease,
    reset: state.reset,
  }));

  const { t } = useTranslation('main');

  return (
    <div>
      <h1 className='mb-10 text-center text-4xl font-bold'>Home</h1>

      <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        <Section title={t('zustandSectionTitle')}>
          <div
            className={cn(
              'text-4xl font-bold',
              count > 0 && 'text-blue-600',
              count < 0 && 'text-red-600'
            )}
          >
            {count}
          </div>
          <div className='flex gap-4'>
            <button
              onClick={increase}
              className='cursor-pointer rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'
            >
              +
            </button>
            <button
              onClick={decrease}
              className='cursor-pointer rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600'
            >
              -
            </button>
            <button
              onClick={reset}
              className='cursor-pointer rounded bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600'
            >
              {t('resetButtonText')}
            </button>
          </div>
        </Section>

        <Section title={t('designSystemSectionTitle')}>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='font-semibold text-gray-600'>gray-600</div>
              <div className='font-semibold text-red-600'>red-600</div>
            </div>
            <div>
              <div className='font-semibold text-green-600'>green-600</div>
              <div className='font-semibold text-orange-600'>orange-600</div>
            </div>
          </div>

          <div className='space-y-2'>
            <div className='text-heading-800-40'>heading-800-40</div>
            <div className='text-body-600-24'>body-600-24</div>
            <div className='text-body-400-20'>body-400-20</div>
            <div className='text-caption-600-12'>caption-600-12</div>
          </div>
        </Section>

        <Section title={t('shadcnButtonSectionTitle')}>
          <div className='flex flex-wrap gap-4'>
            <Button variant='default'>Default</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='destructive'>Destructive</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='link'>Link</Button>
          </div>
        </Section>

        <Section title={t('shadcnDropdownSectionTitle')}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='w-48'>
                {t('shadcnDropdownTitle')}
                <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48'>
              <DropdownMenuItem>{t('shadcnDropdownOption')} 1</DropdownMenuItem>
              <DropdownMenuItem>{t('shadcnDropdownOption')} 2</DropdownMenuItem>
              <DropdownMenuItem>{t('shadcnDropdownOption')} 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title={t('shadcnInputSectionTitle')}>
          <div className='space-y-2'>
            <Label htmlFor='email'>{t('shadcnInputLabel')}</Label>
            <Input
              id='email'
              type='email'
              placeholder={t('shadcnInputPlaceholder')}
              className='w-3xs'
            />
          </div>
        </Section>

        <Section title={t('shadcnTableSectionTitle')}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('shadcnTableColName')}</TableHead>
                <TableHead>{t('shadcnTableColEmail')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>홍길동</TableCell>
                <TableCell>hong@example.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>김영희</TableCell>
                <TableCell>young@example.com</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>
      </div>
    </div>
  );
};

export default HomePage;
