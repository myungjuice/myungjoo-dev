'use client';

import { useCountStore } from '@/store/useCountStore';

const HomePage = () => {
  const { count, increase, decrease, reset } = useCountStore();

  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 space-y-10'>
      <section className='w-full max-w-md text-center'>
        <h1 className='text-4xl font-bold text-gray-800'>Home</h1>
      </section>

      <section className='w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-4'>
        <h2 className='text-2xl font-semibold text-gray-800 text-center'>Zustand Counter</h2>
        <div className='text-center text-4xl font-bold text-blue-600'>{count}</div>
        <div className='flex justify-center gap-4'>
          <button
            onClick={increase}
            className='px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition'
          >
            +
          </button>
          <button
            onClick={decrease}
            className='px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition'
          >
            -
          </button>
          <button
            onClick={reset}
            className='px-4 py-2 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-600 transition'
          >
            Reset
          </button>
        </div>
      </section>

      <section className='w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-6'>
        <h2 className='text-2xl font-semibold text-gray-800'>Tailwind CSS Design System</h2>

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
      </section>
    </main>
  );
};

export default HomePage;
