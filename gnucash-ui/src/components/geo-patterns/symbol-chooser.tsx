import { useContext } from "react";
import * as parts from "./parts";
import { ColorPaletteContext } from "./palette-context-provider";
const availableShapes = [
  parts.flowerParts,
  parts.hex,
  parts.subParts,
  parts.squareParts,
  parts.twoParts,
  parts.trapezoidParts,
  parts.triangleParts,
  parts.plus,
  parts.diamond
];

export default function SymbolChooser({
  setSymbol,
  curentColors,
  currentSymbol,
}: any) {
  const colorContextState = useContext(ColorPaletteContext);
  const { currentColors } = colorContextState.colorState;

  console.log(currentColors);

  return (
    <div className="flex flex-wrap ">
      {availableShapes.map((paths: any, index) => {
        const colors: any = currentColors;
        return (
            <div
                key={index}
                className="flex-auto p-1"
            >
          <svg
            width={80}
            height={80}
            viewBox="0 0 40 40"
            className={`border-2 rounded-md ${currentSymbol === paths ? "border-red-600" : "border-blue-200"} hover:border-red-700`}
          >
            <g onClick={() => setSymbol(paths)}>
              <rect
                x={0}
                y={0}
                width={40}
                height={40}
                fill="white"
                stroke="none"
              />
              {paths.map((v: any, i: any) => {
                return <path d={v} key={i} fill={colors[i]} stroke="none" />;
              })}
            </g>
          </svg>
          </div>
        );
      })}
    </div>
  );
}

