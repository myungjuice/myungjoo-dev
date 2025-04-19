'use client';

import { RefObject } from 'react';

interface Props {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

const SnakeCanvas = ({ canvasRef }: Props) => (
  <div className='relative z-[2]'>
    <canvas
      ref={canvasRef}
      width={240}
      height={410}
      className='rounded-lg bg-slate-200 shadow-inner shadow-black dark:bg-slate-800'
    />
  </div>
);

export default SnakeCanvas;
