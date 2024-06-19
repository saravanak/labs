import * as d3 from "d3";
import { ColorPaletteContext } from "./palette-context-provider";
import { useCallback, useContext, useState } from "react";
import * as parts from "./parts";
import { shuffle, take } from "lodash";
import { proportion } from "@/utils/math";

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
  currentZoomLevel,
  background,
  width = 500,
  height = 500,
  marginTop = allMargin,
  marginRight = allMargin,
  marginBottom = allMargin,
  marginLeft = allMargin,
}: any) {

  const viewBoxSize = 500;
  const totalItems = currentZoomLevel;
  const x = d3.scaleLinear([0, totalItems], [marginLeft, viewBoxSize - marginRight]);
  const y = d3.scaleLinear([0, totalItems], [marginTop, viewBoxSize - marginBottom]);

  const rectWidth = x(1) - x(0);
  const rectHeight = y(1) - y(0);
  const array = Array(Math.pow(totalItems,2)).fill(null);


  const colorContextState = useContext(ColorPaletteContext);
  const { colorState, setColorSchemeIndex, toggleColor } = colorContextState;

  const fourColors = useCallback(() => {
    if (colorState?.currentColors) {
      return shuffle(colorState?.currentColors);
    } else {
      return Array(4).fill("gray");
    }
  }, [colorState]);

  const scaleValue = 10/totalItems;

  return (
    <svg width={width} height={height} viewBox="0 0  500 500" className="block">
      <g fill={background} stroke={background}>
        <rect x={0} y={0} width={500} height={500} fill={background || "white"} rx={10} ry={10}/>
        {array.map((d: any, i: any) => {
          const xOrg = x(i % totalItems);
          const yOrg = y(Math.floor(i / totalItems));
          const color: any = fourColors();
          return currentSymbol.map((path:any, index:any) => {
            return (
              <path
                d={path}
                key={index}
                transform={`translate(${xOrg} ${yOrg}) scale(${scaleValue} ${scaleValue})`}
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
