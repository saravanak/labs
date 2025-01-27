import { useContext } from 'react';
import { ColorPaletteContext } from './palette-context-provider';
import { Check } from 'react-feather';
import ColorRow from './color-row';

export default function ColorChooser() {
  const colorContextState = useContext(ColorPaletteContext);

  const { colorState, setColorSchemeIndex, toggleColor } = colorContextState;


  const { colorSchemes, selectedColorIndices, colorSchemeIndex } = colorState;

  if (!colorSchemes) {
    return;
  }

  return (
    <div>
      {colorSchemes.map((schemeMeta: any, thisColorSchemaIndex: number) => {
        return (
          <div className='flex flex-wrap p-[3px]' key={thisColorSchemaIndex}>
            <div
              onClick={() => setColorSchemeIndex(thisColorSchemaIndex)}
              className='aspect-square w-[2rem] h-[2rem]'
            >
              {thisColorSchemaIndex == colorSchemeIndex ? <Check /> : null}
            </div>
            {schemeMeta.scheme.map((color: any, colorIndex: any) => {
              const isSelectedColor =
                selectedColorIndices.includes(colorIndex) &&
                colorSchemeIndex == thisColorSchemaIndex;
              return (
                <ColorRow
                  key={colorIndex}
                  isSelectedColor={isSelectedColor}
                  onClickColor={() =>
                    toggleColor(thisColorSchemaIndex, colorIndex)
                  }
                  colorIndex={colorIndex}
                  color={color}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
