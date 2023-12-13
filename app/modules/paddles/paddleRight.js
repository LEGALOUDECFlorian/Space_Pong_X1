const ballRadius = 10;
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
let startPositionOfRightPaddleX =
  canvas.width - startPositionOfLeftPaddleX - paddleWidth;
let dx = 2;
let dy = -2;
let x = canvas.width / 2;
let y = canvas.height / 2;
  function paddleLeftCollision() {
    // Collision avec la raquette gauche
    if (
        x - ballRadius < startPositionOfLeftPaddleX + paddleWidth &&
        x + ballRadius > startPositionOfLeftPaddleX &&
        y > startPositionOfLeftPaddleY &&
        y < startPositionOfLeftPaddleY + paddleHeight
      ) {
        dx = -dx; // Inverser la direction horizontale
        if (
          y - ballRadius < startPositionOfLeftPaddleY + paddleHeight &&
          y + ballRadius > startPositionOfLeftPaddleY &&
          x > startPositionOfLeftPaddleX &&
          x < startPositionOfLeftPaddleX + paddleWidth
        ) {
          dy = -dy; // Inverser la direction verticale
          
        }
      }
  }

  function paddleRightCollision() {
      // Collision avec la raquette droite
      if (
        x + ballRadius > startPositionOfRightPaddleX &&
        x - ballRadius < startPositionOfRightPaddleX + paddleWidth &&
        y > startPositionOfRightPaddleY &&
        y < startPositionOfRightPaddleY + paddleHeight
      ) {
        dx = -dx; // Inverser la direction horizontale
        if (
          y + ballRadius < startPositionOfLeftPaddleY + paddleHeight &&
          y - ballRadius > startPositionOfLeftPaddleY &&
          x > startPositionOfLeftPaddleX &&
          x < startPositionOfLeftPaddleX + paddleWidth
        ) {
          dy = -dy; // Inverser la direction verticale
          
        }
      }
  } 

  function paddleCollision() {
    paddleLeftCollision()
    paddleRightCollision()
    
  }

  modules.exports = paddleCollision;