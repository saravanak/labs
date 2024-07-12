import { useState } from 'react';
import { digits, getNthDigit, orderNumbers } from './multiply';

import { CardTitle } from '../ui/card';

import { clone, last } from 'lodash';

import { cn } from '@/lib/utils';
import TwoNumberEditor from './two-number-editor';
import useTwoNumbers from './two-number-hook';

function leadingNDigits(value: number, n: number) {
  return parseInt(value.toString().split('').slice(0, n).join(''));
}

function countLeadingZeroes(numberString: string) {
  const numberValue = parseInt(numberString, 10);
  return numberValue == 0
    ? numberString.length - 2
    : numberString.length - digits(numberValue);
}

/**
 *     ["100231", "096", "0042", "31"]
 *     ["0042", "0036", "00063", "1"]
 *     ["00063", "00060", "000031", ""]
 *     ["000031", "000024", "000007", ""]
 */

function singleDivisionStep(
  acc: any,
  stepindex: number,
  dividend: number,
  divisor: number
) {
  const quotient = Math.floor(dividend / divisor);
  const currentDigit = getNthDigit(quotient, stepindex, false);
  const currentDenominator = divisor * currentDigit;
  let _, x, prevRemainder, nextSeed, numeratorString, currentDenominatorString;
  if (stepindex == 0) {
    const dividentString = dividend.toString(10);
    numeratorString = dividentString.slice(0, digits(currentDenominator));

    if (parseInt(numeratorString, 10) < currentDenominator) {
      numeratorString = dividentString.slice(0, digits(currentDenominator) + 1);
    }
    nextSeed = dividentString.slice(numeratorString.length);
  } else {
    prevRemainder = (last(acc) as any)[2];
    nextSeed = (last(acc) as any)[3];
    numeratorString = prevRemainder;
  }

  currentDenominatorString = currentDenominator
    .toString(10)
    .padStart(numeratorString.length, '0');
  const currentRemainder = parseInt(numeratorString, 10) - currentDenominator;
  let currentRemainderString = currentRemainder
    .toString(10)
    .padStart(numeratorString.length, '0');

  currentRemainderString = nextSeed.length
    ? `${currentRemainderString}${nextSeed[0]}`
    : currentRemainderString;

  acc.push([
    numeratorString,
    currentDenominatorString,
    currentRemainderString,
    clone(nextSeed).slice(1),
    currentDigit,
  ]);

  if (nextSeed.length == 0) {
    return;
  } else {
    singleDivisionStep(acc, stepindex + 1, dividend, divisor);
  }
}
export function computeDivisionSteps({ dividend, divisor }: any) {
  const steps = [] as any;
  singleDivisionStep(steps, 0, dividend, divisor);
  return steps;
}

export default function DivisionSteps() {
  const twoNumberMeta = useTwoNumbers(3, 23167);

  const [dividend, divisor] = orderNumbers(
    twoNumberMeta.firstNumber,
    twoNumberMeta.secondNumber
  );

  const steps = computeDivisionSteps({ dividend, divisor });

  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;
  const divisorDigits = digits(divisor);
  const dividendDigits = digits(dividend);

  const gridColumns = dividendDigits + divisorDigits;

  const maps: any = {
    firstNumber: {
      label: 'A number to divide',
      type: 'number',
      onValueChange: twoNumberMeta.setFirstNumber,
    },
    secondNumber: {
      label: 'Another number to divide',
      type: 'number',
      onValueChange: twoNumberMeta.setSecondNumber,
    },
  };
  return (
    <>
      <TwoNumberEditor twoNumberMeta={twoNumberMeta} maps={maps} />

      <CardTitle className='bg-gray-300 p-2 mt-2 rounded-md'>
        Solution
      </CardTitle>
      <div className='grid place-content-center '>
        <div
          className={`grid font-mono text-base	tracking-[0.35ch] text-xl box-border gap-0  place-self-center `}
          style={{ gridTemplateColumns: `repeat(${gridColumns},  3ch)` }}
        >
          <Digits
            number={quotient}
            colStart={digits(divisor) + 1}
            rowStart={1}
          />
          <Digits
            number={divisor}
            colStart={1}
            rowStart={2}
            applyClasses={(index: any) => index == digits(divisor) - 1}
            borderClasses={'border-r-[0.25ch] '}
          />
          <Digits
            number={dividend}
            colStart={1 + digits(divisor)}
            rowStart={2}
            borderClasses={'border-t-[0.25ch] '}
          />
          {steps.map(
            (
              [stepDividend, multiple, remainder, nextSeed]: any,
              index: any
            ) => {
              return [stepDividend, multiple, remainder].map(
                (number, stepIndex) => {
                  let border = stepIndex == 2 ? ' border-t-[0.25ch] ' : '';

                  if (index >= 0 && stepIndex == 0) {
                    return <div className={`flex `} key={stepIndex}></div>;
                  }
                  const leadingZeroes = countLeadingZeroes(number);
                  return (
                    <>
                      {stepIndex == 2 ? (
                        <Digits
                          number={0}
                          colStart={1 + digits(divisor) + leadingZeroes - 1}
                          rowStart={2 + 4 * index + stepIndex}
                          borderClasses={border}
                        />
                      ) : null}
                      <Digits
                        number={parseInt(number)}
                        colStart={1 + digits(divisor) + leadingZeroes}
                        rowStart={2 + 4 * index + stepIndex}
                        borderClasses={border}
                      />
                    </>
                  );
                }
              );
            }
          )}
        </div>
      </div>
    </>
  );
}

function Digits({
  number,
  colStart,
  rowStart,
  borderClasses,
  applyClasses = () => true,
}: any) {
  return (
    <>
      {number
        .toString(10)
        .split('')
        .map((n: any, index: number) => {
          return (
            <div
              style={{
                gridColumnStart: colStart + index,
                gridRowStart: rowStart,
              }}
              className={cn(
                'items-center content-center aspect-square text-center  border-red-300',
                applyClasses(index) ? borderClasses : ''
              )}
              key={index}
            >
              {n}
            </div>
          );
        })}
    </>
  );
}
