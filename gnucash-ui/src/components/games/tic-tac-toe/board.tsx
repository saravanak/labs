"use client";
import dynamic from "next/dynamic";
import { GameState } from "./game";
import SquareRows from "./square-rows";
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useMemo, useState } from "react";
import Countdown from "../seven-segment/countdown";
export default function Board({
  gameState,
  makeMove,
}: {
  gameState: GameState;
  makeMove: any;
}) {
  const { yourStatus, streak } = gameState;
  const isGameDisabled =
    !gameState.canStart || yourStatus != "your_move" || gameState.isDone;
  let gameContent;

  const toConfig = {
    to: [
      {
        borderColor: yourStatus == "your_move" ? "green" : "red",
      },
      {
        borderColor: yourStatus == "your_move" ? "yellow" : "indianred",
      },
    ],
    loop: true,
  };

  let springs = useSpring({
    ...toConfig,
  });
  if (gameState.canStart) {
    const squares = gameState.moves; //.map((v, index): any => {
    gameContent = (
      <>
        {yourStatus == "your_move" ? "Waiting for your move" : null}
        {yourStatus == "their_move" ? "Waiting for opponent to move" : null}
        {yourStatus == "won" ? "You have won!! Another challenge?" : null}
        {yourStatus == "lost" ? "You lost!! Try again?" : null}
        <div className="grid grid-cols-3 grid-rows-[4em_1fr] w-[90%]">
          <div>
            alpha
            </div>
            <Countdown seconds={30} onTimer={() => console.log("Timer done")}> </Countdown>
          <div> beta</div>
          <animated.div
            style={{ ...springs }}
            className="border-4 rounded-md grid grid-cols-3 grid-rows-3 gap-1 p-2 col-span-2"
          >
            <SquareRows
              makeMove={makeMove}
              isGameDisabled={isGameDisabled}
              streak={streak}
              rows={squares}
            />
          </animated.div>
        </div>
      </>
    );
  } else {
    gameContent = null;
  }
  return (
    <>
      <div className="status">Your status: {yourStatus}</div>

      {gameContent}
    </>
  );
}

