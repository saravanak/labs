import type WebSocket from "ws";
import { v4 } from "uuid";
import generateName from "./t3/names";

declare class T3WebSocket extends WebSocket {
  playerId?: string;
  audienceId?: string;
}

interface Player {
  id?: string;
  symbol?: string;
  socket?: T3WebSocket;
  name?: string
}

export type { T3WebSocket, Player };

export function sendWs(ws: T3WebSocket, payload: any) {
  ws.send(JSON.stringify(payload));
}

export default class Game {
  players: Player[] = [];
  audience: Player[] = [];
  moves: any;
  moveIndex: number = 0;

  constructor() {
    this.reset();
  }

  reset() {
    this.players = [{}, {}];
    this.moves = Array(9).fill(null);
    this.moveIndex = 0;
  }

  get firstPlayer() {
    return this.players[0];
  }

  get secondPlayer() {
    return this.players[1];
  }

  join(connection: T3WebSocket) {  
    const index = this.players.findIndex((v) => !v.id);

    const id = v4();

    if (index != -1) {
      this.players[index] = {
        id,
        symbol: index == 0 ? "o" : "x",
        socket: connection,
        name: generateName()
      };
      connection.playerId = id;
    }
  }

  firstPlayerToJoin() {
    return this.players.findIndex((v) => !v.id);
  }

  playerById(id: string) {
    return this.players.find((v) => v.id == id);
  }

  resetPlayerById(id: string) {
    if (!id) {
      console.warn("nil id passed to resetPlayerById");
      return;
    }
    const playerIndex = this.players.findIndex((v) => id == v.id);
    if (playerIndex != -1) {
      console.log("resetPlayerById with playerIndex", playerIndex);
      this.players[playerIndex] = {};
    }
  }

  canJoin() {
    return this.firstPlayerToJoin() != -1;
  }

  get allPlayersJoined() {
    return this.firstPlayerToJoin() == -1;
  }

  otherPlayerJoined(id: any) {
    return this.firstPlayer.id == id
      ? this.secondPlayer.id
      : this.firstPlayer.id;
  }

  get gameState() {
    const canStart = !this.canJoin();
    const isStarted = this.allPlayersJoined || this.moveIndex > 0;
    const winner = this.getWinningPlayer();
    const gameState = {
      canStart,
      isStarted,
      isPaused: isStarted && !canStart,
      isDone: !!winner,
      moves: this.moves,
    };
    return gameState;
  }

  showWelcomeMessage(ws: T3WebSocket) {
    sendWs(ws, {
      type: "welcome",
      payload: {
        serverMessage: "Welcome to the tic-tac-toe server ",
        ...this.gameState,
        yourStatus: "not_joined",
      },
    });
  }

  get nextMove() {
    return this.moveIndex % 2 == 0 ? "o" : "x";
  }

  intimateNextMove() {
    const { nextMove, gameState } = this;

    const { isStarted } = gameState;
    const winDetails = this.getWinningPlayer();
    this.players.forEach((player, index) => {
      const isNextPlayer = player.symbol == nextMove;
      if (!player.socket) {
        console.warn("Nil socket on next move for player", index);
        return;
      }
      const yourSymbol = player.symbol;
      if (winDetails) {
        const isWinner = winDetails.winner?.id == player.id;
        sendWs(player.socket, {
          type: "game_over",
          payload: {
            ...gameState,
            streak: winDetails?.streak,
            yourStatus: isWinner ? "won" : "lost",
            yourSymbol,
          },
        });
      } else if (!isStarted) {
        if (player.socket) {
          sendWs(player.socket, {
            type: "you_joined_game",
            payload: {
              ...gameState,
              yourStatus: "joined",
              yourId: player.socket.playerId,
              yourSymbol,
              yourName: player.name,
              serverMessage: "Waiting for another player to join...",
            },
          });
        }
      } else {
        const playerStatus  = isNextPlayer ? "your_move" : "their_move"
        sendWs(player.socket, {
          type: playerStatus,
          payload: {
            ...gameState,
            yourStatus: playerStatus,
            yourSymbol,
            yourName: player.name,
          },
        });
      }

      this.audience.forEach(watcher => {
        if(watcher.socket) {

          sendWs(watcher.socket, {
            type: "game_status_changed",
            payload: {
              ...gameState,
              yourStatus: "watching",
            }
          })
        }
      })
    });
  }

  addAsAudience(ws: T3WebSocket) {
    const id = v4();

    const alreadyAnAudience = this.audience.find(id => id == ws.audienceId)

    if(alreadyAnAudience){
      return
    }

    this.audience.push({
      id, 
      socket:ws
    })
    ws.audienceId = id;

  }

  getWinningPlayer() {
    //TODO Generalize
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const squares = this.moves;
    let winningSymbol = null;
    let a, b, c;
    for (let i = 0; i < lines.length && !winningSymbol; i++) {
      [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        winningSymbol = squares[a];
      }
    }
    if (winningSymbol) {
      return {
        winner: this.players.find((v) => v.symbol == winningSymbol),
        streak: [a, b, c],
      };
    }
    return null;
  }
}

