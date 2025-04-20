'use client';

import React from 'react';

import CodeHighlight from '@/components/shared/code-highlight';

const rawCode = `
function initializeModelChunk<T>(chunk: ResolvedModelChunk): T {
  const value: T = parseModel(chunk._response, chunk._value);
  const initializedChunk: InitializedChunk<T> = (chunk: any);
  initializedChunk._status = INITIALIZED;
  initializedChunk._value = value;
  return value;
}
`;

const Career = () => (
  <div className='flex h-full flex-col items-center justify-center px-4 py-10'>
    <CodeHighlight rawCode={rawCode} />
  </div>
);

const Career2 = () => (
  <div className='flex h-full flex-col items-center justify-center px-4 py-10'>
    <div className='flex max-w-7xl rounded-xl'>
      <div className='flex justify-center px-6'>
        <div className='size-20 rounded-full bg-gray-300' />
      </div>
      <div className='flex flex-col gap-4 border-l border-slate-700 px-6 dark:border-slate-400'>
        <div className='space-y-1'>
          <p className='text-heading-h5'>㈜ 당근마켓</p>
          <p className='text-body-md'>2024.11 - (재직 중)</p>
          <p className='text-body-md'>“이웃과 더 가까워지는 따뜻한 동네를 만들어요”</p>
          <p className='inline-block rounded bg-teal-500 px-2 py-0.5 text-body-sm-bold text-gray-800 dark:text-gray-100'>
            Frontend 개발
          </p>
        </div>

        <div className='space-y-1 border-b border-slate-700 pb-4 dark:border-slate-400'>
          <div className='flex items-center gap-2 border-l-4 border-slate-950 px-2'>
            <p className='text-body-md-bold'>지역 동네 업체 정보(비즈프로필) 관련 개발</p>
          </div>
          <p className='text-body-sm'>2024년 하반기 (진행 중)</p>
          <p className='mt-1 text-body-md'>
            이웃의 사장님들과 고객님들을 효과적으로 연결하기 위한 비즈프로필 관련 기능 개발
          </p>
        </div>

        <div className='space-y-1'>
          <div className='flex items-center gap-2 border-l-4 border-slate-950 px-2'>
            <p className='text-body-md-bold'>지역 동네 업체 정보(비즈프로필) 관련 개발</p>
          </div>
          <p className='text-body-sm'>2024년 하반기 (진행 중)</p>
          <p className='mt-1 text-body-md'>
            이웃의 사장님들과 고객님들을 효과적으로 연결하기 위한 비즈프로필 관련 기능 개발
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Career;
