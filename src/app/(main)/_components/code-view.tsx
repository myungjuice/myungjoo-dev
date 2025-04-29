import { FaGithub, FaEnvelope } from 'react-icons/fa';

import type { HelloResponse } from '@/types/hello';

type Props = {
  data: HelloResponse;
};

const CodeView = ({ data }: Props) => (
  <div className='flex flex-col justify-center gap-4 rounded-xl bg-white p-6 pt-14 shadow-md xl:h-[400px] dark:bg-slate-800'>
    <h4 className='text-body-md-bold sm:text-heading-h5'>{data.code.title}!</h4>
    <div className='space-y-4 sm:space-y-2'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
        <FaGithub className='hidden sm:block' />
        <span className='text-body-sm sm:text-body-md'>{data.code.github_text} 👉</span>
        <a
          href={process.env.NEXT_PUBLIC_GITHUB_URL}
          className='text-body-sm underline underline-offset-4 transition-colors hover:text-teal-500 sm:text-body-md'
          target='_blank'
          rel='noopener noreferrer'
        >
          Github
        </a>
      </div>
      <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
        <FaEnvelope className='hidden sm:block' />
        <span className='text-body-sm sm:text-body-md'>{data.code.email_text} 📨</span>
        <a
          href='mailto:wkdaudwn1028@gmail.com'
          className='text-body-sm underline underline-offset-4 transition-colors hover:text-teal-500 sm:text-body-md'
        >
          {data.code.email_button_text}
        </a>
      </div>
    </div>
    <div className='space-y-1'>
      <p className='text-body-sm text-gray-600 dark:text-gray-300'>{data.code.text01}</p>
      <p className='text-body-sm text-gray-500 italic'>&quot;{data.code.text02}&quot;</p>
    </div>
  </div>
);

export default CodeView;
