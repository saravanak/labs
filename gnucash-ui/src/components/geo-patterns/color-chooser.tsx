import { useContext } from "react";
import { ColorPaletteContext } from "./palette-context-provider";
import { Check } from "react-feather";

export default function ColorChooser() {
  const colorContextState = useContext(ColorPaletteContext);

  const { colorState, setColorSchemeIndex, toggleColor } = colorContextState;

  console.log({ colorState });

  const { colorSchemes, selectedColorIndices, colorSchemeIndex } = colorState;

  if (!colorSchemes) {
    return;
  }

  return (
    <div>
      {colorSchemes.map((schemeMeta: any, thisColorSchemaIndex: number) => {
        return (
          <div className="flex flex-wrap p-[3px]" key={thisColorSchemaIndex}>
            <div
              onClick={() => setColorSchemeIndex(thisColorSchemaIndex)}
              className="aspect-square w-[2rem] h-[2rem]"
            >
              {thisColorSchemaIndex == colorSchemeIndex ?  <Check /> : null}
            </div>
            {schemeMeta.scheme.map((color: any, colorIndex: any) => {
              const isSelectedColor =
                selectedColorIndices.includes(colorIndex) &&
                colorSchemeIndex == thisColorSchemaIndex;
              return (
                <div
                  key={colorIndex}
                  className={`aspect-square p-2 w-[30px] h-[30px] rounded-md   ml-2 ${
                    isSelectedColor ? "ring-2 ring-zinc-500 shadow-xl" : "border-gray-300 border-[1px] "
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => toggleColor(thisColorSchemaIndex, colorIndex)}
                >
                  &nbsp;
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

