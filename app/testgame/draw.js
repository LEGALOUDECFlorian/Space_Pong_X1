import {
  ctx,
  startBallLocation,
  ballSize,
  paddleSize,
  scores,
} from "./constantes.js";

console.log("draw.js");
// // coordonnées de depart de la balle
// export const startBallLocation = {
//   x: canvas.width / 2,
//   y: canvas.height / 2,
// };
// // infos de la raquette
// export const paddleSize = {
//   paddleHeight: 75,
//   paddleWidth: 10,
// };

// // information sur les raquettes
// export const paddles = {
//   leftPaddle: {
//     x: canvas.width / 6 - paddleSize.paddleHeight,
//     y: (canvas.height - paddleSize.paddleHeight) / 2,
//     color: "#FA40E4",
//   },
//   rightPaddle: {
//     x: canvas.width - (canvas.width / 6) - paddleSize.paddleWidth,
//     y: (canvas.height - paddleSize.paddleHeight) / 2,
//     color: "#4EF349",
//   },
// };

// export const paddles = {
//   leftPaddle: {
//     x: canvas.width / 6 - paddleSize.paddleHeight,
//     y: (canvas.height - paddleSize.paddleHeight) / 2,
//     color: "#FA40E4",
//   },
//   rightPaddle: {
//     x: canvas.width - paddles.leftPaddle.x - paddleSize.paddleWidth,
//     y: (canvas.height - paddleSize.paddleHeight) / 2,
//     color: "#4EF349",
//   },
// };

// // info de la balle
// export const ballSize = {
//   ballRadius: 10,
//   ballColor: "#D742F5",
// };
// peindre la balle
export function drawBall() {
  ctx.beginPath();
  ctx.arc(startBallLocation.x, startBallLocation.y, ballSize.ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballSize.ballColor;
  ctx.fill();
  ctx.closePath();
}
// fonction pour dessiner une raquette
export function drawPaddle(paddle) {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddleSize.paddleWidth, paddleSize.paddleHeight);
  ctx.fillStyle = paddle.color;
  ctx.fill();
  ctx.closePath();
}
// dessiner les scores
export function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Player  1 :", 28, 40);
  ctx.fillText(scores[0], 38, 60);
  ctx.fillText("Player 2 :", 830, 40);
  ctx.fillText(scores[1], 882, 60);
}
// // peindre le jeu
// export function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   drawPaddle(paddles.rightPaddle);
//   drawPaddle(paddles.leftPaddle);
//   drawBall();
//   bounceWall();
//   shiftPaddles();

//   paddleCollision();

//   checkScore();
//   drawScore();
//   if (gameStarted) {
//     startBallLocation.x += moveBall.dx;
//     startBallLocation.y += moveBall.dy;
//   }
//   endPlay();
// }
