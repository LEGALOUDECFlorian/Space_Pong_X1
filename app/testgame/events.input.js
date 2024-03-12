console.log("input.js");
// demarrage du jeu
// eslint-disable-next-line no-unused-vars, import/no-mutable-exports
export let gameStarted = false;
// commande de direction des raquettes
export const keysEventsPlayers = {
  keysRight: {
    rightUpPressed: false,
    rightDownPressed: false,
  },
  keysLeft: {
    leftUpPressed: false,
    leftDownPressed: false,
  },
};
export const keyHandler = {
  right: {
    up: "ArrowUp",
    down: "ArrowDown",
  },
  left: {
    up: "q",
    down: "w",
  },
};
export function startGame(e) {
  if (e.key === "g" || e.key === "Enter") {
    gameStarted = true;

    // Supprime les écouteurs d'événements pour éviter de redémarrer le jeu plusieurs fois
    document.removeEventListener("keydown", startGame);
  }
}
// fonctions relative au déplacement de la raquette droite
export function keyDownHandlerRightPaddle(e) {
  if (e.key === keyHandler.right.up) {
    keysEventsPlayers.keysRight.rightUpPressed = true;
  } else if (e.key === keyHandler.right.down) {
    keysEventsPlayers.keysRight.rightDownPressed = true;
  } // Empêche le défilement de la page lors de l'utilisation des touches fléchées
  if (e.key === keyHandler.right.up || e.key === keyHandler.right.down) {
    e.preventDefault();
  }
}

export function keyUpHandlerRightPaddle(e) {
  if (e.key === keyHandler.right.up) {
    keysEventsPlayers.keysRight.rightUpPressed = false;
  } else if (e.key === keyHandler.right.down) {
    keysEventsPlayers.keysRight.rightDownPressed = false;
  }
}

// fonctions relative au déplacement de la raquette gauche
export function keyDownHandlerLeftPaddle(e) {
  if (e.key === keyHandler.left.up) {
    keysEventsPlayers.keysLeft.leftUpPressed = true;
  } else if (e.key === keyHandler.left.down) {
    keysEventsPlayers.keysLeft.leftDownPressed = true;
  } // Empêche le défilement de la page lors de l'utilisation des touches fléchées
  if (e.key === keyHandler.left.up || e.key === keyHandler.left.down) {
    e.preventDefault();
  }
}

export function keyUpHandlerLeftPaddle(e) {
  if (e.key === keyHandler.left.up) {
    keysEventsPlayers.keysLeft.leftUpPressed = false;
  } else if (e.key === keyHandler.left.down) {
    keysEventsPlayers.keysLeft.leftDownPressed = false;
  }
}

if (typeof document !== "undefined") {
  // gestionnaires d'événements pour détecter le début du jeu
  document.addEventListener("keydown", startGame, false);
  // gestionnaires d'événements pour le déplacement de la raquette de droite
  document.addEventListener("keydown", keyDownHandlerRightPaddle, false);
  document.addEventListener("keyup", keyUpHandlerRightPaddle, false);
  // gestionnaires d'événements pour le déplacement de la raquette de droite
  document.addEventListener("keydown", keyDownHandlerLeftPaddle, false);
  document.addEventListener("keyup", keyUpHandlerLeftPaddle, false);
}
