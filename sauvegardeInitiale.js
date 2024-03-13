console.log("hello");
// mise en place et definition du canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// demarrage du jeu
let gameStarted = false;
/// //////////////////
// Variables pour les temps totaux écoulés par les joueurs
let startTime;
let totalElapsedTime = 0;
/// ///////////////////

// infos de la raquette
const paddleHeight = 75;
const paddleWidth = 10;
// information sur les raquettes
const leftPaddle = {
  x: canvas.width / 6 - paddleHeight,
  y: (canvas.height - paddleHeight) / 2,
  color: "#FA40E4",
};
const rightPaddle = {
  x: canvas.width - leftPaddle.x - paddleWidth,
  y: (canvas.height - paddleHeight) / 2,
  color: "#4EF349",
};
// const paddles = [leftPaddle, rightPaddle];

// info de la balle
const ballRadius = 10;
const ballColor = "#D742F5";
// coordonnées de depart de la balle
let x = canvas.width / 2;
let y = canvas.height / 2;

// mouvement aléatoire de la balle au lancement du jeu
function randomStartLuncher() {
  const symboles = "+-";
  const numbers = "234";
  randomDirection = symboles[Math.floor(Math.random() * symboles.length)];
  randomNumber = parseInt(numbers[Math.floor(Math.random() * 3)]);
  return randomDirection === "+" ? randomNumber : -randomNumber;
}
// initialisation du score
const scores = [0, 0];
// let leftScore = 0;
// let rightScore = 0;

// direction du mouvement de la balle

const moveBall = {
  dx: randomStartLuncher(),
  dy: randomStartLuncher(),
};
// let dx = 2;
// let dy = -2;
let rightUpPressed = false;
let rightDownPressed = false;
let leftUpPressed = false;
let leftDownPressed = false;
// gestionnaires d'événements pour détecter le début du jeu
document.addEventListener("keydown", startGame, false);
// gestionnaires d'événements pour le déplacement de la raquette de droite
document.addEventListener("keydown", keyDownHandlerRightPaddle, false);
document.addEventListener("keyup", keyUpHandlerRightPaddle, false);
// gestionnaires d'événements pour le déplacement de la raquette de droite
document.addEventListener("keydown", keyDownHandlerLeftPaddle, false);
document.addEventListener("keyup", keyUpHandlerLeftPaddle, false);

// demarrage du jeu
function startGame(e) {
  if (e.key === "g" || e.key === "Enter") {
    gameStarted = true;
    startTime = new Date().getTime();
  }
}

// augmentation de la vitesse de la balle
function updateSpeedBall() {
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
// gestion de la collision contre les murs
function bounceWall() {
  // rebond de la balle sur les murs inferieur || supérieur
  if (y + moveBall.dy > canvas.height - ballRadius || y + moveBall.dy < ballRadius) {
    moveBall.dy = -moveBall.dy;
  }
  // rebond de la balle sur les murs droite || gauche
  // if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
  //  dx = -dx;
  // }
}
// fonctions relative au déplacement de la raquette droite
function keyDownHandlerRightPaddle(e) {
  if (e.key == "ArrowUp") {
    rightUpPressed = true;
  } else if (e.key == "ArrowDown") {
    rightDownPressed = true;
  } // Empêche le défilement de la page lors de l'utilisation des touches fléchées
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
  }
}

function keyUpHandlerRightPaddle(e) {
  if (e.key == "ArrowUp") {
    rightUpPressed = false;
  } else if (e.key == "ArrowDown") {
    rightDownPressed = false;
  }
}

// fonctions relative au déplacement de la raquette gauche
function keyDownHandlerLeftPaddle(e) {
  if (e.key == "q") {
    leftUpPressed = true;
  } else if (e.key == "w") {
    leftDownPressed = true;
  } // Empêche le défilement de la page lors de l'utilisation des touches fléchées
  if (e.key === "q" || e.key === "w") {
    e.preventDefault();
  }
}

function keyUpHandlerLeftPaddle(e) {
  if (e.key == "q") {
    leftUpPressed = false;
  } else if (e.key == "w") {
    leftDownPressed = false;
  }
}

