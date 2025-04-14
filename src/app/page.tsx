'use client';

import { ChevronDown } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdownMenu';
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
import { useCountStore } from '@/store/useCountStore';

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <section className='flex flex-col justify-center space-y-6 rounded-2xl bg-secondary p-6 shadow'>
    <h2 className='text-2xl font-semibold'>{title}</h2>
    {children}
  </section>
);

const HomePage = () => {
  const { count, increase, decrease, reset } = useCountStore();

  return (
    <div>
      <h1 className='mb-10 text-center text-4xl font-bold'>Home</h1>

      <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        <Section title='Zustand Counter'>
          <div className='text-center text-4xl font-bold text-blue-600'>{count}</div>
          <div className='flex justify-center gap-4'>
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
              Reset
            </button>
          </div>
        </Section>

        <Section title='Tailwind CSS Design System'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='font-semibold text-blue-100'>blue-100</div>
              <div className='font-semibold text-blue-200'>blue-200</div>
            </div>
            <div>
              <div className='font-semibold text-green-100'>green-100</div>
              <div className='font-semibold text-green-200'>green-200</div>
            </div>
          </div>

          <div className='space-y-2'>
            <div className='text-heading-800-40'>heading-800-40</div>
            <div className='text-body-600-24'>body-600-24</div>
            <div className='text-body-400-20'>body-400-20</div>
            <div className='text-caption-600-12'>caption-600-12</div>
          </div>
        </Section>

        <Section title='Shadcn UI - Button Samples'>
          <div className='flex flex-wrap gap-4'>
            <Button variant='default'>Default</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='destructive'>Destructive</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='link'>Link</Button>
          </div>
        </Section>

        <Section title='Shadcn UI - Dropdown'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='w-3xs'>
                선택하세요
                <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48'>
              <DropdownMenuItem>Option 1</DropdownMenuItem>
              <DropdownMenuItem>Option 2</DropdownMenuItem>
              <DropdownMenuItem>Option 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title='Shadcn UI - Input'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='your@email.com' className='w-3xs' />
          </div>
        </Section>

        <Section title='Shadcn UI - Table'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
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
