'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import SevenSegmentDigit from '../seven-segment/digit';
import getLedCoding from '@/utils/led/get-led-code';
import IntersectingSegments from './intersecting-segments';

export default function LedWordle() {
  const letters = 'abcdefghijlnopqrstuyz'.split(''); // - minus K, W, V, W, X
  const [currentWord, setCurrentword] = useState<any>([]);
  const [acceptedWords, setAcceptedWords] = useState<any>([]);
  const answer = 'apple';

  const answerCoding = useMemo(() => {
    return answer.split('').map((letter) => getLedCoding(letter, true));
  }, [answer]);

  const handleKeyPress = useCallback(
    (e: any) => {
      console.log(e.key);

      var charCode = e.which ? e.which : e.keyCode;
      var isCapitalAlphabet = charCode >= 65 && charCode <= 90;
      var isSmallAlphabet = charCode >= 97 && charCode <= 122;
      const enterableKey = isCapitalAlphabet
        ? e.key.toLowerCase()
        : isSmallAlphabet
        ? e.key
        : null;

      if (['ArrowLeft', 'Backspace'].includes(e.key)) {
        setCurrentword([...currentWord.slice(0, currentWord.length - 1)]);
      } else if (['Enter'].includes(e.key) && currentWord.length == 5) {
        setAcceptedWords([...acceptedWords, currentWord.join('')]);
        setCurrentword([]);
      } else if (currentWord.length == 5) {
        return;
      } else if (enterableKey) {
        setCurrentword([...currentWord, enterableKey]);
      }
    },
    [currentWord, acceptedWords]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <div className='flex'>
        {letters.map((letter, letterIndex) => {
          return (
            <SevenSegmentDigit
              input={letter}
              key={letterIndex}
              litColor='bg-green-500'
              unlitColor='bg-gray-700'
              bgColor='bg-gray-800'
              thickness='4px'
              height='13px'
              casing='small'
            />
          );
        })}
      </div>
      <div className='flex'>
        {currentWord
          .join('')
          .padEnd(5, ' ')
          .split('')
          .map((letter: any, letterIndex: any) => {
            return (
              <SevenSegmentDigit
                input={letter}
                key={letterIndex}
                litColor='bg-green-500'
                unlitColor='bg-gray-700'
                bgColor='bg-gray-800'
                thickness='4px'
                height='13px'
                casing='small'
              />
            );
          })}
      </div>
      <div className='grid grid-cols-1'>
        {acceptedWords.map((word: any, index: any) => {
          return (
            <div key={index} className='flex'>
              <IntersectingSegments answerCoding={answerCoding} word={word} />
            </div>
          );
        })}
      </div>
    </>
  );
}
