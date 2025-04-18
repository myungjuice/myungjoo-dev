'use client';

import { ElementType, createElement } from 'react';

import { useTypewriter } from '@/hooks/use-typewriter';

type TypewriterLine = {
  text: string;
  as: ElementType;
  className?: string;
};

type Props = {
  lines: TypewriterLine[];
  speed?: number;
  isLoop?: boolean;
  deleteSpeed?: number;
  pauseDelay?: number;
  onComplete?: () => void;
};

const Typewriter = ({
  lines,
  speed = 100,
  isLoop = false,
  deleteSpeed = 50,
  pauseDelay = 3000,
  onComplete,
}: Props) => {
  const texts = lines.map(line => line.text);
  const { typedTexts, lineIndex } = useTypewriter({
    lines: texts,
    speed,
    isLoop,
    deleteSpeed,
    pauseDelay,
    onComplete,
  });

  return (
    <div className='flex flex-col gap-0.5'>
      {lines.map((line, idx) =>
        createElement(
          line.as,
          { key: idx, className: line.className },
          <>
            {typedTexts[idx]}
            {(lineIndex === idx || (idx === lines.length - 1 && lineIndex === lines.length)) && (
              <span className='animate-blink relative -top-[3px] ml-0.5'>▋</span>
            )}
          </>
        )
      )}
    </div>
  );
};

export default Typewriter;
