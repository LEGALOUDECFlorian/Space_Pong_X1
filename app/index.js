// import { paddleCollision } from "./modules/paddles/paddleRight";
console.log("hello");
// mise en place et definition du canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// infos de la raquette
const paddleHeight = 75;
const paddleWidth = 10;
// information sur les raquettes
const leftPaddle = {
  x : canvas.width / 6 - paddleHeight,
  y : (canvas.height - paddleHeight) / 2,
  color : "#FA40E4",
}
const rightPaddle = {
  x : canvas.width - leftPaddle.x - paddleWidth,
  y : (canvas.height - paddleHeight) / 2,
  color : "#4EF349",
}
const paddles = [leftPaddle, rightPaddle];

//info de la balle
const ballRadius = 10;
const ballColor = "	#D742F5";
//coordonnées de depart de la balle
let x = canvas.width / 2;
let y = canvas.height / 2;

//mouvement aléatoire de la balle au lancement du jeu
function randomStartLuncher() {
  const symboles = "+-";
  const numbers = "234";
  randomDirection = symboles[Math.floor(Math.random() * symboles.length)];
  randomNumber = parseInt(numbers[Math.floor(Math.random() * 3)]);
  return randomDirection === "+" ? randomNumber : -randomNumber;
}
//initialisation du score
const score = [0, 0];
let leftScore = 0;
let rightScore = 0;

//direction du mouvement de la balle
let dx = randomStartLuncher();
let dy = randomStartLuncher();
// let dx = 2;
// let dy = -2;
let rightUpPressed = false;
let rightDownPressed = false;
let leftUpPressed = false;
let leftDownPressed = false;
// gestionnaires d'événements pour le déplacement de la raquette de droite
document.addEventListener("keydown", keyDownHandlerRightPaddle, false);
document.addEventListener("keyup", keyUpHandlerRightPaddle, false);
// gestionnaires d'événements pour le déplacement de la raquette de droite
document.addEventListener("keydown", keyDownHandlerLeftPaddle, false);
document.addEventListener("keyup", keyUpHandlerLeftPaddle, false);
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
//fonctions relative au déplacement de la raquette droite
function keyDownHandlerRightPaddle(e) {
  if (e.key == "ArrowUp") {
    rightUpPressed = true;
  } else if (e.key == "ArrowDown") {
    rightDownPressed = true;
  } // Empêcher le défilement de la page lors de l'utilisation des touches fléchées
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

//fonctions relative au déplacement de la raquette droite
function keyDownHandlerLeftPaddle(e) {
  if (e.key == "q") {
    leftUpPressed = true;
  } else if (e.key == "w") {
    leftDownPressed = true;
  } // Empêcher le défilement de la page lors de l'utilisation des touches fléchées
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
  } else if(upPressed) {
    paddle.y += -7;
    if (paddle.y <0) {
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
      x - ballRadius < leftPaddle.x + paddleWidth &&
      x + ballRadius > leftPaddle.x &&
      y > leftPaddle.y &&
      y < leftPaddle.y + paddleHeight
    ) {
      dx = -dx; // Inverser la direction horizontale
      if (
        y - ballRadius < leftPaddle.y + paddleHeight &&
        y + ballRadius > leftPaddle.y &&
        x > leftPaddle.x &&
        x < leftPaddle.x + paddleWidth
      ) {
        dy = -dy; // Inverser la direction verticale
        
      }
    }
}
function paddleRightCollision() {
  // Collision avec la raquette droite
  if (
      x + ballRadius > rightPaddle.x &&
      x - ballRadius < rightPaddle.x + paddleWidth &&
      y > rightPaddle.y &&
      y < rightPaddle.y + paddleHeight
  ) {
      dx = -dx; // Inverser la direction horizontale
      if (
          y + ballRadius > rightPaddle.y &&
          y - ballRadius < rightPaddle.y + paddleHeight &&
          x > rightPaddle.x &&
          x < rightPaddle.x + paddleWidth
      ) {
          dy = -dy; // Inverser la direction verticale
      }
  }
}
function paddleCollision() {
  paddleLeftCollision()
  paddleRightCollision()
  
}




function bounceWall() {
 //rebond de la balle sur les murs inferieur || supérieur
 if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
  dy = -dy;
}
//rebond de la balle sur les murs droite || gauche
// if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
//  dx = -dx;
// }
}

function resetBall() {
  x = canvas.width / 2;
  y = canvas.height / 2;
  dx = randomStartLuncher();
  dy = randomStartLuncher();
}

function scorePlayerLeft() {
  if (x + dx < ballRadius) {
    rightScore += 1;
   resetBall();
  }

}

function scorePlayerRight() {
  if (x + dx > canvas.width - ballRadius ) {
    leftScore += 1;
   resetBall();
  }

}

function scoreGame() {
  scorePlayerLeft()
  scorePlayerRight()
}

function drawScorePlayerLeft() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Player  1 : ", 28, 40);
  ctx.fillText(leftScore, 38, 60)
}

function drawScorePlayerRight() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Player 2 :", 830, 40);
  ctx.fillText(rightScore, 882, 60)
}

function drawScore() {
  drawScorePlayerLeft();
  drawScorePlayerRight()
}
// truc pour faire des essaies
function drawtips() {
  

     // créer un nouvel objet image à utiliser comme modèle
  var img = new Image();
  img.src = "https://c4.wallpaperflare.com/wallpaper/796/698/345/artistic-pixel-art-8-bit-wallpaper-preview.jpg";
  img.onload = function () {
    // créer le modèle
    var ptrn = ctx.createPattern(img, "repeat");
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, 920, 640);
}
 
}




//peindre le jeu
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // drawLeftPaddle();
  // drawRightPaddle();
  drawPaddle(rightPaddle);
  drawPaddle(leftPaddle);
  
  drawBall();
 
  bounceWall();
  shiftPaddles();
  paddleCollision();

  drawScore()
  scoreGame()
 

  // shifRightPaddle();
  // shifLeftPaddle();
  x += dx;
  y += dy;
}

const interval = setInterval(draw, 10);

//possibilité d'ajouter un game over
// else if (x + dx > canvas.width - ballRadius|| x + dx < 0 - ballRadius) {
//     alert("GAME OVER");
//     document.location.reload();
//     clearInterval(interval); // Needed for Chrome to end game
//   }
