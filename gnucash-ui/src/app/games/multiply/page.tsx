"use client";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import MultiplicationSteps from "@/components/math-art/multiply";
import DivisionSteps from "@/components/math-art/division-steps";
import { useEffect, useRef, useState } from "react";

export default function MathPage() {
  const [currentLabel, setCurrentLabel] = useState<any>(null);

  const components = [
    {
      label: "Multiply",
      contentText: "Show multiplication of 2 numbers",
      Component: MultiplicationSteps,
    },
    {
      label: "Divide",
      contentText: "Show Division of two numbers",
      Component: DivisionSteps,
    },
  ];

  const ComponentToRender = useRef<any>(null);

  switch (currentLabel) {
    case "Multiply":
      ComponentToRender.current = MultiplicationSteps;
      break;
    case "Divide":
      ComponentToRender.current = DivisionSteps;
      break;
  }
  return (
    <div>
      {components.map(({ label,  contentText }, index) => {
        return (
          <Card
            key={index}
            onClick={() => setCurrentLabel(label)}
            className={`${label === currentLabel ? "bg-yellow-300" : ""}`}
          >
            <CardHeader>{label}</CardHeader>
            <CardContent>{contentText}</CardContent>
          </Card>
        );
      })}
      {ComponentToRender.current ? <ComponentToRender.current /> : null}
    </div>
  );
}