// mouvement des raquettes dans le canvas
function movePaddle(paddle, upPressed, downPressed) {
  if (downPressed) {
    paddle.y += 7;
    if (paddle.y + paddleHeight > canvas.height) {
      paddle.y = canvas.height - paddleHeight;
    }
  } else if (upPressed) {
    paddle.y += -7;
    if (paddle.y < 0) {
      paddle.y = 0;
    }
  }
}
// unification de l'appelle des deux fonctions movePaddle dans draw()
function shiftPaddles() {
  movePaddle(leftPaddle, leftUpPressed, leftDownPressed);
  movePaddle(rightPaddle, rightUpPressed, rightDownPressed);
}

// Collision des raquettes
function paddleLeftCollision() {
  // Collision avec la raquette gauche
  if (

    x - ballRadius < leftPaddle.x + paddleWidth
      && x + ballRadius > leftPaddle.x
      && y > leftPaddle.y
      && y < leftPaddle.y + paddleHeight
  ) {
    moveBall.dx = -moveBall.dx; // Inverse la direction horizontale
    updateSpeedBall(moveBall.dx, moveBall.dy);
    if (
      y - ballRadius < leftPaddle.y + paddleHeight
        && y + ballRadius > leftPaddle.y
        && x > leftPaddle.x
        && x < leftPaddle.x + paddleWidth
    ) {
      moveBall.dy = -moveBall.dy; // Inverse la direction verticale
      console.log("gauche 2");
    }
  }
}
function paddleRightCollision() {
  // Collision avec la raquette droite
  if (
    x + ballRadius > rightPaddle.x
      && x - ballRadius < rightPaddle.x + paddleWidth
      && y > rightPaddle.y
      && y < rightPaddle.y + paddleHeight
  ) {
    moveBall.dx = -moveBall.dx; // Inverse la direction horizontale

    updateSpeedBall(moveBall.dx, moveBall.dy);
    console.log(updateSpeedBall(`droite${moveBall.dx}`, moveBall.dy));
    console.log(moveBall.dx);
    console.log("droite 1");
    if (
      y + ballRadius > rightPaddle.y
          && y - ballRadius < rightPaddle.y + paddleHeight
          && x > rightPaddle.x
          && x < rightPaddle.x + paddleWidth
    ) {
      moveBall.dy = -moveBall.dy; // Inverser la direction verticale

      updateSpeedBall(moveBall.dx, moveBall.dy);
    }
  }
}
function paddleCollision() {
  paddleLeftCollision();
  paddleRightCollision();
}

// function ajustingCollision(paddle) { // Ajustez la nouvelle direction
//   horizontale de la balle en fonction de l'endroit où la balle a frappé la
//   raquette let relativeIntersectY = y - (paddle.y + paddleWidth / 2); let
//   normalizedRelativeIntersectY = relativeIntersectY / (paddleHeight / 2);
//   moveBall.dx = -moveBall.dx; // Inversez la direction horizontale

//   frappé la raquette moveBall.dy = normalizedRelativeIntersectY * 4; //
//   Ajustez le facteur selon vos besoins
// }

// function addCollision() {
//   ajustingCollision (leftPaddle);
//   ajustingCollision (rightPaddle);
// }

// score
function resetPaddles() {
  leftPaddle.x = canvas.width / 6 - paddleHeight;
  leftPaddle.y = (canvas.height - paddleHeight) / 2;

  rightPaddle.x = canvas.width - leftPaddle.x - paddleWidth;
  rightPaddle.y = (canvas.height - paddleHeight) / 2;
}

function resetBall() {
  x = canvas.width / 2;
  y = canvas.height / 2;
  moveBall.dx = randomStartLuncher();
  moveBall.dy = randomStartLuncher();
}

function updateScore(player) {
  scores[player] += 1;
  gameStarted = false;
}

