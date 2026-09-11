import Collision from "./collision.js";
import Platform from "./platform.js";
import Player from "./player.js";

import Button from "./button.js";
import Diamond from "./diamond.js";

const gameMusic = new Audio("audio/game-music.mp3");
gameMusic.loop = true;
gameMusic.volume = 0.3;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const GAME_WIDTH = 1600;
const GAME_HEIGHT = 900;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const platformImage1 = new Image();
platformImage1.src = "./assest/Tb1.png";
const platformImage2 = new Image();
platformImage2.src = "./assest/Tb3.png";
const platformImage3 = new Image();
platformImage3.src = "./assest/Tb5.png";
const platformImage4 = new Image();
platformImage4.src = "./assest/Tb4.png";
const platformImage5 = new Image();
platformImage5.src = "./assest/Tb2.png";

const mainMenu = document.getElementById("mainMenu");
const playButton = document.getElementById("playButton");
const instructionsMenu = document.getElementById("instructionsMenu");
const instructionsButton = document.getElementById("instructionsButton");
const okButton = document.getElementById("okButton");
const restartButton = document.getElementById("restartButton");

const fireboyImage = new Image();
fireboyImage.src = "assest/fire.png";
const watergirlImage = new Image();
watergirlImage.src = "assest/wgirl.png";

const fireDoorImage = new Image();
fireDoorImage.src = "assest/fire door1.png";

const waterDoorImage = new Image();
waterDoorImage.src = "assest/water_door1.png";

const backgroundImage = new Image();
backgroundImage.src = "assest/bg.png";
canvas.style.backgroundSize = "cover";
canvas.style.backgroundPosition = "center";

const fireDoor = {
  x: 0,
  y: 60,
  width: 70,
  height: 100,
};
const waterDoor = {
  x: 90,
  y: 60,
  width: 70,
  height: 100,
};

let gameWon = false;
let gameOver = false;
let fireboyAtDoor = false;
let watergirlAtDoor = false;

function drawDoor(door, image) {
  if (!image.complete || image.width === 0) return;
  ctx.drawImage(image, door.x, door.y, door.width, door.height);
}
function checkDoorCollision(player, door) {
  const doorEntrance = {
    x: door.x,
    y: door.y + door.height - 30,
    width: door.width,
    height: 40,
  };
  return (
    player.x < door.x + door.width &&
    player.x + player.width > door.x &&
    player.y < door.y + door.height &&
    player.y + player.height > door.y
  );
}
const buttonImage = new Image();
buttonImage.src = "assest/Buttom1.png";
const redDiamondImage = new Image();
redDiamondImage.src = "assest/diamonds_red.png";

const blueDiamondImage = new Image();
blueDiamondImage.src = "assest/diamonds_blue.png";

const player = new Player(30, 790, 50, 60, fireboyImage, "fire");
const watergirl = new Player(30, 610, 50, 60, watergirlImage, "water");
const redDiamonds = [
  new Diamond(150, 800, 30, 30, redDiamondImage, "red"),
  new Diamond(740, 220, 30, 30, redDiamondImage, "red"),
  new Diamond(1110, 400, 30, 30, redDiamondImage, "red"),
  new Diamond(1130, 820, 30, 30, redDiamondImage, "red"),
];

const blueDiamonds = [
  new Diamond(150, 430, 30, 30, blueDiamondImage, "blue"),
  new Diamond(950, 700, 30, 30, blueDiamondImage, "blue"),
  new Diamond(1250, 820, 30, 30, blueDiamondImage, "blue"),
  new Diamond(180, 700, 30, 30, blueDiamondImage, "blue"),
];

const movingPlatform = new Platform(1400, 455, 205, 40, platformImage1);
const movingPlatform2 = new Platform(1360, 830, 240, 40, platformImage3);

movingPlatform.previousY = movingPlatform.y;
movingPlatform2.previousY = movingPlatform2.y;

const button1 = new Button(700, 435, 60, 20, buttonImage);
const button2 = new Button(1100, 280, 60, 20, buttonImage);
const button3 = new Button(810, 850, 60, 20, buttonImage);
const button4 = new Button(60, 520, 60, 20, buttonImage);
const buttons = [button1, button2, button3, button4];

const platforms = [
  new Platform(0, 0, 1600, 40, platformImage5),
  new Platform(0, 160, 580, 40, platformImage1),
  new Platform(580, 200, 70, 32, platformImage3),
  new Platform(650, 230, 70, 32, platformImage3),
  new Platform(720, 260, 71, 40, platformImage3),
  new Platform(790, 300, 610, 40, platformImage5),
  new Platform(205, 455, 1200, 40, platformImage3),
  new Platform(0, 540, 150, 80, platformImage2),
  new Platform(0, 620, 1360, 40, platformImage5),
  new Platform(0, 745, 490, 35, platformImage4),
  new Platform(0, 870, 1600, 30, platformImage5),
];
const fireLake = {
  x: 1120,
  y: 860,
  width: 80,
  height: 30,
  color: "#6a0902",
};

