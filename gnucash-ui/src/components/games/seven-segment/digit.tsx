export default function SevenSegmentDigit({ input, color }: any) {
  const segmentThickness = "3px";
  const segmentHeight = "15px";

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

  let segmentCommand: any = "";
  switch (input) {
    case "1":
      segmentCommand = "0110000";
      break;
    case "2":
      segmentCommand = "1101101";
      break;
    case "3":
      segmentCommand = "1111001";
      break;
    case "4":
      segmentCommand = "0110011";
      break;
    case "5":
      segmentCommand = "1011011";
      break;
    case "6":
      segmentCommand = "1011111";
      break;
    case "7":
      segmentCommand = "1110000";
      break;
    case "8":
      segmentCommand = "1111111";
      break;
    case "9":
      segmentCommand = "11110111";
      break;
    case "0":
      segmentCommand = "1111110";
      break;
    case "h":
      segmentCommand = "0010111";
      break;
    case "e":
      segmentCommand = "1001111";
      break;
    case "l":
      segmentCommand = "0001110";
      break;
    case "l":
      segmentCommand = "0001110";
      break;
    case "o":
      segmentCommand = "1111110";
      break;
    case "r":
      segmentCommand = "0100111";
      break;
    case "a":
      segmentCommand = "1110111";
      break;
    case "c":
      segmentCommand = "1001110";
      break;
    case "t":
      segmentCommand = "0001111";
      break;
  }

  const segments = segmentCommand.split("").map((v: any, i: any) => {
    return {
      letter: String.fromCharCode(97 + i),
      isLit: v == "1",
    };
  });
  console.log({ segments });

  let content: any = null;

  if (segmentCommand.length) {
    content = <>{segments.map(({ letter, isLit }: any, index:any) => {
      return isLit ? (
        <div
          key={index}
          className={`${classNamesMapping[letter]} ${
            color ? color : "bg-red-500"
          }`}
        />
      ) : null;
    })}</>
  }

  if (input == ":") {
    content = (
      <>
        <div key="upper" className="row-start-2 col-start-2 bg-red-500 w-1 h-1 self-center justify-self-center	">&nbsp;</div>
        <div key="lower" className="row-start-4 col-start-2 bg-red-500 w-1 h-1 self-center justify-self-center	">&nbsp;</div>
      </>
    )
  }

  return (
    <div
      className={`grid bg-gray-900 ml-1 p-1 rounded-md`}
      style={{
        gridTemplateColumns: `${segmentThickness} ${segmentHeight} ${segmentThickness}`,
        gridTemplateRows: `${segmentThickness} ${segmentHeight} ${segmentThickness} ${segmentHeight} ${segmentThickness}`,
      }}
    >
      {content}
    </div>
  );
}

