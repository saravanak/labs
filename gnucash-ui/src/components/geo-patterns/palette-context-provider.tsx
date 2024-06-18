import { useToggle } from "@uidotdev/usehooks";
import * as d3 from "d3";
import { without } from "lodash";
import { createContext, useCallback, useMemo, useRef, useState } from "react";
const schemes = [
  d3.schemeAccent,
  d3.schemePaired,
  d3.schemePastel1,
  d3.schemeGreys[8],
  d3.schemeBuGn[8],
];

export const ColorPaletteContext = createContext<any>(null);

export default function ColorPaletteProvider({ children }: any) {
  const [colorSchemeIndex, setColorSchemeIndex] = useState(0);
  const [contextRefresh, setContextRefresh] = useToggle(false);

  const [userColors, setUserColors] = useState([]);

  const previousColorSchemes = useRef(
    schemes.map(
      (scheme, i) => ({ index: i, scheme, selectedColorIndices: Array(4)
        .fill(0)
        .map((_, index) => index) } as any)
    )
  );

  const toggleColor = useCallback(
    (schemaIndex: number, indexToToggle: number) => {
      let schemaChanged = false;
      let currentSchema = previousColorSchemes.current[schemaIndex];

      if (schemaIndex != colorSchemeIndex) {
        schemaChanged = true;        
        currentSchema = previousColorSchemes.current[colorSchemeIndex];
      }

      const selectedColorIndices = currentSchema.selectedColorIndices;

      if (selectedColorIndices.includes(indexToToggle)) {
        currentSchema.selectedColorIndices = without(
          selectedColorIndices,
          indexToToggle
        );
      } else {
        currentSchema.selectedColorIndices = [
          ...selectedColorIndices,
          indexToToggle,
        ];
      }
      if (schemaChanged) {
        setColorSchemeIndex(schemaIndex);
      } else {
        setContextRefresh();
      }
    },
    [
      colorSchemeIndex,
      ...previousColorSchemes.current.map((v) => v.selectedColorIndices),
    ]
  );

  const colorState = useMemo(() => {
    console.log("Use memo of provider called");

    const newColorSchemeState = previousColorSchemes.current.map(
      (schemeState, index) => {
        if (colorSchemeIndex == index) {
          return {
            index,
            selectedColorIndices: schemeState.selectedColorIndices,
            scheme: schemeState.scheme,
          };
        } else {
          return schemeState;
        }
      }
    );

    previousColorSchemes.current = newColorSchemeState;

    const currentColorScheme = newColorSchemeState[colorSchemeIndex]

    return {
      colorSchemeIndex,
      selectedColorIndices:
        currentColorScheme.selectedColorIndices,
      currentColors: userColors.length > 0 ?  userColors : currentColorScheme.scheme.filter((_:any, i:any) => currentColorScheme.selectedColorIndices.includes(i)),
      colorSchemes: newColorSchemeState,      
    };
  }, [
    colorSchemeIndex,
    ...previousColorSchemes.current.map((v) => v.selectedColorIndices),
    contextRefresh,
  ]);

  console.log(contextRefresh);

  return (
    <ColorPaletteContext.Provider
      value={{
        colorState,
        setColorSchemeIndex,
        toggleColor,
        contextRefresh,
        userColors, 
        setUserColors,        
      }}
    >
      {children}
    </ColorPaletteContext.Provider>
  );
}

