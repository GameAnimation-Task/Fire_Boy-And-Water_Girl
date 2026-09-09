/*import Collision from "./collision.js";
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
console.log("Menu:", mainMenu);
console.log("Play button:", playButton);

const fireboyImage = new Image();
fireboyImage.src = "assest/fireboy.png";

const backgroundImage = new Image();
backgroundImage.src = "assest/bg.png";
canvas.style.backgroundSize = "cover";
canvas.style.backgroundPosition = "center";

const flakeImage = new Image();
flakeImage.src = "assest/lakef3.png";
const redDiamondImage = new Image();
redDiamondImage.src="assest/diamonds_red.png";

const player = {
  x: 30,
  y: 790,
  width: 50,
  height: 60,
  speed: 5,
  velocityY: 0,
  gravity: 0.5,
  jumpPower: -10,
  onGround: false,
};

const flake = [
  {
    x: 410,
    y: canvas.height - 615,
    width: 100,
    height: 40,
  },
];
let flakeFrame = 0;
let flakeFrameTime = 0;
function drawflake() {
  flake.forEach((lake) => {
    const frameWidth = 173;
    const frameHeight = 40;
    const sx = flakeFrame * frameWidth;
    const sy = 0;
    ctx.drawImage(
      flakeImage,
      sx,
      sy,
      frameWidth,
      frameHeight,
      lake.x,
      lake.y,
      lake.width,
      lake.height,
    );
  });
}

function updateflake(time) {
  if (time - flakeFrameTime > 300) {
    flakeFrame++;
    if (flakeFrame >= 5) {
      flakeFrame = 0;
    }
    flakeFrameTime = time;
  }
}

const platforms = [
  {
    x: 0,
    y: 0,
    width: 1600,
    height: 35,
  },
  {
    x: 1315,
    y: 135,
    width: 255,
    height: 55,
  },
  {
    x: 1080,
    y: 220,
    width: 145,
    height: 50,
  },
  {
    x: 1360,
    y: 365,
    width: 240,
    height: 50,
  },
  {
    x: 0,
    y: 475,
    width: 255,
    height: 50,
  },
  {
    x: 300,
    y: 300,
    width: 420,
    height: 55,
  },
  {
    x: 710,
    y: 465,
    width: 55,
    height: 430,
  },
  {
    x: 1125,
    y: 510,
    width: 185,
    height: 50,
  },
  {
    x: 990,
    y: 620,
    width: 145,
    height: 50,
  },
  {
    x: 0,
    y: 650,
    width: 205,
    height: 45,
  },
  {
    x: 765,
    y: 750,
    width: 180,
    height: 50,
  },
  {
    x: 410,
    y: 810,
    width: 300,
    height: 50,
  },
  {
    x: 0,
    y: 870,
    width: 1600,
    height: 30,
  },
];

const redDiamonds = [
    { x: 200, y: 800, width: 40, height: 50 },
    { x: 500, y: 780, width: 40, height: 50 },
    { x: 1000, y: 550, width: 40, height: 50 },
    { x: 1400, y: 300, width: 40, height: 50 }
];
function drawPlatforms() {
  for (let platform of platforms) {
    ctx.fillStyle = "#106436";

    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  }
}

const keys = {};

window.addEventListener("keydown", function (event) {
  keys[event.key] = true;
});

window.addEventListener("keyup", function (event) {
  keys[event.key] = false;
});

function update() {
    Collision.update(player,platforms,keys,GAME_WIDTH,GAME_HEIGHT);
    Collision.checkDiamondCollision(
        player,
        redDiamonds
    );
}

function drawRedDiamonds() {
redDiamonds.forEach((diamond) => {ctx.drawImage(redDiamondImage,diamond.x,diamond.y,diamond.width,diamond.height)});
}


function drawPlayer() {
  ctx.drawImage(fireboyImage, player.x, player.y, player.width, player.height);
}
function draw(time) {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  drawPlatforms();
  updateflake(time);
  drawflake();
  drawRedDiamonds();
  drawPlayer();
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
  console.log("PLAY CLICKED");
  mainMenu.style.display = "none";

  canvas.style.display = "block";

  animate();
});

function animate(time) {
  update();
  draw(time);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);*/
import Collision from "./collision.js";
import Platform from "./platform.js";
import Player from "./player.js";
import Lake from "./lake.js";
import Button from"./button.js";

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

const backgroundImage = new Image();
backgroundImage.src = "assest/bg.png";
canvas.style.backgroundSize = "cover";
canvas.style.backgroundPosition = "center";

const flakeImage = new Image();
flakeImage.src = "assest/lakef3.png";
const buttonImage = new Image();
buttonImage.src = "assest/Buttom1.png";

const player = new Player(30, 790, 50, 60, fireboyImage, "fire");

const fireLake = new Lake(450, canvas.height - 620, 100, 40, flakeImage, "fire");
const movingPlatform = new Platform(410, 820, 300, 50);
const button1 = new Button(
    220,
    850,
    60,
    20,
    buttonImage
);
const button2 = new Button(
    50,
    455,
    60,
    20,
    buttonImage
);
const platforms = [
  new Platform(0, 0, 1600, 35),
  new Platform(1315, 135, 255, 55),
  new Platform(1080, 220, 145, 50),
  new Platform(1360, 365, 240, 50),
  new Platform(0, 475, 255, 50),
  new Platform(300, 300, 420, 55),
  new Platform(710, 465, 55, 430),
  new Platform(1125, 510, 185, 50),
  new Platform(990, 620, 145, 50),
  new Platform(0, 650, 205, 45),
  new Platform(765, 750, 180, 50),
  
  new Platform(0, 870, 1600, 30),
  movingPlatform,
];

const keys = {};
window.addEventListener("keydown", function (event) {
  keys[event.key] = true;
});
window.addEventListener("keyup", function (event) {
  keys[event.key] = false;
});

let lastTime = 0;
const buttons = [button1, button2];

function update(dt) {

    Collision.update(
        player,
        platforms,
        keys,
        GAME_WIDTH,
        GAME_HEIGHT,
        dt
    );

    for (let button of buttons) {
        button.pressed = Collision.checkButtonCollision(
            player,
            button
        );
    }

    updateMovingPlatform(dt);
}
  
function updateMovingPlatform(dt) {

    const originalY = 820;
    const targetY = 500;

    const speed = 200;
    const anyButtonPressed =
        button1.pressed || button2.pressed;

    if (anyButtonPressed) {
        if (movingPlatform.y > targetY) {
            movingPlatform.y -= speed * dt / 1000;
            if (movingPlatform.y < targetY) {
                movingPlatform.y = targetY;
            }
        }

    } else {
        if (movingPlatform.y < originalY) {
            movingPlatform.y += speed * dt / 1000;
            if (movingPlatform.y > originalY) {
                movingPlatform.y = originalY;
            }
        }
    }
}


function draw(time) {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  for (let platform of platforms) {
    platform.draw(ctx);
  }
  for (let button of buttons) {
        button.draw(ctx);
    }
  fireLake.update(time);
  fireLake.draw(ctx);
  player.draw(ctx);
}

function animate(time) {
  const dt = lastTime ? time - lastTime : 16.67;
  lastTime = time;
  update(dt);
  draw(time);
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
playButton.addEventListener("click", function () {
  mainMenu.style.display = "none";
  canvas.style.display = "block";

  requestAnimationFrame(animate);
});