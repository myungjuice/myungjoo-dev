import { type ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

const SidebarContent = ({ title, children }: Props) => (
  <div className='flex flex-col px-6 py-4'>
    <h2 className='text-heading-h6'>{title}</h2>
    <div>{children}</div>
  </div>
);

export default SidebarContent;
