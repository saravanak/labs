import { useContext, useEffect, useRef } from "react";
import { Shuffle } from "react-feather";
import { ColorPaletteContext } from "./palette-context-provider";
import { debounce, defer, shuffle } from "lodash";
import { Toggle } from "@/components/ui/toggle";
import { useToggle } from "@uidotdev/usehooks";
import { Slider } from "@/components/ui/slider";
import { SwatchesPicker } from "react-color";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ColorRow from "./color-row";
import * as d3 from "d3";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function CanvasOptions({
  setCurrentZoomLevel,
  currentZoomLevel,
  setBackground,
  background,
}: any) {
  const colorContextState = useContext(ColorPaletteContext);

  const { setUserColors, currentColors, colorState } = colorContextState;

  const [isAnimating, toggleIsAnimating] = useToggle(false);
  const [isShowingPicker, toggleShowingPicker] = useToggle(false);
  const timeoutId = useRef<any>(0);

  useEffect(() => {
    if (isAnimating) {
      timeoutId.current = setInterval(() => {
        setUserColors(shuffle(currentColors));
      }, 1000);
    } else {
      if (timeoutId.current) {
        clearInterval(timeoutId.current);
      }
      timeoutId.current = null;
    }

    return () => {
      if (timeoutId.current) {
        clearInterval(timeoutId.current);
        timeoutId.current = null;
      }
    };
  }, [isAnimating]);

  const debounced = debounce(setCurrentZoomLevel, 5);

  return (
    <>
      <Toggle onClick={() => toggleIsAnimating()}>
        <Shuffle></Shuffle>
        {isAnimating ? "Animating" : "Animate"}
      </Toggle>
      <Slider
        value={[currentZoomLevel]}
        min={5}
        max={30}
        step={1}
        onValueChange={(newValue) => debounced(newValue[0])}
      />
      <Popover>
        <PopoverTrigger>
          <button>Change Background Color</button></PopoverTrigger>
        <PopoverContent>
          <Card>
            <CardHeader>
              <CardTitle> Set background color</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[0.2em]">
                {[
                  ...colorState.colorSchemes[0].scheme,
                  ...d3.schemePastel1,
                ].map((v: any, i: any) => {
                  return (
                    <ColorRow
                      color={v}
                      isSelectedColor={v == background}
                      onClickColor={() => setBackground(v)}
                      colorIndex={i}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </>
  );
}

