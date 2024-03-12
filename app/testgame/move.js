import {
  canvas,
  paddleSize,
  paddles,
} from "./constantes.js";
import { keysEventsPlayers } from "./events.input.js";
// import { paddleSize } from "./draw.js";
// import { keysPlayers } from "./events.input.js";

console.log("move.js");
// mouvement aléatoire de la balle au lancement du jeu
export function randomStartLuncher() {
  const symboles = "+-";
  const numbers = "234";
  const randomDirection = symboles[Math.floor(Math.random() * symboles.length)];
  const randomNumber = parseInt(numbers[Math.floor(Math.random() * 3)], 10);
  return randomDirection === "+" ? randomNumber : -randomNumber;
}
// direction du mouvement de la balle
export const moveBall = {
  dx: randomStartLuncher(),
  dy: randomStartLuncher(),
};
// mouvement des raquettes dans le canvas
export function movePaddle(paddle, upPressed, downPressed) {
  const updatePaddle = { ...paddle };
  if (downPressed) {
    updatePaddle.paddle.y += 7;
    if (updatePaddle.y + paddleSize.paddleHeight > canvas.height) {
      updatePaddle.y = canvas.height - paddleSize.paddleHeight;
    }
  } else if (upPressed) {
    updatePaddle.y += -7;
    if (updatePaddle.y < 0) {
      updatePaddle.y = 0;
    }
  }
}
// unification de l'appelle des deux fonctions movePaddle dans draw()
export function shiftPaddles() {
  movePaddle(
    paddles.leftPaddle,
    keysEventsPlayers.keysPlayers.keysLeft.leftUpPressed,
    keysEventsPlayers.keysPlayers.keysLeft.leftDownPressed,
  );
  movePaddle(
    paddles.rightPaddle,
    keysEventsPlayers.keysPlayers.keysRight.rightUpPressed,
    keysEventsPlayers.keysPlayers.keysRight.rightDownPressed,
  );
}
// augmentation de la vitesse de la balle
export function updateSpeedBall() {
  if (moveBall.dx < 0) {
    moveBall.dx += -0.01;
  } else {
    moveBall.dx += 0.01;
  }
  if (moveBall.dy > 0) {
    moveBall.dy += 0.01;
  } else {
    moveBall.dy += -0.01;
  }
  return moveBall;
}
