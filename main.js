const canvas = document.getElementById("gameCanvas");
console.log("CANVAS", canvas);
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
    x: 310,
    y: canvas.height - 40,
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
    y: 850,
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
  if (keys["ArrowLeft"]) {
    player.x -= player.speed;
  }
  if (keys["ArrowRight"]) {
    player.x += player.speed;
  }
  player.velocityY += player.gravity;
  player.y += player.velocityY;
  player.onGround = false;

  for (let platform of platforms) {
    const playerLeft = player.x;
    const playerRight = player.x + player.width;
    const playerTop = player.y;
    const playerBottom = player.y + player.height;
    const previousBottom = playerBottom - player.velocityY;
    const horizontalCollision =
      playerRight > platform.x && playerLeft < platform.x + platform.width;

    if (
      horizontalCollision &&
      player.velocityY >= 0 &&
      previousBottom <= platform.y &&
      playerBottom >= platform.y
    ) {
      player.y = platform.y - player.height;
      player.velocityY = 0;
      player.onGround = true;
    }
  }

  if (keys["ArrowUp"] && player.onGround) {
    player.velocityY = player.jumpPower;

    player.onGround = false;
  }

  if (player.x < 0) {
    player.x = 0;
  }
  if (player.x + player.width > GAME_WIDTH) {
    player.x = GAME_WIDTH - player.width;
  }
}

function drawPlayer() {
  ctx.drawImage(fireboyImage, player.x, player.y, player.width, player.height);
}
function draw(time) {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  drawPlatforms();
  updateflake(time);
  drawflake();
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
requestAnimationFrame(animate);
