"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Board } from "./misc";
import GameJoiner from "./game-joiner";

export interface GameState {
  canStart: boolean;
  isStarted: boolean;
  isPaused: boolean;
  isDone: boolean;
  moves: (number | null)[];
  streak?: number[];
  yourStatus?: string;
  yourSymbol?: "x" | "o";
  serverMessage?: string;
}

export default function Game() {
  const [isClient, setIsClient] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    canStart: false,
    isStarted: false,
    isPaused: false,
    isDone: false,
    moves: [],
  });

  let socket;

  const socketRef = useRef<any>();

  useEffect(() => {
    if (isClient) {
      socket = new WebSocket("ws://localhost:3001");
      socketRef.current = socket;
      socket.onopen = function (e) {};

      socket.onmessage = function (event) {
        console.log(`[message] Data received from server: ${event.data}`);
        const message = JSON.parse(event.data);
        switch (message.type) {
          case "welcome":
            setGameState({
              ...gameState,
              ...message.payload,
            });
            break;
          case "you_joined_game":
          case "your_move":
          case "their_move":
          case "game_over":
          case "game_status_changed":
            setGameState({
              ...message.payload,
            });
            break;
          case "not_your_move":
            break;
        }
      };

      socket.onclose = function (event) {
        if (event.wasClean) {
          console.log(
            `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
          );
        } else {
          // e.g. server process killed or network down
          // event.code is usually 1006 in this case
          console.log("[close] Connection died", event);
        }
      };
    }
    setIsClient(true);
  }, [isClient]);

  let gameContent;

  switch (gameState.yourStatus) {
    case "not_joined":
      gameContent = (
        <GameJoiner
          gameState={gameState}
          joinAsAplayer={() => {
            socketRef.current.send(
              JSON.stringify({
                command: "join_game",
              })
            );
          }}
        />
      );
      break;
    case "joined":
    case "your_move":
    case "their_move":
    case "won":
    case "lost":
    case "watching":      
      gameContent = (
        <>
          <p>
            You are player{" "}
            <span style={{ fontSize: "4rem" }}>{gameState?.yourSymbol}</span>
            <b> {gameState.serverMessage}</b>
          </p>
          <Board
            gameState={gameState}
            makeMove={(index: any) => {
              socketRef.current.send(
                JSON.stringify({
                  command: "my_move",
                  payload: { index },
                })
              );
            }}
          />
        </>
      );
      break;
  }

  return (
    <div className="game">
      <div className="game-board">{gameContent}</div>
    </div>
  );
}

