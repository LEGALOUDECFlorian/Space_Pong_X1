console.log("hello");
// mise en place et definition du canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// infos de la raquette
const paddleHeight = 75;
const paddleWidth = 10;
//position de la raquette sur l'axe Y (verticale)
let startPositionOfRightPaddleY = (canvas.height - paddleHeight) / 2;
let startPositionOfLeftPaddleY = (canvas.height - paddleHeight) / 2;
//position de la raquette sur l'axe X (horizontale)
// raqette gauche
let startPositionOfLeftPaddleX = canvas.width / 6 - paddleHeight;
// raqette droite
let startPositionOfRightPaddleX = canvas.width - startPositionOfLeftPaddleX- paddleWidth;
//info de la balle
const ballRadius = 10;
const ballColor = "	#D742F5";
//coordonnées de depart de la balle
let x = canvas.width / 2;
let y = canvas.height / 2;

//mouvement aléatoire de la balle
function randomStartLuncher() {
  const symboles = "+-";
  const numbers = "23456";
  randomDirection = symboles[Math.floor(Math.random() * symboles.length)];
  randomNumber = parseInt(numbers[Math.floor(Math.random() * 5)]);
  return randomDirection === "+" ? randomNumber : -randomNumber;
  }
//direction du mouvement de la balle
let dx = randomStartLuncher();
let dy = randomStartLuncher();
// let dx = +2;
// let dy = +2;
let rightUpPressed = false;
let rightDownPressed = false;
let leftUpPressed = false;
let leftDownPressed = false;
// gestionnaires d'événements pour le déplacement de la raquette de droite
document.addEventListener("keydown", keyDownHandlerRightPaddle, false);
document.addEventListener("keyup", keyUpHandlerRightPaddle , false);
// gestionnaires d'événements pour le déplacement de la raquette de droite
document.addEventListener("keydown", keyDownHandlerLeftPaddle, false);
document.addEventListener("keyup", keyUpHandlerLeftPaddle , false);

function drawLeftPaddle() {
  ctx.beginPath();
  ctx.rect(
    startPositionOfLeftPaddleX,
    startPositionOfLeftPaddleY,
    paddleWidth,
    paddleHeight
  );
  ctx.fillStyle = "#219B8B";
  ctx.fill();
  ctx.closePath();
}

function drawRightPaddle() {
  ctx.beginPath();
  ctx.rect(
    startPositionOfRightPaddleX,
    startPositionOfRightPaddleY,
    paddleWidth,
    paddleHeight
  );
  ctx.fillStyle = "#84154E";
  ctx.fill();
  ctx.closePath();
}

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
    } else if (e.key == "ArrowDown" ) {
      rightDownPressed = true;
    }// Empêcher le défilement de la page lors de l'utilisation des touches fléchées
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault(); 
    }
  }
  
  function keyUpHandlerRightPaddle(e) {
    if (e.key == "ArrowUp") {
      rightUpPressed = false;
    } else if (e.key == "ArrowDown" ) {
     rightDownPressed = false;
    }
  }
  
  function shifRightPaddle() {
    if (rightDownPressed) {
        startPositionOfRightPaddleY += 7;
        if (startPositionOfRightPaddleY + paddleHeight > canvas.height) {
            startPositionOfRightPaddleY = canvas.height - paddleHeight;
            
        }
      }  else if (rightUpPressed)  {
       startPositionOfRightPaddleY -= 7;
       if (startPositionOfRightPaddleY < 0) {
         startPositionOfRightPaddleY = 0 ;
       }
      }
  }
//fonctions relative au déplacement de la raquette droite
  function keyDownHandlerLeftPaddle(e) {
    if (e.key == "q") {
     leftUpPressed = true;
    } else if (e.key == "w" ) {
      leftDownPressed = true;
    }// Empêcher le défilement de la page lors de l'utilisation des touches fléchées
    if (e.key === "q" || e.key === "w") {
        e.preventDefault(); 
    }
  }
  
  function keyUpHandlerLeftPaddle(e) {
    if (e.key == "q") {
      leftUpPressed = false;
    } else if (e.key == "w" ) {
     leftDownPressed = false;
    }
  }

function shifLeftPaddle() {
    if (leftDownPressed) {
        startPositionOfLeftPaddleY += 7;
        if (startPositionOfLeftPaddleY + paddleHeight > canvas.height) {
            startPositionOfLeftPaddleY = canvas.height - paddleHeight;
            
        }
      }  else if (leftUpPressed)  {
       startPositionOfLeftPaddleY -= 7;
       if (startPositionOfLeftPaddleY < 0) {
         startPositionOfLeftPaddleY = 0 ;
       }
      }
  }

  function collisionDetection() {

  }

//peindre le jeu
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawLeftPaddle();
  drawRightPaddle();
  drawBall();
  collisionDetection();
 
  //rebond de la balle sur le mur inferieur || supérieur
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  } 
  // il y a trop de if j'ai l'impression de tuer des p'tits chats 
//rebond de la balle sur les côtés gauche et droit
if (x + dx > canvas.width - ballRadius || x + dx < 0 + ballRadius) {
    if (y > startPositionOfRightPaddleY && y < startPositionOfRightPaddleY + paddleHeight) {
        dy = -dy; // Rebond sur la raquette droite
    } else if (y > startPositionOfLeftPaddleY && y < startPositionOfLeftPaddleY + paddleHeight) {
        dy = -dy; // Rebond sur la raquette gauche
    }
}

 shifRightPaddle()
  shifLeftPaddle()
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