import { useEffect, useState } from "react";

function cellIndex([row, col]: [number, number], arraySize: number): any {
  return row * arraySize + col;
}
type Props = {
  colorMap: string[][];
  showAxes?: boolean;
  onSelect?: (a: number, b: number) => void;
  onHover?: (a: number, b: number) => void;
  showEvaluationAnimations?: boolean;
  aliasColor?: Record<string, string>;
  cellSize?: string;
  onCompletedRender?: any;
};

function generateCheckerBoard({
  colorMap,
  onSelect,
  onHover,
  showAxes,
  aliasColor,
  cellSize,
  showEvaluationAnimations,
  currentAnimatedCell,
  setCurrentAnimatedCell,
  onCompletedRender,
}: Props & {
  currentAnimatedCell: [number, number];
  setCurrentAnimatedCell: any;
}): any {
  const divBorder = "1px solid grey";
  const divSizeComputed = cellSize || "10px";
  const divStlyes = {
    width: divSizeComputed,
    height: divSizeComputed,
    borderTop: divBorder,
    borderRight: divBorder,
    padding: "3px",
    margin: "0px",
    divSizing: "border-div",
    textAlign: "middle",
    display: "div",
    alignItems: "center",
    fontSize: "large",
  };
  const gridSize = colorMap.length;

  const currentAnimatedCellIndex = cellIndex(currentAnimatedCell, gridSize);
  const lastCellIndex = cellIndex([gridSize - 1, gridSize - 1], gridSize);
  const averageWaitTimes = 1000 / Math.pow(gridSize, 2);
  let timeoutHandle: any;

  useEffect(() => {
    if (currentAnimatedCellIndex == lastCellIndex) {
      if (onCompletedRender) {
        onCompletedRender();
      }
      return;
    }
    timeoutHandle = setTimeout(() => {
      setCurrentAnimatedCell((currentAnimatedCell: [number, number]) => {
        const currentAnimatedCellIndex = cellIndex(
          currentAnimatedCell,
          gridSize
        );
        const nextAnimatedCellIndex = currentAnimatedCellIndex + 1;
        const nextAnimatedCell = [
          Math.floor(nextAnimatedCellIndex / gridSize),
          nextAnimatedCellIndex % gridSize,
        ];

        return nextAnimatedCell;
      });
    }, averageWaitTimes);

    return () => clearTimeout(timeoutHandle);
  }, [currentAnimatedCell]);

  useEffect(() => {
    console.log("Resetting animations...");

    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
    setCurrentAnimatedCell([0, 0]);
  }, [colorMap]);

  const listItems = colorMap.map((_, row) => {
    let columnMarkers;
    if (showAxes) {
      columnMarkers = colorMap[row].map((_, col) => {
        return [
          col == 0 ? (
            <div
              key={"rb" + row.toString()}
              // sx={{ ...divStlyes, borderLeft: divBorder }}
            ></div>
          ) : null,
          row == 0 ? (
            <div
              key={"cm" + row.toString() + col.toString()}
              onClick={() => (onSelect ? onSelect(row, col) : null)}
              onMouseMove={() => (onHover ? onHover(row, col) : null)}
              // sx={{
              //   borderBottom: row == gridSize - 1 ? divBorder : "",
              //   ...divStlyes,
              // }}
            >
              {col + 1}
            </div>
          ) : null,
        ].filter((x) => x);
      });
    }
    return (
      <div key={"container" + row.toString()}>
        {row == 0 ? (
          <div
            key={"rm" + row.toString()}
            justify="div-start"
            align="div-start"
            direction="row"
            wrap="wrap"
          >
            {showAxes && columnMarkers}
          </div>
        ) : null}

        <div
          key={"r" + row.toString()}
          justify="div-start"
          align="div-start"
          direction="row"
          wrap="wrap"
        >
          {showAxes && (
            <div
              key={"rb" + row.toString()}
              sx={{
                ...divStlyes,
                borderLeft: divBorder,
                borderBottom: row == gridSize - 1 ? divBorder : "",
              }}
            >
              {row + 1}
            </div>
          )}
          {colorMap[row].map((_, col) => {
            const colorValue = colorMap[row][col];
            const currentCellIndex = cellIndex([row, col], gridSize);

            let bgColor = aliasColor
              ? aliasColor[colorValue] || colorValue
              : colorValue;

            if (showEvaluationAnimations) {
              const lastCellIndex = cellIndex(
                [gridSize - 1, gridSize - 1],
                gridSize
              );
              if (
                currentCellIndex == currentAnimatedCellIndex &&
                currentCellIndex != lastCellIndex
              ) {
                bgColor = "yellow";
              } else if (currentCellIndex > currentAnimatedCellIndex) {
                bgColor = "gray";
              }
            }
            return (
              <div
                key={"c" + col.toString()}
                onClick={() => (onSelect ? onSelect(row, col) : null)}
                onMouseMove={() => (onHover ? onHover(row, col) : null)}
                sx={{
                  backgroundColor: bgColor,
                  borderLeft: showAxes ? "" : col == 0 ? divBorder : "",
                  borderBottom: row == gridSize - 1 ? divBorder : "",
                  ...divStlyes,
                }}
              >
                &nbsp;
              </div>
            );
          })}
        </div>
      </div>
    );
  });
  return listItems;
}

export default function CheckerBoard({
  colorMap,
  onSelect,
  onHover,
  showAxes,
  aliasColor,
  cellSize,
  showEvaluationAnimations,
  onCompletedRender,
}: Props) {
  const [currentAnimatedCell, setCurrentAnimatedCell] = useState<
    [number, number]
  >([0, 0]);

  const listItems = generateCheckerBoard({
    colorMap,
    onSelect,
    onHover,
    showAxes,
    aliasColor,
    cellSize,
    showEvaluationAnimations,
    currentAnimatedCell,
    setCurrentAnimatedCell,
    onCompletedRender,
  });

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.4",
        userSelect: "none",
      }}
    >
      {listItems}
    </div>
  );
}
