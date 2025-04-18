'use client';

import { useEffect, useState, useCallback } from 'react';

type Props = {
  lines: string[];
  speed?: number;
  isLoop?: boolean;
  deleteSpeed?: number;
  pauseDelay?: number;
  onComplete?: () => void;
};

export const useTypewriter = ({
  lines,
  speed = 100,
  isLoop = false,
  deleteSpeed = 50,
  pauseDelay = 3000,
  onComplete,
}: Props) => {
  const [typedTexts, setTypedTexts] = useState<string[]>(Array(lines.length).fill(''));
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  const updateTypedText = useCallback(
    (text: string) => {
      setTypedTexts(prev => {
        const updated = [...prev];
        updated[lineIndex] = text.slice(0, charIndex);
        return updated;
      });
    },
    [charIndex, lineIndex]
  );

  const handleTyping = useCallback(
    (text: string) => {
      const isEndOfLine = charIndex >= text.length;
      const isLastLine = lineIndex === lines.length - 1;

      if (!isEndOfLine) {
        setCharIndex(prev => prev + 1);
      } else if (!isLastLine) {
        setLineIndex(prev => prev + 1);
        setCharIndex(0);
      } else if (isLoop) {
        setPause(true);
        setTimeout(() => {
          setPause(false);
          setIsDeleting(true);
          setCharIndex(text.length);
        }, pauseDelay);
      } else {
        onComplete?.();
      }
    },
    [charIndex, isLoop, lineIndex, lines.length, onComplete, pauseDelay]
  );

  const handleDelete = useCallback(() => {
    const isStartOfLine = charIndex === 0;
    const isFirstLine = lineIndex === 0;

    if (!isStartOfLine) {
      setCharIndex(prev => prev - 1);
    } else if (!isFirstLine) {
      const prevLineIndex = lineIndex - 1;
      setLineIndex(prevLineIndex);
      setCharIndex(lines[prevLineIndex].length);
    } else {
      setIsDeleting(false);
      setLineIndex(0);
      setCharIndex(0);
    }
  }, [charIndex, lineIndex, lines]);

  useEffect(() => {
    if (!lines.length || pause) return;

    const currentText = lines[lineIndex];
    const timeout = setTimeout(
      () => {
        updateTypedText(currentText);

        if (isDeleting) {
          handleDelete();
        } else {
          handleTyping(currentText);
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    lineIndex,
    isDeleting,
    lines,
    speed,
    deleteSpeed,
    pause,
    pauseDelay,
    isLoop,
    onComplete,
    handleDelete,
    handleTyping,
    updateTypedText,
  ]);

  return { typedTexts, lineIndex };
};
