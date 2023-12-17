// import { paddleCollision } from "./modules/paddles/paddleRight";
console.log("hello");
// mise en place et definition du canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// demarrage du jeu
let gameStarted = false;
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
const scores = [0, 0];
// let leftScore = 0;
// let rightScore = 0;

//direction du mouvement de la balle
let dx = randomStartLuncher();
let dy = randomStartLuncher();
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
//demarrage du jeu
function startGame(e) {
  if (e.key === "g" || e.key === "Enter") {
    gameStarted = true ;

     // Supprimez les écouteurs d'événements pour éviter de redémarrer le jeu plusieurs fois
    // document.removeEventListener("keydown", startGame);
  }
}
function updateSpeedBall() {
  dx += 0.1;
  dy += -0.1;
  
}
// gestion de la collision contre les murs
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

//fonctions relative au déplacement de la raquette gauche
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
        updateSpeedBall()
        
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
          updateSpeedBall()
      }
  }
}
function paddleCollision() {
  paddleLeftCollision()
  paddleRightCollision()
  
}

// function ajustingCollision(paddle) {
//   // Ajustez la nouvelle direction horizontale de la balle en fonction de l'endroit où la balle a frappé la raquette
//   let relativeIntersectY = y - (paddle.y + paddleWidth / 2);
//   let normalizedRelativeIntersectY = relativeIntersectY / (paddleHeight / 2);
//   dx = -dx; // Inversez la direction horizontale

//   // Ajustez la direction verticale en fonction de l'endroit où la balle a frappé la raquette
//   dy = normalizedRelativeIntersectY * 4; // Ajustez le facteur selon vos besoins
// }

// function addCollision() {
//   ajustingCollision (leftPaddle);
//   ajustingCollision (rightPaddle);
// }

function resetPaddles() {
  leftPaddle.x = canvas.width / 6 - paddleHeight;
  leftPaddle.y = (canvas.height - paddleHeight) / 2;
  
  rightPaddle.x = canvas.width - leftPaddle.x - paddleWidth;
  rightPaddle.y = (canvas.height - paddleHeight) / 2;
}



function resetBall() {
  x = canvas.width / 2;
  y = canvas.height / 2;
  dx = randomStartLuncher();
  dy = randomStartLuncher();
}

function updateScore(player) {
  scores[player] += 1;
  gameStarted = false ;
}

function checkScore() {
  if (x + dx < ballRadius) {
    updateScore(1);
    resetBall(); 
    resetPaddles()
  } else if (x + dx > canvas.width - ballRadius ) {
    updateScore(0);
    resetBall(); 
    resetPaddles()
  } 
}
// dessiner les scores
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Player  1 :", 28, 40);
  ctx.fillText(scores[0], 38, 60)
  ctx.fillText("Player 2 :", 830, 40);
  ctx.fillText(scores[1], 882, 60)
}
//fin de parti
function endPlay() {
 
  if (scores[0] === 5) {
    alert("Player 1 \n WIN !")
    document.location.reload();
            clearInterval(interval); //
  }
  if (scores[1] === 5) {
    alert("Player 2 \n WIN !")
    document.location.reload();
            clearInterval(interval); //
  }
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




//peindre le jeu
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPaddle(rightPaddle);
  drawPaddle(leftPaddle);
  drawBall();
  bounceWall();
  shiftPaddles();
  paddleCollision();
  addCollision();
  checkScore();
  drawScore();
  if (gameStarted) {
    x += dx;
    y += dy;
  } 
  endPlay() 
  // x += dx;
  // y += dy;
}

const interval = setInterval(draw, 10);

//possibilité d'ajouter un game over
// else if (x + dx > canvas.width - ballRadius|| x + dx < 0 - ballRadius) {
//     alert("GAME OVER");
//     document.location.reload();
//     clearInterval(interval); // Needed for Chrome to end game
//   }
// let dx = randomStartLuncher();
// let dy = randomStartLuncher();