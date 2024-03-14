/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

const canvas = document.getElementById("myCanvas");
const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("closeModal");

// Lancement de la fonction qui vérifie la taille de l'écran au chargement de la page
checkScreenSize();

// Vérifie la taille de l'écran lors du redimensionnement de la fenêtre
window.addEventListener("resize", checkScreenSize);

// Fonction qui vérifie la taille de l'écran et afficher/masquer la modale et le canvas
function checkScreenSize() {
  if (window.innerWidth < 920) {
    // Masque le canvas et afficher la modale
    canvas.classList.add("hidden");
    modal.classList.remove("hidden");
  } else {
    // Affiche le canvas et masquer la modale
    canvas.classList.remove("hidden");
    modal.classList.add("hidden");
  }
}

// Ferme la modale lorsque l'utilisateur clique sur le bouton de fermeture
closeModalButton.addEventListener("click", () => {
  window.history.back(); // Revenir à la page précédente
});

// Initialisation du canvas sur la page html
// const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// demarrage du jeu
let gameStarted = false;

// Variables pour le temp total écoulé pendant la parti
let startTime;
let totalElapsedTime = 0;

// infos de la raquette
const paddleHeight = (12.8 / 100) * canvas.height;
const paddleWidth = (1.5 / 100) * canvas.width;
// infos sur les raquettes
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

// info de la balle
const ballRadius = (1.2 / 100) * canvas.width;
const ballColor = "#D742F5";
// coordonnées de depart de la balle
let x = canvas.width / 2;
let y = canvas.height / 2;

// mouvement aléatoire de la balle au lancement du jeu
function randomStartLuncher() {
  const symboles = "+-";
  const numbers = "234";
  const randomDirection = symboles[Math.floor(Math.random() * symboles.length)];
  const randomNumber = parseInt(numbers[Math.floor(Math.random() * 3)], 10);
  return randomDirection === "+" ? randomNumber : -randomNumber;
}
// initialisation du score
const scores = [0, 0];

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

// ==== START GAME ===
const interval = setInterval(draw, 10);
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
  // dx = -dx;
  // }
}
// fonctions relative au déplacement de la raquette droite
function keyDownHandlerRightPaddle(e) {
  if (e.key === "ArrowUp") {
    rightUpPressed = true;
  } else if (e.key === "ArrowDown") {
    rightDownPressed = true;
  } // Empêche le défilement de la page lors de l'utilisation des touches fléchées
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
  }
}

function keyUpHandlerRightPaddle(e) {
  if (e.key === "ArrowUp") {
    rightUpPressed = false;
  } else if (e.key === "ArrowDown") {
    rightDownPressed = false;
  }
}

// fonctions relative au déplacement de la raquette gauche
function keyDownHandlerLeftPaddle(e) {
  if (e.key === "q") {
    leftUpPressed = true;
  } else if (e.key === "w") {
    leftDownPressed = true;
  } // Empêche le défilement de la page lors de l'utilisation des touches fléchées
  if (e.key === "q" || e.key === "w") {
    e.preventDefault();
  }
}

function keyUpHandlerLeftPaddle(e) {
  if (e.key === "q") {
    leftUpPressed = false;
  } else if (e.key === "w") {
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
    if (
      y + ballRadius > rightPaddle.y
      && y - ballRadius < rightPaddle.y + paddleHeight
      && x > rightPaddle.x
      && x < rightPaddle.x + paddleWidth
    ) {
      moveBall.dy = -moveBall.dy; // Inverser la direction verticale
    }
  }
}
function paddleCollision() {
  paddleLeftCollision();
  paddleRightCollision();
}

// Fonctions de retour à zero
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
  startTime = null; // Réinitialisez startTime
}

function checkScore() {
  if (scores[0] === 5 || scores[1] === 5) {
    // Réinitialiser le temps écoulé total
    totalElapsedTime = 0;
  }
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
  ctx.fillStyle = "#eee";
  ctx.fillText("Player  1 :", 28, 40);
  ctx.fillText(scores[0], 38, 60);
  ctx.fillText("Player 2 :", 830, 40);
  ctx.fillText(scores[1], 874, 60);
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

// Fonction pour formater le temps en minutes, secondes et millisecondes
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const milliseconds = Math.floor((seconds % 1) * 100).toString().padStart(2, "0");
  const formattedTime = `${minutes}m${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}s${milliseconds}`;
  return formattedTime;
}
// Fonction pour afficher le compteur central
function drawCenterCounter() {
  const formattedTime = formatTime(totalElapsedTime);
  ctx.beginPath();
  ctx.font = "24px Arial";
  ctx.fillStyle = "#eee";
  const text1 = "Time:";
  const text2 = `${formattedTime}`;

  const text1Width = ctx.measureText(text1).width;
  const text2Width = ctx.measureText(text2).width;

  // Position verticale des textes
  const text1Y = 40;
  const text2Y = 65;

  // Position horizontale des textes sur le canva
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
    const elapsedTimeSinceLastUpdate = (currentTime - startTime) / 1000;
    totalElapsedTime += elapsedTimeSinceLastUpdate; // Mettre à jour le temps écoulé total
    startTime = currentTime;
  }
}

// Fonction pour obtenir les meilleurs scores côté client
async function getHighScoresFromMongoDB() {
  try {
    const response = await fetch("/highscores");
    const highScores = await response.json();
    return highScores;
  } catch (error) {
    console.error("Error getting high scores:", error);
    return [];
  }
}

// Fonction pour ajouter le score côté client
async function addScoreToMongoDB(userData) {
  try {
    const response = await fetch("/highscores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      console.log("Score added successfully.");
    } else {
      console.error("Error adding score:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding score:", error);
  }
}

// fin de parti
function endPlay() {
  if (scores[0] === 1 || scores[1] === 1) {
    clearInterval(interval);
    const formattedTime = formatTime(totalElapsedTime);
    const playerText = scores[0] === 5 ? "Player 1" : "Player 2";
    const response = confirm(`${playerText}\n WIN in ${formattedTime}!\n Do you want to enter your nickname in the high score table?`);
    if (response === true) {
      const userName = prompt("Your nickname here");
      const userData = {
        nickname: userName,
        time: formattedTime,
      };
      // Ajoute le score à MongoDB
      addScoreToMongoDB(userData)
        .then(() => {
          alert("Score added successfully!");

          // Récupère les meilleurs scores après l'ajout du nouveau score
          return getHighScoresFromMongoDB();
        })
        .then((bestScores) => {
          // Formate les scores récupérés pour l'affichage de ceux-ci
          const bestScoresText = bestScores.map((score, index) => `${index + 1}. ${score.nickname} - ${score.time}`).join("\n");

          // Affiche les meilleurs scores dans une alerte
          alert(`High Scores:\n${bestScoresText}`);

          // Recharge la page
          document.location.reload();
        })
        .catch((error) => {
          alert(error);
          document.location.reload();
        });
    } else {
      document.location.reload();
    }
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

  checkScore();
  drawScore();
  updateElapsedTime(); // Mettre à jour le temps écoulé à chaque frame
  drawCenterCounter();
  if (gameStarted) {
    x += moveBall.dx;
    y += moveBall.dy;
  }
  endPlay();
}
