"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import TwoNumberEditor from "./two-number-editor";
import { CardTitle } from "../ui/card";

export const digits = (num: number) => {
  return num == 0 ? 1 : Math.floor(Math.log10(num)) + 1;
};

/**
 * get Nth (0 based) from the right
 * > getNthDigit(12345, 3)
 *  2
 * > getNthDigit(12345, 2)
 *  3
 *
 */
export function getNthDigit(
  number: number,
  pos: number,
  fromRight: boolean = true
): number {
  const array = String(number).split("");
  return Number(fromRight ? array.reverse()[pos] : array[pos]);
}

// Returns the bigger number at 0 and the smaller one at 1
export function orderNumbers(lhs: any, rhs: any) {
  const lhsDigits = lhs;
  const rhsDigits = rhs;

  return rhsDigits >= lhsDigits ? [rhs, lhs] : [lhs, rhs];
}

export default function MultiplicationSteps() {
  const [firstNumber, setFirstNumber] = useState(34);
  const [secondNumber, setSecondNumber] = useState(2312);

  const [topNumber, bottomNumber] = orderNumbers(firstNumber, secondNumber);

  const { rows } = multiplicationSteps(topNumber, bottomNumber);
  const maps: any = {
    firstNumber: {
      label: "A number to multiply",
      type: "number",
      onValueChange: setSecondNumber,
    },
    secondNumber: {
      label: "Another number to multiply",
      type: "number",
      onValueChange: setFirstNumber,
    },
  };
  
  return (
    <>
      <TwoNumberEditor
        firstNumber={firstNumber}
        secondNumber={secondNumber}
        maps={maps}
      />
      <CardTitle className="bg-gray-300 p-2 mt-2 rounded-md">Solution</CardTitle>
      <div className="flex">
        <div className="flex-grow">&nbsp;</div>
        <div className="rounded-md border-2 p-4 mt-4 text-2xl">
          <NumberWithDigits number={topNumber} />
          <NumberWithDigits number={bottomNumber} prefix="x" border="b" />

          {rows.map(({ multiplier, product, tenthPlace }, index) => {
            return (
              <div key={index}>
                {
                  <NumberWithDigits
                    number={product * Math.pow(10, tenthPlace)}
                  />
                }
              </div>
            );
          })}
          <NumberWithDigits
            number={topNumber * bottomNumber}
            border="bt"
            className="font-bold"
          />
        </div>
        <div className="flex-grow">&nbsp;</div>
      </div>
    </>
  );
}

export function NumberWithDigits({ number, prefix, border, className }: any) {
  const bottomDigits = number == 0 ? 1 : digits(number);
  const digitElements = [];
  for (var i = bottomDigits - 1; i >= 0; i--) {
    digitElements.push(
      <div key={i} className="p-1 ">
        {getNthDigit(number, i)}
      </div>
    );
  }
  const dynamicClassNames = `${
    border?.indexOf("t") >= 0 ? "border-t-red-500 border-t-[1px]" : ""
  }
  ${border?.indexOf("l") >= 0 ? "border-l-red-500 border-l-[1px]" : ""}
  ${
    border?.indexOf("b") >= 0 ? "border-b-red-500 border-b-[1px]" : ""
  } ${className}`;
  return (
    <div>
      <div className={cn("flex justify-end", dynamicClassNames)}>
        {prefix ? <div className="p-1 "> X </div> : null}
        {digitElements}
      </div>
    </div>
  );
}

function multiplicationSteps(top: number, bottom: number) {
  const rows = [];
  const bottomDigits = digits(bottom);
  for (var i = 0; i < bottomDigits; i++) {
    const thisMultiplier = getNthDigit(bottom, i);
    rows.push({
      multiplier: thisMultiplier,
      product: thisMultiplier * top,
      tenthPlace: i,
    });
  }
  return {
    top,
    bottom,
    rows,
  };
}

