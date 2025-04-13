'use client';

import { useCountStore } from '@/store/useCountStore';

const HomePage = () => {
  const { count, increase, decrease, reset } = useCountStore();

  return (
    <main className='flex min-h-screen flex-col items-center justify-center space-y-10 bg-gray-100 p-6'>
      <section className='w-full max-w-md text-center'>
        <h1 className='text-4xl font-bold text-gray-800'>Home</h1>
      </section>

      <section className='w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow'>
        <h2 className='text-center text-2xl font-semibold text-gray-800'>Zustand Counter</h2>
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
      </section>

      <section className='w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow'>
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
