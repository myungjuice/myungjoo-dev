import { RxCross2 } from 'react-icons/rx';

type Props = {
  text: string;
};

const SectionTitle = ({ text }: Props) => (
  <div className='hidden h-12 items-center justify-between border-b border-slate-400 lg:flex dark:border-slate-700'>
    <div className='flex h-full w-60 items-center justify-between border-r border-slate-400 px-6 dark:border-slate-700'>
      <span className='slate-700 dark:slate-500 text-body-md'>{text}</span>
      <RxCross2 className='h-4 w-4 text-slate-500' />
    </div>
  </div>
);

export default SectionTitle;
