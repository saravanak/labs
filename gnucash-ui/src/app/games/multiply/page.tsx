"use client";
import { useState } from "react";

const digits = (num: number) => Math.floor(Math.log10(num)) + 1;

export default function MultiplicationSteps() {
  const [multiplicant, setMultiplicant] = useState(34);
  const [multiplier, setMultiplier] = useState(2312);

  const plicantDigits = digits(multiplicant);
  const plierDigits = digits(multiplier);

  const [topNumber, bottomNumber] =
    plierDigits >= plicantDigits
      ? [multiplier, multiplicant]
      : [multiplicant, multiplier];

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

    <div className="rounded-md border-2 p-4 mt-20">      
      
      <NumberWithDigits number={topNumber} />
      <NumberWithDigits number={bottomNumber} prefix="x" border="b" />

      {rows.map(({ multiplier, product, tenthPlace }, index) => {
        return (
          <div key={index}>
            {<NumberWithDigits number={product * Math.pow(10, tenthPlace)} />}
          </div>
        );
      })}
      <NumberWithDigits number={topNumber * bottomNumber} border="bt" />
    </div>
    </>
  );
}

function NumberWithDigits({ number, prefix, border }: any) {
  const bottomDigits = digits(number);
  const digitElements = [];
  for (var i = bottomDigits - 1; i >= 0; i--) {
    digitElements.push(
      <div key={i} className="p-1 ">
        {" "}
        {getNthDigit(number, i)}
      </div>
    );
  }
  return (
    <div>
      <div
        className={`flex justify-end 
  ${border?.indexOf("t") >= 0 ? "border-t-red-500 border-t-[1px]" : ""}
  ${border?.indexOf("b") >= 0 ? "border-b-red-500 border-b-[1px]" : ""}`}
      >
        {prefix ? <div className="p-1 "> X </div> : null}
        {digitElements}
      </div>
    </div>
  );
}

function getNthDigit(number: number, pos: number): number {
  return Number(String(number).split("").reverse()[pos]);
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

