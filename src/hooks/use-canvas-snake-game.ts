'use client';

import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';

type Position = { x: number; y: number };
type Direction = 'up' | 'down' | 'left' | 'right';
type GameStatus = 'ready' | 'playing' | 'win' | 'over';

const cellSize = 10;
const rows = 41;
const cols = 24;
const winScore = 10;
const snakeSpeed = 75;

const initialSnake = [
  { x: 10, y: 20 },
  { x: 10, y: 21 },
  { x: 10, y: 22 },
];

const initialFood = { x: 10, y: 5 };

export const useCanvasSnakeGame = (canvasRef: RefObject<HTMLCanvasElement | null>) => {
  const [snake, setSnake] = useState<Position[]>(initialSnake);
  const [food, setFood] = useState<Position>(initialFood);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('ready');

  const directionRef = useRef<Direction>('up');
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const gameStatusRef = useRef<GameStatus>('ready');
  const loopRef = useRef<(time: number) => void>(() => {});

  const generateFood = (currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
      };
    } while (currentSnake.some(s => s.x === newFood.x && s.y === newFood.y));
    return newFood;
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
      const { x, y } = snake[i];
      ctx.fillStyle = '#43D9AD';
      ctx.globalAlpha = 1;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }

    if (food) {
      ctx.fillStyle = '#43D9AD';
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(
        food.x * cellSize + cellSize / 2,
        food.y * cellSize + cellSize / 2,
        cellSize / 2,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }, [snake, food, canvasRef]);

  const move = useCallback(() => {
    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (directionRef.current) {
        case 'up':
          newHead.y--;
          break;
        case 'down':
          newHead.y++;
          break;
        case 'left':
          newHead.x--;
          break;
        case 'right':
          newHead.x++;
          break;
      }

      const hitWall = newHead.x < 0 || newHead.x >= cols || newHead.y < 0 || newHead.y >= rows;
      const hitSelf = prevSnake.some(s => s.x === newHead.x && s.y === newHead.y);
      if (hitWall || hitSelf) {
        setGameStatus('over');
        gameStatusRef.current = 'over';
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= winScore) {
          setGameStatus('win');
          gameStatusRef.current = 'win';
          return newSnake;
        }
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, score]);

  const clearGame = (nextGameStatus: GameStatus) => {
    setSnake(initialSnake);
    setFood(initialFood);
    setScore(0);
    setGameStatus(nextGameStatus);
    gameStatusRef.current = nextGameStatus;
  };

  const startGame = useCallback(() => {
    clearGame('playing');
    directionRef.current = 'up';
    lastTimeRef.current = performance.now();

    setTimeout(() => {
      draw();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(loopRef.current);
    }, 50);
  }, [draw]);

  const restartGame = () => {
    clearGame('ready');
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        if (directionRef.current !== 'down') directionRef.current = 'up';
        break;
      case 'ArrowDown':
        if (directionRef.current !== 'up') directionRef.current = 'down';
        break;
      case 'ArrowLeft':
        if (directionRef.current !== 'right') directionRef.current = 'left';
        break;
      case 'ArrowRight':
        if (directionRef.current !== 'left') directionRef.current = 'right';
        break;
    }
  }, []);

  useEffect(() => {
    loopRef.current = (time: number) => {
      if (gameStatusRef.current !== 'playing') return;

      const delta = time - lastTimeRef.current;
      if (delta > snakeSpeed) {
        move();
        lastTimeRef.current = time;
      }

      draw();
      frameRef.current = requestAnimationFrame(loopRef.current);
    };
  }, [move, draw]);

  useEffect(
    () => () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    },
    []
  );

  return {
    startGame,
    restartGame,
    handleKeyDown,
    draw,
    score,
    gameStatus,
  };
};
