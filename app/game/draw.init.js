import {
  canvas,
  ctx,
  paddles,
  startBallLocation,
} from "./constantes.js";
import {
  drawPaddle,
  drawBall,
  drawScore,
} from "./draw.js";
import {
  bounceWall,
  paddleCollision,
} from "./collision.js";
import {
  shiftPaddles,
  moveBall,
} from "./move.js";
import {
  checkScore,
  endPlay,
} from "./events.js";
import { gameStarted } from "./events.input.js";

// peindre le jeu
export default function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPaddle(paddles.rightPaddle);
  drawPaddle(paddles.leftPaddle);
  drawBall();
  bounceWall();
  shiftPaddles();

  paddleCollision();

  checkScore();
  drawScore();
  if (gameStarted) {
    startBallLocation.x += moveBall.dx;
    startBallLocation.y += moveBall.dy;
  }
  endPlay();
}
