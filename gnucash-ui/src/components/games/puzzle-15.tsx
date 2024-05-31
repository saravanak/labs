import { shuffle } from "lodash";
import { useEffect, useRef, useState } from "react";

const initPuzzle = () => {
  return shuffle(
    Array(16)
      .fill(1)
      .map((v, i) => {
        return i == 0 ? null : i;
      })
  );
};

export default function () {
  const rows = 4;
  const columns = 4;

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    if (tableRef.current) {
      (tableRef.current as any).focus();
    }
  }, []);

  const [numbers, setNumbers] = useState(initPuzzle());

  const tableRef = useRef(null);

  const swap = (fromIndex: any, toIndex: any) => {
    const temp = numbers[fromIndex];
    numbers[fromIndex] = numbers[toIndex];
    numbers[toIndex] = temp;
    setNumbers([...numbers]);
  };

  function handleKeyDown(e: any) {
    const indexOfEmptySpace = numbers.indexOf(null);
    const row = Math.floor(indexOfEmptySpace / 4);
    const column = indexOfEmptySpace % 4;
    const { top, left, bottom, right } = {
      top: row == 0 ? null : [row - 1, column],
      bottom: row == 3 ? null : [row + 1, column],
      left: column == 0 ? null : [row, column - 1],
      right: column == 3 ? null : [row, column + 1],
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

  return (
    <div className="flex w-3/4">
    <table
      ref={tableRef}
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
                        <div className="table-cell align-middle">
                        {numbers[row * columns + column]}
                        </div>
                      </td>
                    );
                  })}
              </tr>
            );
          })}
      </tbody>
    </table>
    </div>
  );
}

