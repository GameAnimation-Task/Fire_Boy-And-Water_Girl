import Collision from "./collision.js";
import Platform from "./platform.js";
import Player from "./player.js";
import Lake from "./lake.js";

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

const fireboy = new Player(30, 790, 50, 60, fireboyImage, "fire");
const watergirl = new Player(90, 790, 50, 60, watergirlImage, "water");

const fireLake = new Lake(310, canvas.height - 40, 100, 40, flakeImage, "fire");

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
  new Platform(410, 850, 300, 50),
  new Platform(0, 870, 1600, 30),
];

const keys = {};
window.addEventListener("keydown", function (event) {
  keys[event.key] = true;
});
window.addEventListener("keyup", function (event) {
  keys[event.key] = false;
});

let lastTime = 0;
function update(dt) {
  Collision.update(fireboy, platforms, keys, GAME_WIDTH, GAME_HEIGHT, dt, {
    left: "ArrowLeft",
    right: "ArrowRight",
    up: "ArrowUp",
  });
  Collision.update(watergirl, platforms, keys, GAME_WIDTH, GAME_HEIGHT, dt, {
    left: "a",
    right: "d",
    up: "w",
  });
}

function draw(time) {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  for (let platform of platforms) {
    platform.draw(ctx);
  }
  fireLake.update(time);
  fireLake.draw(ctx);
  fireboy.draw(ctx);
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
