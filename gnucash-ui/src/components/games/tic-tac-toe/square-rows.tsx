import { animated, useTransition } from "@react-spring/web";
import { Square } from "./square";

export default function SquareRows({
  rows,
  isGameDisabled,
  streak,
  makeMove,
}: any) {
  const AnimatedSquare = animated(Square);

  const squareTransitionFunction = (
    style: any,
    v: any,
    _: any,
    index: any
  ): any => {
    return (
      <AnimatedSquare
        value={v}
        style={style}
        disabled={isGameDisabled}
        isWinningSquare={streak && streak.includes(index)}
        onSquareClick={() => makeMove(index)}
      />
    );
  };

  const transitions = useTransition(rows, {
    from: { opacity: 0.5 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    exitBeforeEnter: true,
    config: { duration: 1000},

    key: function (value: any, index: any) {
      return (value ? value : "~") + ":" + index;
    },
  });

  return <>{transitions(squareTransitionFunction)}</>;
}
