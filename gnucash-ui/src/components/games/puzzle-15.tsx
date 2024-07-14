import { shuffle } from 'lodash';
import { createContext, useEffect, useRef, useState } from 'react';
import ButtonGroup from '../ui/button-group';
import AlphabetConfigurer from './skins/alphabet-configurer';
import AlphabetSkin from './skins/alphabets';
import NumberManager from './skins/number-manager';
import NumberSkin from './skins/numbers';
import Image from 'next/image';

const initPuzzle = () => {
  return shuffle(
    Array(16)
      .fill(1)
      .map((_, i) => {
        return i == 0 ? null : i;
      })
  );
};

export const LettersContext = createContext(null);

export default function Puzzle15Component() {
  const rows = 4;
  const columns = 4;

  const sourceImage = useRef(null);

  const [numbers, setNumbers] = useState(initPuzzle());
  const [alphabetSkin, setAlphabetSkin] = useState(null as any);
  const [selectedStrategy, setSelectedStrategy] = useState('numbers');
  const [alphabetWinType, setAlphabetWinType] = useState('order');
  const [isGameWon, setGameWon] = useState(() => false);


  const imageSequence: any = [];

  useEffect(() => {

    switch (selectedStrategy) {
      case 'numbers':
        setNumbers(initPuzzle());
        break;
      case 'alphabets':
        const image = sourceImage.current;
        (image as any).onload = () => {
          for (var i = 0; i < 16; i++) {
            var canvas = document.createElement('canvas');
            var pieceWidth = 152;
            canvas.width = pieceWidth;
            canvas.height = pieceWidth;

            var context: any = canvas.getContext('2d');
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

  const getRLTB = () => {
    const indexOfEmptySpace = numbers.indexOf(null);
    const row = Math.floor(indexOfEmptySpace / 4);
    const column = indexOfEmptySpace % rows;
    const { top, left, bottom, right } = {
      top: row == 0 ? null : [row - 1, column],
      bottom: row == rows - 1 ? null : [row + 1, column],
      left: column == 0 ? null : [row, column - 1],
      right: column == columns - 1 ? null : [row, column + 1],
    };
    return {
      indexOfEmptySpace,
      top,
      bottom,
      left,
      right,
    };
  };
  useEffect(() => {
    if (isGameWon) {
      document.removeEventListener('keydown', handleKeyDown);
    } else {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const swap = (fromIndex: any, toIndex: any) => {
    const temp = numbers[fromIndex];
    numbers[fromIndex] = numbers[toIndex];
    numbers[toIndex] = temp;
    setNumbers([...numbers]);
  };

  function handleKeyDown(e: any) {

    e.stopPropagation();
    e.preventDefault();

    const { indexOfEmptySpace, top, left, bottom, right } = getRLTB();

    let numberToMove = null;
    switch (e.key) {
      case 'ArrowDown':
        numberToMove = top;
        break;
      case 'ArrowUp':
        numberToMove = bottom;
        break;
      case 'ArrowLeft':
        numberToMove = right;
        break;
      case 'ArrowRight':
        numberToMove = left;
        break;
    }
    if (numberToMove) {
      swap(numberToMove[0] * 4 + numberToMove[1], indexOfEmptySpace);
    } else {
    }
  }

  let SkinComponent;
  if (selectedStrategy == 'numbers') {
    SkinComponent = NumberSkin;
  } else {
    SkinComponent = AlphabetSkin;
  }
  return (
    <div className='flex flex-col w-full'>
      <LettersContext.Provider value={alphabetSkin}>
        <div className='grid align-center row-span-5 place-content-center	 w-full basis-5/12'>
          <table
            className='grid grid-cols-4 outline-none	text-center  aspect-square grow '
            tabIndex={0}
          >
            <tbody className='contents '>
              {Array(4)
                .fill(false)
                .map((_, row) => {
                  return (
                    <tr key={row} className='  contents'>
                      {Array(4)
                        .fill(false)
                        .map((_, column) => {
                          return (
                            <td
                              className={` block ${
                                isGameWon ? 'bg-lime-500' : 'bg-gray-300'
                              } text-red-800 m-2 rounded-sm md:text-2xl lg:text-5xl table`}
                              key={`${row + ',' + column}`}
                              onClick={() => {
                                const {
                                  indexOfEmptySpace,
                                  top,
                                  left,
                                  bottom,
                                  right,
                                } = getRLTB();
                                const allowedMoves = [top, left, bottom, right];

                                const canClickedElementMove = allowedMoves
                                  .filter((v) => v)
                                  .find(
                                    ([moveableRow, moveableColumn]: any) => {
                                      return (
                                        moveableRow == row &&
                                        moveableColumn == column
                                      );
                                    }
                                  );

                                if (canClickedElementMove) {
                                  swap(row * 4 + column, indexOfEmptySpace);
                                }
                              }}
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
      <div className='basis-7/12'>
        {selectedStrategy == 'alphabets' ? (
          <Image
            alt=''
            ref={sourceImage}
            src='/letters-resized.png'
            style={{ display: 'none' }}
          />
        ) : null}
        <ButtonGroup
          options={[
            {
              value: 'numbers',
              label: 'Arrange numbers',
              subText: "The gud 'old that we've always enjoyed",
            },
            {
              value: 'alphabets',
              label: 'Arrange alphabets',
              subText: 'Also form words while you arrange',
            },
          ]}
          selectedOption={selectedStrategy}
          onSelectedChange={(v: any) => setSelectedStrategy(v)}
        />
        {selectedStrategy == 'alphabets' ? (
          <AlphabetConfigurer
            ref={sourceImage}
            winType={alphabetWinType}
            onWinTypeChanged={setAlphabetWinType}
            sequence={numbers}
            onGameWon={setGameWon}
            isGameWon={isGameWon}
          />
        ) : (
          <NumberManager
            sequence={numbers}
            onGameWon={setGameWon}
            isGameWon={isGameWon}
          />
        )}
      </div>
    </div>
  );
}
