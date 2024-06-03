"use client";
import { useEffect, useMemo, useState } from "react";
/*

"TBODY td" | map("\n Set ${idx}") | "p" | map("- ${first}\n")
*/

export default function HtmlExtractorComponent() {
  let outputCurrent = "";

  const [value, setValue] = useState<string>("Hi");
  const [selector, setSelector] = useState<string>(
    "TBODY td | map(Set ${this.idx}) | p | map(- ${this.item.textContent})"
  );
  const [output, setOutput] = useState<string>("");

  const onUpdateValue = (event: any) => {
    const textValue = event?.currentTarget?.value;
    console.log(textValue);
    setValue(textValue);
  };

  useEffect(() => {
    setValue((localStorage.getItem("html-content") as string) || "");
  });

  const fillTemplate = function (templateString: any, templateVars: any) {
    return new Function("return `" + templateString + "`;").call(templateVars);
  };

  const constructOutput = ({
    instructionPointer,
    selectorParts,
    currentNodes,
  }: any) => {
    while (instructionPointer < selectorParts.length) {
      const instruction = selectorParts[instructionPointer].trim();
      console.log({
        instruction,
        currentNodes,
        output,
      });

      if (instruction.startsWith("map")) {
        const matches = instruction.match(/map\((.*)\).*/);
        if (!matches) {
          console.log(`Instruction ${instruction} is invalid`, matches);
          throw new Error("Hi");
        }
        for (var idx = 0; idx < currentNodes.length; idx++) {
          const printStatement = matches[1];
          console.log({ printStatement });

          outputCurrent +=
            "<br/>" +
            fillTemplate(printStatement, { idx, item: currentNodes[idx] });
          console.log({ outputCurrent });

          constructOutput({
            instructionPointer: instructionPointer + 1,
            selectorParts,
            currentNodes: currentNodes[idx],
          });
        }
        return;
      } else {
        constructOutput({
          instructionPointer: instructionPointer + 1,
          selectorParts,
          currentNodes: currentNodes.querySelectorAll(instruction),
        });
        return;
      }
    }
  };
  useEffect(() => {
    const nodes = document.createElement("div");
    nodes.innerHTML = value;

    const selectorParts = selector.split("|");
    const currentNodes = nodes.querySelectorAll(selectorParts[0]);

    const instructionPointer = 1;

    if (currentNodes.length > 0) {
      constructOutput({ instructionPointer, selectorParts, currentNodes });

      setOutput(outputCurrent);
    }
  }, [selector, value]);

  //  useEffect(() => {
  //         if(output.length     > 100) {
  //             console.log({output});
  //             bundleMDX({source: "Test Me"}).then(( bundled) => {
  //                 console.log(bundled.code);

  //                 Component= getMDXComponent(bundled.code, {output});
  //             })

  //         } else {
  //             Component= <div></div>;
  //         }

  //     },
  //     [output]
  //   );

  return (
    <div className="grid grid-rows-2 gap-4 font-mono text-sm text-center rounded-lg w-full place-content-stretch">
        <h3> For notes see http://localhost:3020/blog/n/blog/dom-selector-queue/ </h3>
      <div className="flex flex-col justify-center items-center	mt-4">
        <div className="flex justify-center h-full w-full flex-col">
          <input
            className="p-2"
            value={selector}
            onChange={(event) => setSelector(event.target.value)}
          />

          <textarea
            className="h-5/6 border pt-2"
            value={value}
            onChange={onUpdateValue}
          />
        </div>
      </div>
      <div>
        <h3> Here is the output</h3>

        <div dangerouslySetInnerHTML={{ __html: output }}></div>
      </div>
    </div>
  );
}