const waterLake = {
  x: 1250,
  y: 860,
  width: 80,
  height: 30,
  color: "#00008b",
};

const lakes = [fireLake, waterLake];

const keys = {};
const keys2 = {};

window.addEventListener("keydown", function (event) {
  if (
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight" ||
    event.key === "ArrowUp"
  ) {
    keys[event.key] = true;
    event.preventDefault();
  }
  if (
    event.key.toLowerCase() === "a" ||
    event.key.toLowerCase() === "d" ||
    event.key.toLowerCase() === "w" ||
    event.key.toLowerCase() === "s"
  ) {
    keys2[event.key.toLowerCase()] = true;
    event.preventDefault();
  }
});

window.addEventListener("keyup", function (event) {
  if (
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight" ||
    event.key === "ArrowUp"
  ) {
    keys[event.key] = false;
  }

  if (
    event.key.toLowerCase() === "a" ||
    event.key.toLowerCase() === "d" ||
    event.key.toLowerCase() === "w" ||
    event.key.toLowerCase() === "s"
  ) {
    keys2[event.key.toLowerCase()] = false;
  }
});

let lastTime = 0;
function checkLakeCollision() {
  for (let lake of lakes) {
    const fireboyCollision =
      player.x < lake.x + lake.width &&
      player.x + player.width > lake.x &&
      player.y < lake.y + lake.height &&
      player.y + player.height > lake.y;

    const watergirlCollision =
      watergirl.x < lake.x + lake.width &&
      watergirl.x + watergirl.width > lake.x &&
      watergirl.y < lake.y + lake.height &&
      watergirl.y + watergirl.height > lake.y;

    if (lake === fireLake && watergirlCollision) {
      watergirl.visible = false;
      gameOver = true;
      gameMusic.pause();
    }
    if (lake === waterLake && fireboyCollision) {
      player.visible = false;
      gameOver = true;
      gameMusic.pause();
    }
  }
}

function update(dt) {
  const allPlatforms = [...platforms, movingPlatform, movingPlatform2];

  if (player.visible && !fireboyAtDoor) {
    Collision.update(player, allPlatforms, keys, GAME_WIDTH, GAME_HEIGHT, dt, {
      left: "ArrowLeft",
      right: "ArrowRight",
      up: "ArrowUp",
    });
  }

  if (watergirl.visible && !watergirlAtDoor) {
    Collision.update(
      watergirl,
      allPlatforms,
      keys2,
      GAME_WIDTH,
      GAME_HEIGHT,
      dt,
      {
        left: "a",
        right: "d",
        up: "w",
      },
    );
  }

  for (let button of buttons) {
    const fireboyOnButton = Collision.checkButtonCollision(player, button);

    const watergirlOnButton = Collision.checkButtonCollision(watergirl, button);

    button.pressed = fireboyOnButton || watergirlOnButton;
  }
  updateMovingPlatform(dt);

  if (player.visible) {
    Collision.checkDiamondCollision(player, redDiamonds, "red");
  }
  if (watergirl.visible) {
    Collision.checkDiamondCollision(watergirl, blueDiamonds, "blue");
  }
  checkLakeCollision();
  

const allRedCollected = redDiamonds.every(
  (diamond) => diamond.collected
);

const allBlueCollected = blueDiamonds.every(
  (diamond) => diamond.collected
);

if (allRedCollected&&allBlueCollected &&!fireboyAtDoor &&checkDoorCollision(player, fireDoor)) {
  fireboyAtDoor = true;
}
if (allBlueCollected &&allRedCollected&&!watergirlAtDoor &&checkDoorCollision(watergirl, waterDoor)) {
  watergirlAtDoor = true;
}
if (allRedCollected &&allBlueCollected &&fireboyAtDoor &&watergirlAtDoor) {
  gameWon = true;
  gameMusic.pause();
}
}
const originalY1 = 455;
const targetY1 = 300;
const speed1 = 200;

