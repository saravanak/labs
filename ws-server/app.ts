import express from "express";
import expressWsFactory from "express-ws";

var app: any = express();

expressWsFactory(app);

import type { T3WebSocket } from "./game";

import Game, { sendWs } from "./game";

const game = new Game();

app.ws("/", function (ws: T3WebSocket, req: any) {
  console.log("Echo handler");
  game.showWelcomeMessage(ws);

  ws.on("message", function (msg: any) {
    console.log("Got Message", msg);
    let parsedMessage = msg;

    try {
      parsedMessage = JSON.parse(msg);
    } catch (e) {
      console.error("Unable to parse mesage as json...");
    }

    if (!parsedMessage.command) {
      game.showWelcomeMessage(ws);
      return;
    }

    switch (parsedMessage.command) {
      case "join_game":
        console.log("Processing join game command..", game.canJoin());
        if (game.canJoin() && !game.gameState.isStarted) {
          console.log("Joining as a fresh player");          
          game.join(ws);
          game.intimateNextMove();
        } else if (
          parsedMessage.payload &&
          parsedMessage.payload.playerId &&
          game.gameState.isStarted
        ) {
          console.log("Rejoining the disconnected player");          
          game.join(ws);
          game.intimateNextMove();
        } else {
          game.addAsAudience(ws);
        }
        break;
      case "my_move":
        if (ws.playerId) {
          const movingPlayer = game.playerById(ws.playerId);
          if (movingPlayer?.symbol != game.nextMove) {
            console.warn(
              "My_Move command rx'd from the other player",
              movingPlayer?.symbol
            );
            sendWs(movingPlayer?.socket as T3WebSocket, {
              type: "not_your_move",
            });
          } else {
            game.moves[parsedMessage.payload.index] = movingPlayer.symbol;
            game.moveIndex += 1;
            game.intimateNextMove();
          }
        }

        break;
    }
  });
  ws.on("close", function close() {
    if (ws.playerId) {
      game.resetPlayerById(ws.playerId);
    }
  });
});

app.listen(3001);

/**
 * From Server:
 *
 *  welcome
 *  you_joined_game
 *  someone_joined_game
 *  your_move
 *  their_move
 *  not_your_move
 *  someone_moved
 *  lost
 *
 * From client:
 *
 *  join_game
 *   my_move
 *   watch_game
 */
