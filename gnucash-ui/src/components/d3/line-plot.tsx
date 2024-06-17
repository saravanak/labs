import * as d3 from "d3";
import { shuffle, take, without } from "lodash";
import { useCallback, useMemo, useState } from "react";
import "ses";
import IterationLambdaEditor from "./iteration-lambda-editor";
import * as parts from "./parts";

const allMargin = 50;

export default function LinePlot({
  data,
  width = 435,
  height = 435,
  marginTop = allMargin,
  marginRight = allMargin,
  marginBottom = allMargin,
  marginLeft = allMargin,
}: any) {
  const [array, setArray] = useState(Array(100).fill(null));
  const [symbol, setSymbol] = useState(parts.flowerParts);
  const x = d3.scaleLinear([0, 10], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear([0, 10], [marginTop, height - marginBottom]);

  const rectWidth = x(1) - x(0);
  const rectHeight = y(1) - y(0);

  const [userCode, setUserCode] = useState(`

  return function() {
    const returnColor = function (i) {
      const calculatedRow = Math.floor(i / 10);
      const calculatedColumn = i % 10;
      let firstColor = calculatedRow % 2 == 0 ? "orange" : "skyblue";
      let secondColor = calculatedColumn % 2 == 0 ? "skyblue" : "orange";
    
       return [firstColor, secondColor, secondColor, firstColor];
       }
       return returnColor
  }
  
   `);

  const [colorLambda, codeError] = useMemo(() => {
    try {
      const c1 = new Compartment();
      const f1 = new c1.globalThis.Function(userCode);
      const functionInstance = f1()();
      return [functionInstance, null];
    } catch (e) {
      console.log("Got Error", e);

      return [null, e];
    }
  }, [userCode]);

  console.log(colorLambda, codeError);

  const fourColors = useCallback(
    (i: number) => {
      const colorGenerator =
        colorLambda != null ? colorLambda : () => Array(4).fill("black");

      const row = Math.floor(i / 10);
      const column = i % 10;
      try {
        return colorGenerator((row+column)%4);
      } catch (e) {
        return Array(4).fill("black");
      }
    },
    [colorLambda, userCode, codeError]
  );

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

  const schemes = [
    d3.schemeAccent,
    d3.schemePaired,
    d3.schemePastel1,
    d3.schemeGreys[8],
    d3.schemeBuGn[8],
  ];

  const [colorSchemeIndex, setColorSchemeIndex] = useState(0);

  let colorScheme = schemes[colorSchemeIndex];
  const [currentPalette, setColorPalette] = useState(take(colorScheme, 4));

  function choosePalette(index: number) {
    const newScheme = index;
    setColorSchemeIndex(index);
    setColorPalette(take(schemes[index], 4));
  }

  function toggleColor(paletteIndex: any, color: any) {
    if (paletteIndex != colorSchemeIndex) {
      return;
    }
    let newPalette = [...currentPalette];
    if (currentPalette.includes(color)) {
      newPalette = without(newPalette, color);
    } else {
      newPalette.push(color);
    }

    newPalette;
    setColorPalette(newPalette);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setArray([...array]);
          setColorPalette(shuffle(currentPalette));
        }}
      >
        Shuffle
      </button>
      <IterationLambdaEditor
        userCode={userCode}
        setUserCode={setUserCode}
        codeError={codeError}
      />

      <div>
        {schemes.map((colors, colorSchemaIndex) => {
          return (
            <div className="flex" key={colorSchemaIndex}>
              <div onClick={() => choosePalette(colorSchemaIndex)}>
                {" "}
                Choose{" "}
              </div>
              {colors.map((color, colorIndex) => {
                return (
                  <div
                    key={colorIndex}
                    className="w-6 aspect-square"
                    style={{ backgroundColor: color }}
                    onClick={() => toggleColor(colorSchemaIndex, color)}
                  >
                    {currentPalette.includes(color) ? "*" : null}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <svg
        width={width}
        height={height}
        viewBox="0 0  500 500"
        className="block"
      >
        <g fill="skyblue" stroke="skyblue">
          {availableShapes.map((paths: any, index) => {
            const colors: any = fourColors(index, currentPalette);
            return (
              <g
                key={index}
                transform={`translate(${index * 50} 0 )`}
                onClick={() => setSymbol(paths)}
              >
                {paths.map((v: any, i: any) => {
                  return <path d={v} key={i} fill={colors[i]} stroke="none" />;
                })}
              </g>
            );
          })}
          {array.map((d: any, i: any) => {
            const xOrg = x(i % 10);
            const yOrg = y(Math.floor(i / 10));
            const color: any = fourColors(i, currentPalette);
            return symbol.map((path, index) => {
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
    </>
  );
}

