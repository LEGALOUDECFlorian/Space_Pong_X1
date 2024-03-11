import {
  canvas,
  ballSize,
  paddleSize,
  paddles,
  startBallLocation,
  scores,
} from "./constantes.js";
import { moveBall, randomStartLuncher } from "./move.js";
// eslint-disable-next-line no-unused-vars
import { gameStarted } from "./events.input.js";
import { interval } from "./index.init.js";

console.log("events.js");
// // score
// export const scores = [0, 0];

export function resetPaddles() {
  paddles.leftPaddle.x = canvas.width / 6 - paddleSize.paddleHeight;
  paddles.leftPaddle.y = (canvas.height - paddleSize.paddleHeight) / 2;

  paddles.rightPaddle.x = canvas.width - paddles.leftPaddle.x - paddleSize.paddleWidth;
  paddles.rightPaddle.y = (canvas.height - paddleSize.paddleHeight) / 2;
}

export function resetBall() {
  startBallLocation.x = canvas.width / 2;
  startBallLocation.y = canvas.height / 2;
  moveBall.dx = randomStartLuncher();
  moveBall.dy = randomStartLuncher();
}

export function updateScore(player) {
  scores[player] += 1;
  // eslint-disable-next-line no-import-assign
  gameStarted = false;
}

export function checkScore() {
  if (startBallLocation.x + moveBall.dx < ballSize.ballRadius) {
    updateScore(1);
    resetBall();
    resetPaddles();
  } else if (startBallLocation.x + moveBall.dx > canvas.width - ballSize.ballRadius) {
    updateScore(0);
    resetBall();
    resetPaddles();
  }
}
export function endPlay() {
  if (scores[0] === 5) {
    alert("Player 1 \n WIN !");
    document.location.reload();
    clearInterval(interval); //
  }
  if (scores[1] === 5) {
    alert("Player 2 \n WIN !");
    document.location.reload();
    clearInterval(interval); //
  }
}
export { interval };
