"use client";

import DivisionSteps from "@/components/math-art/division-steps";
import MultiplicationSteps from "@/components/math-art/multiply";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleCard from "@/components/ui/ui-hoc/simple-card";
import { useRef, useState } from "react";

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
  ].map((v) => ({ ...v, value: v.label.toLowerCase() }));

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
      <Tabs defaultValue="multiply" className="w-5/6">
        <TabsList className="grow">
          {components.map(({ label, value }, index: number) => (
            <TabsTrigger key={index} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {components.map(({ label, value, Component }, index: number) => (          
          <TabsContent  key={index} value={value}>
            <SimpleCard  title={label}>
            <Component />
            </SimpleCard>
          </TabsContent>
        ))}

        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
  );
}

