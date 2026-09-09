
import Collision from "./collision.js";
import Platform from "./platform.js";
import Player from "./player.js";
import Lake from "./lake.js";
import Button from"./button.js";
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

const backgroundImage = new Image();
backgroundImage.src = "assest/bg.png";
canvas.style.backgroundSize = "cover";
canvas.style.backgroundPosition = "center";

const flakeImage = new Image();
flakeImage.src = "assest/lakef3.png";
const buttonImage = new Image();
buttonImage.src = "assest/Buttom1.png";
const redDiamondImage = new Image();
redDiamondImage.src = "assest/diamonds_red.png";

const blueDiamondImage = new Image();
blueDiamondImage.src = "assest/diamonds_blue.png";

const player = new Player(30, 790, 50, 60, fireboyImage, "fire");
const watergirl = new Player(
    100,
    790,
    50,
    60,
    watergirlImage,
    "water"
);
const redDiamonds = [
    new Diamond(150, 800, 30, 30, redDiamondImage, "red"),
    new Diamond(470, 260,30, 30, redDiamondImage, "red"),
    new Diamond(1150, 460, 30, 30, redDiamondImage, "red")
];

const blueDiamonds = [
    new Diamond(150, 430, 30, 30, blueDiamondImage, "blue"),
    new Diamond(900, 700, 30, 30, blueDiamondImage, "blue"),
    new Diamond(1400, 320, 30, 30, blueDiamondImage, "blue"),
    new Diamond(170, 760, 30, 30, blueDiamondImage, "blue")
];

const fireLake = new Lake(450, canvas.height - 620, 100, 40, flakeImage, "fire");
const movingPlatform = new Platform(350, 820, 400, 50);
movingPlatform.previousY = movingPlatform.y;
const button1 = new Button(220,850,60,20,buttonImage);
const button2 = new Button(50,455,60,20,buttonImage);
const button3 = new Button(810,730,60,20,buttonImage);
const button4 = new Button(1200,490,60,20,buttonImage);
const platforms = [
  new Platform(0, 0, 1600, 35),
  new Platform(1315, 135, 255, 55),
  new Platform(1080, 220, 145, 50),
  new Platform(1360, 365, 240, 50),
  new Platform(0, 475, 255, 50),
  new Platform(300, 300, 420, 40),
  new Platform(710, 465, 55, 430),
  new Platform(1125, 510, 185, 50),
  new Platform(990, 620, 145, 50),
  new Platform(0, 650, 205, 45),
  new Platform(765, 750, 180, 50),
  
  new Platform(0, 870, 1600, 30),
  movingPlatform,
];

const keys = {};
const keys2 = {};

window.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" ||event.key === "ArrowRight" ||event.key === "ArrowUp") {
        keys[event.key] = true;
        event.preventDefault();
    }
    if ( event.key.toLowerCase() === "a" ||event.key.toLowerCase() === "d" ||
    event.key.toLowerCase() === "w" ||event.key.toLowerCase() === "s") {
        keys2[event.key.toLowerCase()] = true;
        event.preventDefault();
    }
});

window.addEventListener("keyup", function (event) {
    if (event.key === "ArrowLeft" ||event.key === "ArrowRight" ||event.key === "ArrowUp") {
        keys[event.key] = false;
    }

    if (event.key.toLowerCase() === "a" ||event.key.toLowerCase() === "d" ||
     event.key.toLowerCase() === "w" ||event.key.toLowerCase() === "s") {
        keys2[event.key.toLowerCase()] = false;
    }
});

let lastTime = 0;
const buttons = [button1, button2,button3,button4];

function update(dt) {
     
    Collision.update(player,platforms,keys,GAME_WIDTH,GAME_HEIGHT,dt,{
      left: "ArrowLeft",
        right: "ArrowRight",
        up: "ArrowUp"
    });
       Collision.update(watergirl, platforms, keys2, GAME_WIDTH, GAME_HEIGHT, dt, {
    left: "a",
    right: "d",
    up: "w",
  });
    for (let button of buttons) {

    const fireboyOnButton =
        Collision.checkButtonCollision(player, button);

    const watergirlOnButton =
        Collision.checkButtonCollision(watergirl, button);

    button.pressed = fireboyOnButton || watergirlOnButton;
}
    updateMovingPlatform(dt);
    Collision.checkDiamondCollision(player,redDiamonds,"red");
    Collision.checkDiamondCollision(watergirl,blueDiamonds,"blue");

    
}
  
function updateMovingPlatform(dt) {

    const originalY = 820;
    const targetY = 500;

    const speed = 200;
    const oldY = movingPlatform.y;
    const anyButtonPressed =button1.pressed || button2.pressed;

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
     const dy = movingPlatform.y - oldY;
     movePlayerWithPlatform(player, oldY, dy);
     movePlayerWithPlatform(watergirl, oldY, dy);
    function movePlayerWithPlatform(player, oldY, dy) {

    const horizontalCollision =
        player.x + player.width > movingPlatform.x &&
        player.x < movingPlatform.x + movingPlatform.width;

    const standingOnPlatform =
        Math.abs((player.y + player.height) - oldY) < 8;

    if (horizontalCollision && standingOnPlatform && player.velocityY >= 0) {

        player.y += dy;

        player.y = movingPlatform.y - player.height;

        player.velocityY = 0;

        player.onGround = true;
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
    for (let diamond of redDiamonds) {
        diamond.draw(ctx);
    }

    for (let diamond of blueDiamonds) {
        diamond.draw(ctx);
    }
  fireLake.update(time);
  fireLake.draw(ctx);
  player.draw(ctx);
  watergirl.draw(ctx);
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