import {
  canvas,
  ballSize,
  paddles,
  paddleSize,
  startBallLocation,

} from "./constantes.js";
// import { ballSize, paddleSize } from "./draw.js";
import { moveBall, updateSpeedBall } from "./move.js";

console.log("collision.js");
// gestion de la collision contre les murs
export function bounceWall() {
  // rebond de la balle sur les murs inferieur || supérieur
  if (
    startBallLocation.y + moveBall.dy > canvas.height - ballSize.ballRadius
    || startBallLocation.y + moveBall.dy < ballSize.ballRadius
  ) {
    moveBall.dy = -moveBall.dy;
  }
  // rebond de la balle sur les murs droite || gauche
  // if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
  //  dx = -dx;
  // }
}
// Collision des raquettes
export function paddleLeftCollision() {
  // Collision avec la raquette gauche
  if (

    startBallLocation.x - ballSize.ballRadius < paddles.leftPaddle.x + paddleSize.paddleWidth
        && startBallLocation.x + ballSize.ballRadius > paddles.leftPaddle.x
        && startBallLocation.y > paddles.leftPaddle.y
        && startBallLocation.y < paddles.leftPaddle.y + paddleSize.paddleHeight
  ) {
    moveBall.dx = -moveBall.dx; // Inverse la direction horizontale
    updateSpeedBall(moveBall.dx, moveBall.dy);
    if (
      startBallLocation.y - ballSize.ballRadius < paddles.leftPaddle.y + paddleSize.paddleHeight
          && startBallLocation.y + ballSize.ballRadius > paddles.leftPaddle.y
          && startBallLocation.x > paddles.leftPaddle.x
          && startBallLocation.x < paddles.leftPaddle.x + paddleSize.paddleWidth
    ) {
      moveBall.dy = -moveBall.dy; // Inverse la direction verticale
      console.log("gauche 2");
    }
  }
}
export function paddleRightCollision() {
  // Collision avec la raquette droite
  if (
    startBallLocation.x + ballSize.ballRadius > paddles.rightPaddle.x
        && startBallLocation.x - ballSize.ballRadius < paddles.rightPaddle.x
           + paddleSize.paddleWidth
        && startBallLocation.y > paddles.rightPaddle.y
        && startBallLocation.y < paddles.rightPaddle.y + paddleSize.paddleHeight
  ) {
    moveBall.dx = -moveBall.dx; // Inverse la direction horizontale

    updateSpeedBall(moveBall.dx, moveBall.dy);
    if (
      startBallLocation.y + ballSize.ballRadius > paddles.rightPaddle.y
            && startBallLocation.y - ballSize.ballRadius < paddles.rightPaddle.y
               + paddleSize.paddleHeight
            && startBallLocation.x > paddles.rightPaddle.x
            && startBallLocation.x < paddles.rightPaddle.x + paddleSize.paddleWidth
    ) {
      moveBall.dy = -moveBall.dy; // Inverse la direction verticale

      updateSpeedBall(moveBall.dx, moveBall.dy);
    }
  }
}
export function paddleCollision() {
  paddleLeftCollision();
  paddleRightCollision();
}
