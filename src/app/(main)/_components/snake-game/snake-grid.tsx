'use client';

import SnakeCell from './snake-cell';

type CellType = 'empty' | 'snake' | 'food';

interface SnakeGridProps {
  board: CellType[][];
}

const SnakeGrid = ({ board }: SnakeGridProps) => {
  const gridColumns = `grid-cols-[repeat(${board[0]?.length || 24}, 1fr)]`;
  const gridRows = `grid-rows-[repeat(${board.length || 40}, 1fr)]`;

  return (
    <div
      className={`grid h-[400px] w-60 rounded-lg bg-[#011627d6] shadow-inner ${gridColumns} ${gridRows}`}
    >
      {board.flat().map((cell, index) => (
        <SnakeCell key={index} type={cell} />
      ))}
    </div>
  );
};

export default SnakeGrid;
