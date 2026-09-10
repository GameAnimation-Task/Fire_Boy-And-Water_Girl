import Collision from "./collision.js";
import Platform from "./platform.js";
import Player from "./player.js";

import Button from "./button.js";
import Diamond from "./diamond.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const GAME_WIDTH = 1600;
const GAME_HEIGHT = 900;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const mainMenu = document.getElementById("mainMenu");
const playButton = document.getElementById("playButton");
const instructionsMenu = document.getElementById("instructionsMenu");
const instructionsButton = document.getElementById("instructionsButton");
const okButton = document.getElementById("okButton");

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
  x: 1360,
  y: 35,
  width: 70,
  height: 100,
  frame: 0,
  maxFrame: 17,
};

const waterDoor = {
  x: 1480,
  y: 45,
  width: 70,
  height: 90,
  frame: 0,
  maxFrame: 17,
};
let gameWon = false;
let fireboyAtDoor = false;
let watergirlAtDoor = false;

function drawDoor(door, image, frameCount) {
  if (!image.complete || image.width === 0) return;
  const frameWidth = image.width / frameCount;
  const currentFrame = Math.floor(door.frame);
  ctx.drawImage(
    image,
    frameWidth * door.frame,
    0,
    frameWidth,
    image.height,
    door.x,
    door.y,
    door.width,
    door.height,
  );
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
function updateDoorAnimation(door, playerAtDoor, dt) {
  if (playerAtDoor) {
    door.frame += dt / 100;

    if (door.frame > door.maxFrame) {
      door.frame = door.maxFrame;
    }
  }
}
const buttonImage = new Image();
buttonImage.src = "assest/Buttom1.png";
const redDiamondImage = new Image();
redDiamondImage.src = "assest/diamonds_red.png";

const blueDiamondImage = new Image();
blueDiamondImage.src = "assest/diamonds_blue.png";

const player = new Player(30, 790, 50, 60, fireboyImage, "fire");
const watergirl = new Player(100, 790, 50, 60, watergirlImage, "water");
const redDiamonds = [
  new Diamond(150, 800, 30, 30, redDiamondImage, "red"),
  new Diamond(470, 260, 30, 30, redDiamondImage, "red"),
  new Diamond(1110, 260, 30, 30, redDiamondImage, "red"),
  new Diamond(1130, 820, 30, 30, redDiamondImage, "red"),
];

const blueDiamonds = [
  new Diamond(150, 430, 30, 30, blueDiamondImage, "blue"),
  new Diamond(900, 700, 30, 30, blueDiamondImage, "blue"),
  new Diamond(1250, 820, 30, 30, blueDiamondImage, "blue"),
  new Diamond(180, 760, 30, 30, blueDiamondImage, "blue"),
];

const movingPlatform = new Platform(350, 830, 400, 50);
const movingPlatform2 = new Platform(1360, 820, 240, 50);
movingPlatform.previousY = movingPlatform.y;
movingPlatform2.previousY = movingPlatform2.y;
const button1 = new Button(220, 850, 60, 20, buttonImage);
const button2 = new Button(50, 470, 60, 20, buttonImage);
const button3 = new Button(810, 730, 60, 20, buttonImage);
const button4 = new Button(1160, 270, 60, 20, buttonImage);
const buttons = [button1, button2, button3, button4];
const platforms = [
  new Platform(0, 0, 1600, 35),
  new Platform(1315, 135, 255, 55),
  new Platform(1080, 290, 190, 50),

  new Platform(0, 490, 255, 50),
  new Platform(300, 340, 420, 40),
  new Platform(710, 465, 55, 430),
  new Platform(0, 650, 205, 45),
  new Platform(765, 750, 180, 50),
  new Platform(0, 870, 1600, 30),
];
const fireLake = {
  x: 1120,
  y: 860,
  width: 100,
  height: 20,
  color: "red",
};

const waterLake = {
  x: 1250,
  y: 860,
  width: 100,
  height: 20,
  color: "blue",
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

    if (lake.color === "red" && watergirlCollision) {
      watergirl.visible = false;
    }
    if (lake.color === "blue" && fireboyCollision) {
      player.visible = false;
    }
  }
}

function update(dt) {
  const allPlatforms = [...platforms, movingPlatform, movingPlatform2];

  if (player.visible) {
    Collision.update(player, allPlatforms, keys, GAME_WIDTH, GAME_HEIGHT, dt, {
      left: "ArrowLeft",
      right: "ArrowRight",
      up: "ArrowUp",
    });
  }

  if (watergirl.visible) {
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

  Collision.checkDiamondCollision(player, redDiamonds, "red");

  Collision.checkDiamondCollision(watergirl, blueDiamonds, "blue");
  checkLakeCollision();
}

for (let button of buttons) {
  const fireboyOnButton = Collision.checkButtonCollision(player, button);

  const watergirlOnButton = Collision.checkButtonCollision(watergirl, button);

  button.pressed = fireboyOnButton || watergirlOnButton;
}
updateMovingPlatform(dt);

Collision.checkDiamondCollision(player, redDiamonds, "red");

Collision.checkDiamondCollision(watergirl, blueDiamonds, "blue");

if (!fireboyAtDoor && checkDoorCollision(player, fireDoor)) {
  fireboyAtDoor = true;
}

if (!watergirlAtDoor && checkDoorCollision(watergirl, waterDoor)) {
  watergirlAtDoor = true;
}
updateDoorAnimation(fireDoor, fireboyAtDoor, dt);
updateDoorAnimation(waterDoor, watergirlAtDoor, dt);

const allRedCollected = redDiamonds.every((diamond) => diamond.collected);

const allBlueCollected = blueDiamonds.every((diamond) => diamond.collected);
if (allRedCollected && !fireboyAtDoor && checkDoorCollision(player, fireDoor)) {
  fireboyAtDoor = true;
}

if (
  allBlueCollected &&
  !watergirlAtDoor &&
  checkDoorCollision(watergirl, waterDoor)
) {
  watergirlAtDoor = true;
}

updateDoorAnimation(fireDoor, fireboyAtDoor, dt);

updateDoorAnimation(waterDoor, watergirlAtDoor, dt);

if (fireboyAtDoor && watergirlAtDoor && allRedCollected && allBlueCollected) {
  gameWon = true;
}

function updateMovingPlatform(dt) {
  const oldY1 = movingPlatform.y;

  const buttonForPlatform1 = button1.pressed || button2.pressed;

  const originalY1 = 830;
  const targetY1 = 500;
  const speed1 = 200;

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

  const originalY2 = 820;
  const targetY2 = 300;
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

  ctx.restore();
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
  drawDoor(fireDoor, fireDoorImage, 18);
  drawDoor(waterDoor, waterDoorImage, 18);
  if (gameWon) {
    drawWinScreen();
  }
}

function animate(time) {
  const dt = lastTime ? time - lastTime : 16.67;
  lastTime = time;
  update(dt);
  draw(time);
  if (!gameWon) {
    requestAnimationFrame(animate);
  }
}

instructionsButton.addEventListener("click", function () {
  mainMenu.style.display = "none";
  instructionsMenu.style.display = "flex";
});
okButton.addEventListener("click", function () {
  instructionsMenu.style.display = "none";
  mainMenu.style.display = "flex";
});
playButton.addEventListener("click", function () {
  mainMenu.style.display = "none";
  canvas.style.display = "block";

  requestAnimationFrame(animate);
});
