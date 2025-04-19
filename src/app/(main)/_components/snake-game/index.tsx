/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

import { images } from '@/constants/main';
import { useCanvasSnakeGame } from '@/hooks/use-canvas-snake-game';
import { cn } from '@/lib/utils';

import DirectionControls from './direction-controls';
import FocusOverlay from './focus-overlay';
import GameOverOverlay from './game-over-overlay';
import ScoreBoard from './score-board';
import SnakeCanvas from './snake-canvas';
import StartOverlay from './start-overlay';

const SnakeGame = () => {
  const [isActiveFocus, setIsActiveFocus] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const snakeContainerRef = useRef<HTMLDivElement | null>(null);

  const { score, gameStatus, startGame, restartGame, handleKeyDown, draw } =
    useCanvasSnakeGame(canvasRef);

  const handleStart = () => {
    if (snakeContainerRef.current) snakeContainerRef.current.focus();

    startGame();
  };

  useEffect(() => {
    if (gameStatus === 'ready') draw();
  }, [gameStatus, draw]);

  useEffect(() => {
    const { current } = snakeContainerRef;
    setIsActiveFocus(!!current && document.activeElement === current);
  }, [gameStatus]);

  return (
    <div
      ref={snakeContainerRef}
      className={cn(
        'snake-container relative flex h-[450px] w-[500px] flex-col items-center justify-between rounded-xl border border-black p-5',
        gameStatus === 'playing' && 'cursor-none'
      )}
      tabIndex={0}
      role='button'
      onKeyDown={handleKeyDown}
    >
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.src}
          width={image.width}
          height={image.height}
          className={image.className}
          alt={image.alt}
          priority={image.priority}
        />
      ))}

      <img
        src='/main-green.svg'
        width={498}
        height={427.67}
        className='absolute -top-[100px] -left-[100px] z-[1]'
        alt='main-green'
      />

      <img
        src='/main-blue.svg'
        width={498}
        height={442.09}
        className='absolute top-[100px] left-[150px] z-[1]'
        alt='main-blue'
      />

      <div className='flex w-full justify-between'>
        <SnakeCanvas canvasRef={canvasRef} />

        {gameStatus !== 'ready' && gameStatus !== 'playing' && (
          <GameOverOverlay
            onStart={handleStart}
            onRestart={restartGame}
            status={gameStatus === 'over' ? 'fail' : 'win'}
          />
        )}

        {gameStatus === 'ready' && <StartOverlay onStart={handleStart} />}

        {gameStatus !== 'ready' && gameStatus !== 'playing' && !isActiveFocus && <FocusOverlay />}

        <div className='item-center flex h-full w-[calc(100%-260px)] flex-col justify-center gap-5'>
          <DirectionControls />
          <ScoreBoard score={score} />
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
