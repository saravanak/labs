import { useState } from "react";

export default function useTwoNumbers(_firstNumber: any, _secondNumber: any) {
  const [firstNumber, setFirstNumber] = useState(_firstNumber);
  const [secondNumber, setSecondNumber] = useState(_secondNumber);

  return {
    firstNumber,
    secondNumber,
    setFirstNumber,
    setSecondNumber,
  };
}
