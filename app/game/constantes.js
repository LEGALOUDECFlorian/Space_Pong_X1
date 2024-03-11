// mise en place et definition du canvas
export const canvas = document.getElementById("myCanvas");
export const ctx = canvas.getContext("2d");
// score
export const scores = [0, 0];
// info de la balle
export const ballSize = {
  ballRadius: 10,
  ballColor: "#D742F5",
};
// coordonnées de depart de la balle
export const startBallLocation = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
  // taille d'une raquette
export const paddleSize = {
  paddleHeight: 75,
  paddleWidth: 10,
};
// information sur les raquettes
export const paddles = {
  leftPaddle: {
    x: canvas.width / 6 - paddleSize.paddleHeight,
    y: (canvas.height - paddleSize.paddleHeight) / 2,
    color: "#FA40E4",
  },
  rightPaddle: {
    x: canvas.width - (canvas.width / 6) - paddleSize.paddleWidth,
    y: (canvas.height - paddleSize.paddleHeight) / 2,
    color: "#4EF349",
  },
};
