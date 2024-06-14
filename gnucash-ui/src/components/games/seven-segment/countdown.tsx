"use client";

import { useEffect, useState } from "react";
import SevenSegmentDigit from "./digit";

function pad(num:any, size:any) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

export default function Countdown({seconds, onTimer}: any) {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(seconds);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const date = new Date();
      if(secondsRemaining <= 0) {
        setSecondsRemaining(0);
      } else {
        setSecondsRemaining(secondsRemaining-1);
      }      
    }, 1000);

    if(secondsRemaining <=0) {
      onTimer();
    }

    return () => {
      window.clearInterval(timer);
    };
  }, [secondsRemaining]);

  const formattedTime = [
    `${pad(secondsRemaining,2)}`,    
  ];

  return (
    <div className="flex">
      {formattedTime.map((time, timeIndex) => {
        return (
          <div className="flex" key={timeIndex}>
            {time.split("").map((digit, digitIndex) => {
              return <SevenSegmentDigit key={digitIndex} input={digit} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
