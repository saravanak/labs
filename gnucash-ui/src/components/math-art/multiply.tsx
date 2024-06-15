'use client';
import { useState } from "react";
import { cn } from "@/lib/utils"

export const digits = (num: number) => num == 0 ? 1: Math.floor(Math.log10(num)) + 1;

/**
 * get Nth (0 based) from the right
 * > getNthDigit(12345, 3)
 *  2
 * > getNthDigit(12345, 2)
 *  3
 * 
 */
export function getNthDigit(number: number, pos: number): number {
    return Number(String(number).split("").reverse()[pos]);
  }
  
// Returns the bigger number at 0 and the smaller one at 1
export function orderNumbers(lhs:any, rhs:any)  {
     const lhsDigits = digits(lhs);
    const rhsDigits = digits(rhs);
  
    return   rhsDigits >= lhsDigits
        ? [rhs, lhs]
        : [lhs, rhs];
}

export default function MultiplicationSteps() {
  const [multiplicant, setMultiplicant] = useState(34);
  const [multiplier, setMultiplier] = useState(2312);

  
  const [topNumber, bottomNumber] = orderNumbers(multiplicant, multiplier);

  const { rows } = multiplicationSteps(topNumber, bottomNumber);
  return (
    <>
    <p> Enter the numbers to see the detailed multiplication steps. Useful for students who get started with multiplication.
        <br/><span className="text-blue-500"> The smaller number is always the multiplier</span>
    </p>
    <div className="mt-2 border rounded-md">
        <label className="flex justify-between">
            <div className="ml-2 grow block w-5/6 ">First number</div>
          <input
            type="number"
            className="block min-w-[5%] place-self-end"
            value={multiplicant}
            onChange={(e: any) => setMultiplicant(e.target.value)}
          />

        </label>
        <label className="flex justify-between">
            <div className="ml-2 w-5/6 block grow">Second Number</div>
          <input
            type="number"
            className="block min-w-[5%] place-self-end"
            value={multiplier}
            onChange={(e: any) => setMultiplier(e.target.value)}
          />

        </label>
      </div>

    <div className="flex">
        <div className="flex-grow">&nbsp;</div>
    <div className="rounded-md border-2 p-4 mt-20 text-2xl">      
      
      <NumberWithDigits number={topNumber} />
      <NumberWithDigits number={bottomNumber} prefix="x" border="b" />

      {rows.map(({ multiplier, product, tenthPlace }, index) => {
        return (
          <div key={index}>
            {<NumberWithDigits number={product * Math.pow(10, tenthPlace)} />}
          </div>
        );
      })}
      <NumberWithDigits number={topNumber * bottomNumber} border="bt" className="font-bold"/>
    </div>
    <div className="flex-grow">&nbsp;</div>
    </div>
    </>
  );
}

export function NumberWithDigits({ number, prefix, border, className }: any) {
  const bottomDigits = number == 0 ?  1: digits(number);
  const digitElements = [];
  for (var i = bottomDigits - 1; i >= 0; i--) {
    digitElements.push(
      <div key={i} className="p-1 ">       
        {getNthDigit(number, i)}
      </div>
    );
  }
  const dynamicClassNames = `${border?.indexOf("t") >= 0 ? "border-t-red-500 border-t-[1px]" : ""}
  ${border?.indexOf("l") >= 0 ? "border-l-red-500 border-l-[1px]" : ""}
  ${border?.indexOf("b") >= 0 ? "border-b-red-500 border-b-[1px]" : ""} ${className}`
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