function checkScore() {
  if (x + moveBall.dx < ballRadius) {
    updateScore(1);
    resetBall();
    resetPaddles();
  } else if (x + moveBall.dx > canvas.width - ballRadius) {
    updateScore(0);
    resetBall();
    resetPaddles();
  }
}
// dessiner les scores
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("Player  1 :", 28, 40);
  ctx.fillText(scores[0], 38, 60);
  ctx.fillText("Player 2 :", 830, 40);
  ctx.fillText(scores[1], 874, 60);
}
// fin de parti
function endPlay() {
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
// truc pour faire des essaies
// function drawtips() {
//   // créer un nouvel objet image à utiliser comme modèle
//   const img = new Image();
//   img.src = "https://c4.wallpaperflare.com/wallpaper/796/698/345/artistic-pixel-art-8-bit-wallpaper-preview.jpg";
//   img.onload = function () {
//     // créer le modèle
//     const ptrn = ctx.createPattern(img, "repeat");
//     ctx.fillStyle = ptrn;
//     ctx.fillRect(0, 0, 920, 640);
//   };
// }

// fonction pour dessiner une raquette
function drawPaddle(paddle) {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddleWidth, paddleHeight);
  ctx.fillStyle = paddle.color;
  ctx.fill();
  ctx.closePath();
}
// peindre la balle
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}
// function drawPaddle(paddle) {
//   ctx.beginPath();
//   ctx.rect(paddle.x, paddle.y, paddleWidth, paddleHeight);
//   ctx.fillStyle = paddle.color;
//   ctx.fill();
//   ctx.closePath();
// }
// function drawScore() {
//   ctx.font = "16px Arial";
//   ctx.fillStyle = "#0095DD";
//   ctx.fillText("Player  1 :", 28, 40);
//   ctx.fillText(scores[0], 38, 60);
//   ctx.fillText("Player 2 :", 830, 40);
//   ctx.fillText(scores[1], 882, 60);
// }
// Fonction pour formater le temps en minutes, secondes et millisecondes
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedTime = `${minutes}m${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}s`;
  return formattedTime;
}
// Fonction pour afficher le compteur central
function drawCenterCounter() {
  ctx.beginPath();
  ctx.font = "24px Arial";
  ctx.fillStyle = "#000";

  let text1;
  let text2;
  if (!gameStarted) {
    text1 = "Time:";
    text2 = "0m00s00ms";
  } else {
    const currentTime = new Date().getTime();
    totalElapsedTime = (currentTime - startTime) / 1000; // Convertir en secondes
    const milliseconds = Math.floor((totalElapsedTime * 1000) % 100); // Récupérer les millisecondes
    const formattedTime = `${formatTime(totalElapsedTime)}${milliseconds}ms`;
    text1 = "Time:";
    text2 = `${formattedTime}`;
  }

  const text1Width = ctx.measureText(text1).width;
  const text2Width = ctx.measureText(text2).width;

  // Position verticale des textes
  const text1Y = 40;
  const text2Y = 65;

  // Centrer horizontalement les textes
  const text1X = canvas.width / 2 - text1Width / 2;
  const text2X = canvas.width / 2 - text2Width / 2;

  ctx.fillText(text1, text1X, text1Y);
  ctx.fillText(text2, text2X, text2Y);

  ctx.closePath();
}
// Fonction pour mettre à jour le temps écoulé
function updateElapsedTime() {
  if (gameStarted) {
    const currentTime = new Date().getTime();
    totalElapsedTime = (currentTime - startTime) / 1000; // Convertir en secondes
}
}

// peindre le jeu
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPaddle(rightPaddle);
  drawPaddle(leftPaddle);
  drawBall();
  bounceWall();
  shiftPaddles();

  paddleCollision();
  // addCollision();
  checkScore();
  drawScore();
  updateElapsedTime(); // Mettre à jour le temps écoulé à chaque frame
  drawCenterCounter(); // Afficher le compteur central
  if (gameStarted) {
    x += moveBall.dx;
    y += moveBall.dy;
  }
  endPlay();
  // x += moveBall.dx;
  // y += moveBall.dy;
}

const interval = setInterval(draw, 10);

// // possibilité d'ajouter un game over
// // else if (x + dx > canvas.width - ballRadius|| x + dx < 0 - ballRadius) {
// //     alert("GAME OVER");
// //     document.location.reload();
// //     clearInterval(interval); // Needed for Chrome to end game
// //   }
// // let dx = randomStartLuncher();
// // let dy = randomStartLuncher();

