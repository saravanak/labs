// import { Text, Transition } from "@mantine/core";
// import { useLocalStorage } from "@mantine/hooks";
// import produce from "immer";
// import { SetStateAction, useEffect, useState } from "react";
// import CheckerBoard from "~/components/checker-board";
// import ChessGridMaker from "~/modulo-problems/colors/chess";
// import { random } from "~/services/math";
// import HelpDriver from "./help-driver";

// type Props = {
//   closeMe: () => void;
// };

// const GRID_SIZE = 8;
// const MAX_SCORE = 5;
// const DURATIONS = {
//   SCORE_UPDATE: 1000,
// };
// function makeGrid(predicate: (r: number, c: number) => string) {
//   const colors = ["blue", "white"];

//   return ChessGridMaker({
//     gridSize: GRID_SIZE,
//     colors,
//     predicateFactory: (colors) => (r, c) => predicate(r, c),
//   });
// }

// const defaultCheckerBoardProps = { showAxes: true, cellSize: "25px" };

// interface HelperState {
//   selectedRow: number;
//   selectedColumn: number;
//   hoveredRow: number;
//   hoveredColumn: number;
//   selectedCell: number[];
//   hoveredCell: number[];
//   targetRow: number;
//   targetCol: number;
//   userAnswered: boolean;
//   selectedCorrectCell: boolean;
// }

// export default function CheckerRow({ closeMe }: Props) {
//   const colors = ["blue", "white"];
//   const lightBlue = "lightblue";
//   const rowMatrix = makeGrid((row: number, _: any) =>
//     row == 0 ? colors[0] : colors[1]
//   );
//   const colMatrix = makeGrid((_: any, col: number) =>
//     col == 0 ? colors[0] : colors[1]
//   );
//   const cellMatrix = makeGrid((row: number, col: number) => {
//     return col == 4 && row == 3
//       ? colors[0]
//       : col == 4 || row == 3
//       ? "lightblue"
//       : colors[1];
//   });
//   const colorMatrix = makeGrid(() => {
//     return (
//       "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0")
//     );
//   });
//   const [helperState, setHelperState] = useLocalStorage<HelperState>({
//     key: "checker.helper",
//     defaultValue: {
//       selectedRow: -1,
//       selectedColumn: -1,
//       hoveredRow: -1,
//       hoveredColumn: -1,
//       selectedCell: [],
//       hoveredCell: [],
//       targetRow: -1,
//       targetCol: -1,
//       userAnswered: false,
//       selectedCorrectCell: false,
//     },
//   });

//   const {
//     selectedRow,
//     selectedColumn,
//     hoveredRow,
//     hoveredColumn,
//     selectedCell,
//     hoveredCell,
//     targetRow,
//     targetCol,
//     userAnswered,
//     selectedCorrectCell,
//   } = helperState;

//   const [currentSlide, setCurrentSlide] = useState<Record<any, any>>({});

//   const [currentScore, setCurrentScore] = useState<number>(0);

//   useEffect(() => {
//     console.log(currentSlide?.checkCurrentCell);

//     const canProcessQuizAttempt =
//       currentSlide?.checkCurrentCell && selectedCell.length == 2;
//     if (!canProcessQuizAttempt) {
//       console.log(selectedCell, currentSlide?.checkCurrentCell);

//       return;
//     }
//     if (selectedCorrectCell) {
//       setCurrentScore((currentScore) => currentScore + 1);
//     } else {
//       setCurrentScore((currentScore) =>
//         currentScore > 0 ? currentScore - 1 : 0
//       );
//     }
//     setTimeout(() => {
//       setHelperState(
//         produce(helperState, (draft) => {
//           draft.selectedCorrectCell = false;
//           draft.targetCol = random(GRID_SIZE);
//           draft.targetRow = random(GRID_SIZE);
//         })
//       );
//     }, DURATIONS.SCORE_UPDATE);
//   }, [userAnswered]);

//   const currentRowMatrix = makeGrid((row: number) =>
//     row == selectedRow ? colors[0] : row == hoveredRow ? lightBlue : colors[1]
//   );
//   const currentColumnMatrix = makeGrid((_: any, column: number) =>
//     column == selectedColumn
//       ? colors[0]
//       : column == hoveredColumn
//       ? lightBlue
//       : colors[1]
//   );
//   const currentCellMatrix = makeGrid((row: number, column: number) => {
//     return selectedCell && row == selectedCell[0] && column == selectedCell[1]
//       ? colors[0]
//       : hoveredCell && row == hoveredCell[0] && column == hoveredCell[1]
//       ? lightBlue
//       : colors[1];
//   });

//   function onActiveSlideChanged(slideNumber: SetStateAction<Record<any, any>>) {
//     setCurrentSlide(slideNumber);
//   }

