'use client';

import React from 'react';

import { useCountStore } from '@/store/useCountStore';

const Home = () => {
  const { count, increase, decrease, reset } = useCountStore();

  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-4'>
      <h1 className='text-2xl font-bold'>Count: {count}</h1>
      <div className='space-x-2'>
        <button onClick={increase} className='px-4 py-2 bg-blue-500 text-white rounded'>
          증가
        </button>
        <button onClick={decrease} className='px-4 py-2 bg-red-500 text-white rounded'>
          감소
        </button>
        <button onClick={reset} className='px-4 py-2 bg-gray-500 text-white rounded'>
          리셋
        </button>
      </div>
    </div>
  );
};

export default Home;
