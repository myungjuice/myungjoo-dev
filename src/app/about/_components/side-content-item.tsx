import Image from 'next/image';
import { FaRegCommentDots, FaStar } from 'react-icons/fa';

import CodeHighlight from '@/components/shared/code-highlight';

type Props = {
  username: string;
  createdAt: string;
  comments: number;
  stars: number;
  rawCode: string;
};

const SideContentItem = ({ username, createdAt, comments, stars, rawCode }: Props) => (
  <div className='space-y-4'>
    <div className='flex items-center justify-between'>
      <div className='flex items-start gap-3'>
        <div className='relative h-9 w-9 rounded-full'>
          <Image
            src='/images/profile.jpeg'
            alt='profile'
            fill
            sizes='36px'
            priority
            className='absolute rounded-full'
          />
        </div>
        <div className='flex flex-col gap-1 text-body-sm leading-tight'>
          <span className='font-bold text-indigo-500'>@{username}</span>
          <span className='text-slate-800 dark:text-slate-400'>Created {createdAt}</span>
        </div>
      </div>

      <div className='flex items-center gap-4 text-body-sm text-slate-800 dark:text-slate-400'>
        <div className='flex items-center gap-1'>
          <FaRegCommentDots className='size-3' />
          <span>{comments}</span>
        </div>

        <div className='flex items-center gap-1'>
          <FaStar className='size-3' />
          <span>{stars}</span>
        </div>
      </div>
    </div>

    <CodeHighlight rawCode={rawCode} />
  </div>
);

export default SideContentItem;