function updateMovingPlatform(dt) {
  const oldY1 = movingPlatform.y;

  const buttonForPlatform1 = button1.pressed || button2.pressed;

  if (buttonForPlatform1) {
    if (movingPlatform.y > targetY1) {
      movingPlatform.y -= (speed1 * dt) / 1000;

      if (movingPlatform.y < targetY1) {
        movingPlatform.y = targetY1;
      }
    }
  } else {
    if (movingPlatform.y < originalY1) {
      movingPlatform.y += (speed1 * dt) / 1000;

      if (movingPlatform.y > originalY1) {
        movingPlatform.y = originalY1;
      }
    }
  }

  const dy1 = movingPlatform.y - oldY1;

  movePlayerWithPlatform(player, movingPlatform, oldY1, dy1);

  movePlayerWithPlatform(watergirl, movingPlatform, oldY1, dy1);

  const oldY2 = movingPlatform2.y;

  const buttonForPlatform2 = button3.pressed || button4.pressed;

  const originalY2 = 830;
  const targetY2 = 620;
  const speed2 = 200;

  if (buttonForPlatform2) {
    if (movingPlatform2.y > targetY2) {
      movingPlatform2.y -= (speed2 * dt) / 1000;

      if (movingPlatform2.y < targetY2) {
        movingPlatform2.y = targetY2;
      }
    }
  } else {
    if (movingPlatform2.y < originalY2) {
      movingPlatform2.y += (speed2 * dt) / 1000;

      if (movingPlatform2.y > originalY2) {
        movingPlatform2.y = originalY2;
      }
    }
  }

  const dy2 = movingPlatform2.y - oldY2;

  movePlayerWithPlatform(player, movingPlatform2, oldY2, dy2);

  movePlayerWithPlatform(watergirl, movingPlatform2, oldY2, dy2);
}
function movePlayerWithPlatform(player, platform, oldY, dy) {
  const horizontalCollision =
    player.x + player.width > platform.x &&
    player.x < platform.x + platform.width;

  const standingOnPlatform = Math.abs(player.y + player.height - oldY) < 8;

  if (horizontalCollision && standingOnPlatform && player.onGround) {
    player.y += dy;

    player.y = platform.y - player.height;

    player.velocityY = 0;

    player.onGround = true;
  }
}

function drawWinScreen() {
  ctx.save();

  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  ctx.font = "bold 70px sans-serif";
  ctx.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2 - 30);

  ctx.font = "28px sans-serif";
  ctx.fillText(
    "Both players reached their doors!",
    canvas.width / 2,
    canvas.height / 2 + 30,
  );
    ctx.font = "28px sans-serif";

  ctx.restore();
   restartButton.style.display = "block";
}

function draw(time) {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  for (let platform of platforms) {
    platform.draw(ctx);
  }
  movingPlatform.draw(ctx);
  movingPlatform2.draw(ctx);
  ctx.fillStyle = "red";
  ctx.fillRect(fireLake.x, fireLake.y, fireLake.width, fireLake.height);

  ctx.fillStyle = "blue";
  ctx.fillRect(waterLake.x, waterLake.y, waterLake.width, waterLake.height);

  for (let button of buttons) {
    button.draw(ctx);
  }
  for (let diamond of redDiamonds) {
    diamond.draw(ctx);
  }

  for (let diamond of blueDiamonds) {
    diamond.draw(ctx);
  }
  player.draw(ctx);
  watergirl.draw(ctx);
  drawDoor(fireDoor, fireDoorImage);
  drawDoor(waterDoor, waterDoorImage);
  if (gameWon) {
    drawWinScreen();
  }
  if (gameOver) {
  drawGameOverScreen();
}
}

function animate(time) {
  const dt = lastTime ? time - lastTime : 16.67;
  lastTime = time;
  update(dt);
  draw(time);
  if (!gameWon&&!gameOver) {
    requestAnimationFrame(animate);
  }
}
function drawGameOverScreen() {
  ctx.save();

  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  ctx.font = "bold 70px sans-serif";

  ctx.fillText(
    "GAME OVER",
    canvas.width / 2,
    canvas.height / 2 - 50
  );

  ctx.font = "28px sans-serif";

  ctx.fillText(
    "You touched the wrong lake!",
    canvas.width / 2,
    canvas.height / 2 + 10
  );

  ctx.restore();

  restartButton.style.display = "block";
}
function restartGame() {
  gameWon = false;
  gameOver = false;

  fireboyAtDoor = false;
  watergirlAtDoor = false;

  restartButton.style.display = "none";

  player.x = 30;
  player.y = 790;
  player.visible = true;
  player.velocityY = 0;
  player.onGround = false;

  watergirl.x = 30;
  watergirl.y = 610;
  watergirl.visible = true;
  watergirl.velocityY = 0;
  watergirl.onGround = false;

  for (let diamond of redDiamonds) {
    diamond.collected = false;
  }

  for (let diamond of blueDiamonds) {
    diamond.collected = false;
  }

  movingPlatform.y = 455;
  movingPlatform2.y = 830;

  movingPlatform.previousY = 455;
  movingPlatform2.previousY = 830;

  for (let button of buttons) {
    button.pressed = false;
  }

  lastTime = 0;

  gameMusic.currentTime = 0;
  gameMusic.play().catch(() => {});

  requestAnimationFrame(animate);
}
instructionsButton.addEventListener("click", function () {
  mainMenu.style.display = "none";
  instructionsMenu.style.display = "flex";
});
okButton.addEventListener("click", function () {
  instructionsMenu.style.display = "none";
  mainMenu.style.display = "flex";
});
restartButton.addEventListener("click", function () {
  restartGame();
});
playButton.addEventListener("click", function () {
  mainMenu.style.display = "none";
  canvas.style.display = "block";
  restartButton.style.display = "none";
  gameMusic.currentTime = 0;
  gameMusic.play().catch(() => {});
  requestAnimationFrame(animate);
});
