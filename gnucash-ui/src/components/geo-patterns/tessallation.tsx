import {
  useMemo,
  useState
} from "react";
import "ses";

import { useSession } from "next-auth/react";
import ColorChooser from "./color-chooser";
import ColorPaletteProvider from "./palette-context-provider";
import PatternCanvas from "./pattern-canvas";
import SymbolChooser from "./symbol-chooser";
import * as parts from "./parts";

export default function Tessellation() {
  const { data: session, status } = useSession();
  const [symbol, setSymbol] = useState(parts.flowerParts);

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

  return (
    <>
      <ColorPaletteProvider>
        {/* <IterationLambdaEditor
        userCode={userCode}
        setUserCode={setUserCode}
        codeError={codeError}
      /> */}
      <div className="grid grid-cols-auto">
        <div className="grid grid-cols-2 grid-rows-auto">
          <ColorChooser />
          <SymbolChooser setSymbol={setSymbol} currentSymbol={symbol}/>
        </div>
        <PatternCanvas currentSymbol={symbol}/>
      </div>
      </ColorPaletteProvider>
    </>
  );
}

