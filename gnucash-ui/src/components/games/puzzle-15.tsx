import { shuffle } from "lodash";
import { createContext, useEffect, useRef, useState } from "react";
import NumberSkin from "./skins/numbers";
import AlphabetSkin from "./skins/alphabets";
import ButtonGroup from "../ui/button-group";

const initPuzzle = () => {
  return shuffle(
    Array(16)
      .fill(1)
      .map((v, i) => {
        return i == 0 ? null : i;
      })
  );
};

export const LettersContext = createContext(null);

export default function () {
  const rows = 4;
  const columns = 4;

  const sourceImage = useRef(null);
  const [numbers, setNumbers] = useState(initPuzzle());
  const [alphabetSkin, setAlphabetSkin] = useState(null as any);
  const [selectedStrategy, setSelectedStrategy] = useState("numbers");

  const imageSequence: any = [];

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    switch (selectedStrategy) {
      case "numbers":
        setNumbers(initPuzzle());
        break;
      case "alphabets":
        const image = sourceImage.current;
        (image as any).onload = () => {
          for (var i = 0; i < 16; i++) {
            var canvas = document.createElement("canvas");
            var pieceWidth = 152;
            canvas.width = pieceWidth;
            canvas.height = pieceWidth;

            var context: any = canvas.getContext("2d");
            context.drawImage(
              image,
              150 + pieceWidth * Math.round(i % 5),
              100 + pieceWidth * Math.floor(i / 5),
              pieceWidth,
              pieceWidth,
              0,
              0,
              pieceWidth,
              pieceWidth
            );
            let clippedImage = canvas.toDataURL();

            imageSequence.push({
              char: String.fromCharCode(65 + i),
              image: clippedImage,
            });
          }
          setAlphabetSkin([...imageSequence]);
        };
    }
  }, [selectedStrategy]);

  // const [skin, setSkin] = useState("Numbers");

  const swap = (fromIndex: any, toIndex: any) => {
    const temp = numbers[fromIndex];
    numbers[fromIndex] = numbers[toIndex];
    numbers[toIndex] = temp;
    setNumbers([...numbers]);
  };

  function handleKeyDown(e: any) {
    const indexOfEmptySpace = numbers.indexOf(null);
    const row = Math.floor(indexOfEmptySpace / 4);
    const column = indexOfEmptySpace % rows;
    const { top, left, bottom, right } = {
      top: row == 0 ? null : [row - 1, column],
      bottom: row == rows - 1 ? null : [row + 1, column],
      left: column == 0 ? null : [row, column - 1],
      right: column == columns - 1 ? null : [row, column + 1],
    };

    let numberToMove = null;
    switch (e.key) {
      case "ArrowDown":
        numberToMove = top;
        break;
      case "ArrowUp":
        numberToMove = bottom;
        break;
      case "ArrowLeft":
        numberToMove = right;
        break;
      case "ArrowRight":
        numberToMove = left;
        break;
    }
    if (numberToMove) {
      swap(numberToMove[0] * 4 + numberToMove[1], indexOfEmptySpace);
    } else {
      console.log("No element to move to..");
    }
  }

  /**
   * Create the words components . 
   * Find game end
   * generate words on the server using server action .
   * 
   * Bring in remix.js into here/there
   * Deply everything 
   * Start Applying 
   */

  let SkinComponent;
  if (selectedStrategy == "numbers") {
    SkinComponent = NumberSkin;
  } else {
    SkinComponent = AlphabetSkin;
  }
  return (
    <>
      {selectedStrategy == "alphabets" ? (
        < img
          ref={sourceImage}
          src="/letters-resized.png"
          style={{ display: "none" }}
        />
      ) : null}
      <ButtonGroup
        options={[
          {
            value: "numbers",
            label: "Arrange numbers",
            subText: "The gud 'old that we've always enjoyed",
          },
          {
            value: "alphabets",
            label: "Arrange alphabets",
            subText: "Also form words while you arrange",
          },
        ]}
        selectedOption={selectedStrategy}
        onSelectedChange={(v: any) => setSelectedStrategy(v)}
      />
      <LettersContext.Provider value={alphabetSkin}>
        <div className="flex w-1/2">
          <table
            className="grid grid-cols-4 outline-none	text-center  aspect-square grow "
            tabIndex={0}
          >
            <tbody className="contents ">
              {Array(4)
                .fill(false)
                .map((_, row) => {
                  return (
                    <tr key={row} className="  contents">
                      {Array(4)
                        .fill(false)
                        .map((_, column) => {
                          return (
                            <td
                              className=" block bg-gray-300 text-red-800 m-2 rounded-sm text-5xl table"
                              key={`${row + "," + column}`}
                            >
                              <SkinComponent
                                index={row * rows + column}
                                sequence={numbers}
                              />
                            </td>
                          );
                        })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </LettersContext.Provider>
    </>
  );
}

