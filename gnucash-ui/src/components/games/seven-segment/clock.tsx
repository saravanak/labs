'use client';

import { useEffect, useState } from 'react';
import SevenSegmentDigit from './digit';

function pad(num: any, size: any) {
  num = num.toString();
  while (num.length < size) num = '0' + num;
  return num;
}

export function ClockLED() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      const date = new Date();
      setCurrentTime(date);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const formattedTime = [
    `${pad(currentTime.getHours(), 2)}`,
    ':',
    `${pad(currentTime.getMinutes(), 2)}`,
    ':',
    `${pad(currentTime.getSeconds(), 2)}`,
  ];

  return (
    <div className='flex'>
      {formattedTime.map((time, timeIndex) => {
        return (
          <div className='flex' key={timeIndex}>
            {time.split('').map((digit, digitIndex) => {
              return <SevenSegmentDigit key={digitIndex} input={digit} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
