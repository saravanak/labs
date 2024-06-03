import { dropRight, isEqual } from "lodash";
import { useEffect } from "react";


export default function (  { sequence, onGameWon, isGameWon: isGameWonAlready }: any) {
  const targetWinCriteria = Array(15)
    .fill(0)
    .map((_, i) => i+1);

  useEffect(() => {
    const isWon = isEqual(targetWinCriteria, dropRight(sequence));
    
    if (isWon && !isGameWonAlready) {

      setTimeout(() => {

        onGameWon(true);
      }, 100)
    }
  }, [sequence]);

  return <></>;
};

