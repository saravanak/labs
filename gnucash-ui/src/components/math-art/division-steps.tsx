import { Fragment, useState } from "react";
import {
  NumberWithDigits,
  digits,
  getNthDigit,
  orderNumbers,
} from "./multiply";

import { Card, CardContent, CardHeader } from "../ui/card";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

function leadingNDigits(value: number, n: number) {
  return parseInt(value.toString().split("").slice(0, n).join(""));
}

export default function DivisionSteps() {
  const [firstNumber, setFirstNumber] = useState<number>(3);
  const [secondNumber, setSecondNumber] = useState<number>(23167);

  const [dividend, divisor] = orderNumbers(firstNumber, secondNumber);

  const [quotient, remainder] = [
    Math.floor(dividend / divisor),
    dividend % divisor,
  ];

  const quotientDigits = digits(quotient);

  const divisionSchema = z.object({
    firstNumber: z.coerce.number().gt(0).lt(100000),
    secondNumber: z.coerce.number().gt(0).lt(100000),
  });

  const form = useForm<z.infer<typeof divisionSchema>>({
    resolver: zodResolver(divisionSchema),
    defaultValues: {
      firstNumber,
      secondNumber,
    },
  });

  function onSubmit(values: z.infer<typeof divisionSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setFirstNumber(values.firstNumber);
    setSecondNumber(values.secondNumber);
  }

  const divisonModel = [
    // {
    //   closestMultiple:
    //   dividendPart:
    //   remainder:
    //   nextDividend
    // }
  ];

  let currentDividend = dividend;
  let currentDividendRemainingStringStr = dividend.toString();
  let cumDigitsConsumed = digits(divisor);
  let previousRemainder = -1;
  for (var i = quotientDigits - 1; i >= 0; i--) {
    const currentQuotient = getNthDigit(quotient, i);
    const closestMultiple = currentQuotient * divisor;
    const digitsForClosestMultiple = digits(closestMultiple);

    let digitsConsumed = digitsForClosestMultiple;
    const dividendPartStr =
      currentDividendRemainingStringStr.length < digitsConsumed
        ? "0"
        : currentDividendRemainingStringStr
            .split("")
            .slice(0, digitsConsumed)
            .join("");
    const dividendPart = parseInt(dividendPartStr, 10);
    currentDividendRemainingStringStr = currentDividendRemainingStringStr
      .split("")
      .slice(digitsConsumed)
      .join("");

    const remainder = dividendPart - closestMultiple;
    currentDividend = parseInt(`${remainder}${currentDividendRemainingStringStr}`, 10);
    currentDividendRemainingStringStr = remainder == 0 ? currentDividendRemainingStringStr :`${remainder}${currentDividendRemainingStringStr}`
    console.log({
      i,
      currentDividend,
      closestMultiple,
      dividendPart,
      remainder,
      currentDividendRemainingStringStr,
    });

    divisonModel.push({
      closestMultiple,
      dividendPart,
      remainder,
      currentDividend,
      previousRemainder,
      currentDividendRemainingStringStr,
      cumDigitsConsumed
    });
    previousRemainder = remainder;
    cumDigitsConsumed += (digitsConsumed  - (previousRemainder ==0 ? 0: digits(previousRemainder)))
  }

  console.log(divisonModel);

  return (
    <h1>
      Divide {dividend} by {divisor}
      Quotient {quotient}, Remainder {remainder}
      <Card>
        <CardHeader>Divison Steps</CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="firstNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FirstNumber</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>First Number to Divide</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FirstNumber</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>Second Number to Divide</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          {
            <div className="flex">
              <div className="grow">&nbsp;</div>
              <div className="_division-holder grid grid-cols-1">
                <div className="flex">
                  <div style={{ width: `${digits(divisor)}em` }}>&nbsp;</div>
                  <NumberWithDigits
                    number={quotient}
                    className="justify-start  text-red-600 p-2"
                  />
                </div>
                <div className="flex">
                  <NumberWithDigits
                    number={divisor}
                    className="justify-start "
                  />
                  <NumberWithDigits
                    number={dividend}
                    border="tl"
                    className="justify-start border-black border-l-2 border-t-2"
                  />
                </div>
                {divisonModel.map((currentStep, index) => {
                  return (
                    <div
                      key={index}
                      style={{ paddingLeft: `${currentStep.cumDigitsConsumed}em` }}
                    >
                      {index > 0 ? (
                        <div className="flex">
                          <div style={{ width: `0em` }}>&nbsp;</div>
                          <NumberWithDigits
                            number={currentStep.dividendPart}
                            className="justify-start "
                          />
                        </div>
                      ) : null}
                      <div className="flex">
                        <div style={{ width: `0em` }}>&nbsp;</div>
                        <NumberWithDigits
                          number={currentStep.closestMultiple}
                          className="justify-start border-b-2 border-black"
                        />
                      </div>

                      {index == divisonModel.length - 1 ? (
                        <div className="flex">
                          <div style={{ width: `0em` }}>&nbsp;</div>
                          <NumberWithDigits
                            number={currentStep.remainder}
                            className="justify-start border-b-2 border-black  text-red-600 "
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <div className="grow">&nbsp;</div>
            </div>
          }
        </CardContent>
      </Card>
    </h1>
  );
}

