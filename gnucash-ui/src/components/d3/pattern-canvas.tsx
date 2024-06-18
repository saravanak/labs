import * as d3 from "d3";
import { ColorPaletteContext } from "../geo-patterns/palette-context-provider";
import { useCallback, useContext, useState } from "react";
import * as parts from "./parts";
import { shuffle, take } from "lodash";

const allMargin = 50;
const availableShapes = [
  parts.flowerParts,
  parts.hex,
  parts.subParts,
  parts.squareParts,
  parts.twoParts,
  parts.trapezoidParts,
  parts.triangleParts,
  parts.plus,
];

export default function PatternCanvas({
  currentSymbol,
  width = 500,
  height = 500,
  marginTop = allMargin,
  marginRight = allMargin,
  marginBottom = allMargin,
  marginLeft = allMargin,
}: any) {
  const x = d3.scaleLinear([0, 10], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear([0, 10], [marginTop, height - marginBottom]);

  const rectWidth = x(1) - x(0);
  const rectHeight = y(1) - y(0);
  const [array, setArray] = useState(Array(100).fill(null));


  const colorContextState = useContext(ColorPaletteContext);
  const { colorState, setColorSchemeIndex, toggleColor } = colorContextState;

  const fourColors = useCallback(() => {
    if (colorState?.currentColors) {
      return shuffle(colorState?.currentColors);
    } else {
      return Array(4).fill("gray");
    }
  }, [colorState]);

  return (
    <svg width={width} height={height} viewBox="0 0  500 500" className="block">
      <g fill="skyblue" stroke="skyblue">

        {array.map((d: any, i: any) => {
          const xOrg = x(i % 10);
          const yOrg = y(Math.floor(i / 10));
          const color: any = fourColors();
          return currentSymbol.map((path:any, index:any) => {
            return (
              <path
                d={path}
                key={index}
                transform={`translate(${xOrg} ${yOrg})`}
                fill={color[index]}
                stroke={color[index]}
              />
            );
          });
        })}
      </g>
    </svg>
  );
}
