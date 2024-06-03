import ButtonGroup from "@/components/ui/button-group";
import { reverse, isEqual, dropRight } from "lodash";
import { forwardRef, useEffect } from "react";
reverse;

export default forwardRef(function (
  { winType, onWinTypeChanged, sequence, onGameWon }: any,
  ref: any
) {
  const baseArray = Array(15)
    .fill(0)
    .map((_, i) => i);
  const targetWinCriteria = winType == "order" ? baseArray : reverse(baseArray);

  useEffect(() => {
    const isWon = isEqual(targetWinCriteria, dropRight(sequence));
    if (isWon) {
      onGameWon();
    }
  }, [winType, sequence]);

  return (
    <>
      <img ref={ref} src="/letters-resized.png" style={{ display: "none" }} />

      <ButtonGroup
        options={[
          {
            value: "order",
            label: "ABCD..",
            subText: "Arrange in alphabetical order",
          },
          {
            value: "reverse",
            label: "Reversed",
            subText: "Arrange in reverse alphabetical order",
          },
        ]}
        selectedOption={winType}
        onSelectedChange={onWinTypeChanged}
      />
      <div className="text-xs font-bold pt-4 text-center w-full">
        Image Courtesy:
        <a
          className="text-blue-600 visited:text-purple-600"
          href="https://openclipart.org/image/800px/172241"
        >
          https://openclipart.org/image/800px/172241
        </a>
      </div>
    </>
  );
});

