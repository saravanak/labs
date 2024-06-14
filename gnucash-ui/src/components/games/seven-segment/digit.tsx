import getLedCoding from "@/utils/led/get-led-code";

export default function SevenSegmentDigit({
  input,
  litColor,
  unlitColor,
  bgColor,
  thickness,
  height,
  casing,
  actualCommand
}: any) {
  const segmentThickness = thickness || "3px";
  const segmentHeight = height || "15px";

  const isSmallCasing = casing == "small";
  /**
   *
   *     a
   *    f b
   *     g
   *    e c
   *     d
   */

  let classNamesMapping: any = {
    a: "row-start-1 col-start-2",
    b: "row-start-2 col-start-3",
    c: "row-start-4 col-start-3",
    d: "row-start-5 col-start-2",
    e: "row-start-4 col-start-1",
    f: "row-start-2 col-start-1",
    g: "row-start-3 col-start-2",
  };

  const segmentCommand = actualCommand || getLedCoding(input, isSmallCasing);

  const segments = segmentCommand.split("").map((v: any, i: any) => {
    return {
      letter: String.fromCharCode(97 + i),
      isLit: v == "1",
    };
  });
  console.log({ segments });

  let content: any = null;

  if (segmentCommand.length) {
    content = (
      <>
        {segments.map(({ letter, isLit }: any, index: any) => {
          return isLit ? (
            <div
              key={index}
              className={`${classNamesMapping[letter]} ${
                litColor ? litColor : "bg-red-500"
              }`}
            />
          ) : (
            <div
              key={index}
              className={`${classNamesMapping[letter]} ${
                unlitColor ? unlitColor : "bg-red-500"
              }`}
            />
          );
        })}
      </>
    );
  }

  if (input == ":") {
    content = (
      <>
        <div
          key="upper"
          className="row-start-2 col-start-2 bg-red-500 w-1 h-1 self-center justify-self-center	"
        >
          &nbsp;
        </div>
        <div
          key="lower"
          className="row-start-4 col-start-2 bg-red-500 w-1 h-1 self-center justify-self-center	"
        >
          &nbsp;
        </div>
      </>
    );
  }

  return (
    <div
      className={`grid ${
        bgColor ? bgColor : "bg-gray-900"
      }  ml-1 p-1 rounded-md `}
      style={{
        gridTemplateColumns: `${segmentThickness} ${segmentHeight} ${segmentThickness}`,
        gridTemplateRows: `${segmentThickness} ${segmentHeight} ${segmentThickness} ${segmentHeight} ${segmentThickness}`,
      }}
    >
      {content}
    </div>
  );
}