//   const scaleY = {
//     in: { opacity: 1 },
//     out: { opacity: 0 },
//     common: { transformOrigin: "top", opacity: 0 },
//     transitionProperty: "opacity",
//   };
//   const slides = [
//     {
//       content: (
//         <>
//           <h3>Welcome to checkers</h3>
//           The aim of this game is to make a pattern. <br /> You are provided
//           with a box. <br />
//           Like the blue snake below...
//           <CheckerBoard {...defaultCheckerBoardProps} colorMap={rowMatrix} />
//         </>
//       ),
//     },
//     {
//       content: (
//         <>
//           <h3>What are rows?</h3>
//           The blue snake forms a sleeping line (a horizontal line), and we call
//           it a <b> ROW </b>
//           <CheckerBoard {...defaultCheckerBoardProps} colorMap={rowMatrix} />
//         </>
//       ),
//     },
//     {
//       content: (
//         <>
//           <h3>What are Columns?</h3>
//           The blue snake forms a standing line (a <u>vertical</u> line), and we
//           call it a <b> COLUMN </b>
//           <CheckerBoard {...defaultCheckerBoardProps} colorMap={colMatrix} />
//         </>
//       ),
//     },
//     {
//       content: (
//         <>
//           <h3>What are Cells?</h3>A row and a column cut across on a{" "}
//           <b> CELL</b>.
//           <CheckerBoard {...defaultCheckerBoardProps} colorMap={cellMatrix} />
//         </>
//       ),
//     },
//     {
//       content: (
//         <>
//           <h3>Tables</h3>A group of rows and columns form a <b>table</b>. A
//           Table also has a number of cells!
//           <CheckerBoard colorMap={colorMatrix} />
//         </>
//       ),
//     },
//     {
//       content: (
//         <>
//           <h3>Touch some rows..</h3>
//           <CheckerBoard
//             {...defaultCheckerBoardProps}
//             cellSize="15px"
//             colorMap={currentRowMatrix}
//             onHover={(r, c) =>
//               setHelperState(
//                 produce(helperState, (draft) => {
//                   draft.hoveredRow = r;
//                 })
//               )
//             }
//             onSelect={(r, c) =>
//               setHelperState(
//                 produce(helperState, (draft) => {
//                   draft.selectedRow = r;
//                 })
//               )
//             }
//           />
//           {selectedRow >= 0 && <b>You touched the Row: {selectedRow + 1}</b>}
//         </>
//       ),
//     },
//     {
//       content: (
//         <>
//           <h3>Touch some columns..</h3>
//           <CheckerBoard
//             {...defaultCheckerBoardProps}
//             colorMap={currentColumnMatrix}
//             onHover={(r, c) =>
//               setHelperState(
//                 produce(helperState, (draft) => {
//                   draft.hoveredColumn = c;
//                 })
//               )
//             }
//             onSelect={(r, c) =>
//               setHelperState(
//                 produce(helperState, (draft) => {
//                   draft.selectedColumn = c;
//                 })
//               )
//             }
//           />
//           {selectedColumn >= 0 && (
//             <b>You touched the Column: {selectedColumn + 1}</b>
//           )}
//         </>
//       ),
//     },
//     {
//       content: (
//         <>
//           <h3>Touch some cells..</h3>
//           <CheckerBoard
//             {...defaultCheckerBoardProps}
//             colorMap={currentCellMatrix}
//             onHover={(r: number, c: number) =>
//               setHelperState(
//                 produce(helperState, (draft) => {
//                   draft.hoveredCell = [r, c];
//                 })
//               )
//             }
//             onSelect={(r, c) =>
//               setHelperState(
//                 produce(helperState, (draft) => {
//                   draft.selectedCell = [r, c];
//                 })
//               )
//             }
//           />
//           {selectedCell && (
//             <div>
//               You touched a Cell: on
//               <table>
//                 <tbody>
//                   <tr>
//                     <td>Row</td>
//                     <td>{selectedCell[0] + 1}</td>
//                   </tr>
//                   <tr>
//                     <td>Column</td>
//                     <td>{selectedCell[1] + 1}</td>
//                   </tr>
//                   <tr>
//                     <td>Name</td>
//                     <td>
//                       ({selectedCell[0] + 1}, {selectedCell[1] + 1})
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               The cell can be also named (Row, Column)
//             </div>
//           )}
//         </>
//       ),
//     },
//     {
//       checkCurrentCell: true,
//       targetScore: MAX_SCORE,
//       content: (
//         <>
//           <CheckerBoard
//             {...defaultCheckerBoardProps}
//             colorMap={currentCellMatrix}
//             onHover={(r, c): void =>
//               setHelperState(
//                 produce(helperState, (draft) => {
//                   draft.hoveredCell = [r, c];
//                 })
//               )
//             }
//             onSelect={(r, c) => {
//               setHelperState(
//                 produce(helperState, (draft) => {
//                   draft.selectedCell = [r, c];
//                   if (currentSlide?.checkCurrentCell) {
//                     const isCorrectCellSelected =
//                       targetCol == c && targetRow == r;
//                     draft.selectedCorrectCell = isCorrectCellSelected;
//                     draft.userAnswered = !userAnswered;
//                   }
//                 })
//               );
//             }}
//           />
//           <h3>
//             Touch cell at Row: {targetRow + 1}, Column: {targetCol + 1}
//           </h3>

//           {currentScore > 0 && (
//             <Text fw="700" c="blue">
//               Your Score is {currentScore}/{MAX_SCORE}
//             </Text>
//           )}
//           {currentScore == MAX_SCORE && (
//             <Text fz="large" fw="700" c="green">
//               You are now a cell ninja!
//             </Text>
//           )}

//           <Transition
//             mounted={selectedCorrectCell}
//             transition={scaleY}
//             duration={DURATIONS.SCORE_UPDATE / 3}
//             timingFunction="ease"
//           >
//             {(styles) => (
//               <div style={styles}>
//                 <Text fw="700" c="green">
//                   Thats correct.
//                 </Text>
//               </div>
//             )}
//           </Transition>
//         </>
//       ),
//     },
//   ];

//   const navigationDisabled = currentSlide?.checkCurrentCell
//     ? currentScore < MAX_SCORE
//     : false;
//   return (
//     <HelpDriver
//       name="checkerStepper"
//       slides={slides}
//       onActiveSlideChanged={onActiveSlideChanged}
//       navigationDisabled={navigationDisabled}
//       showFinish={currentScore == MAX_SCORE}
//       onClose={closeMe}
//     />
//   );
// }
