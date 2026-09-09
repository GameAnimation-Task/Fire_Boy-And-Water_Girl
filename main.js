const canvas = document.getElementById("gameCanvas");
console.log("CANVAS",canvas);
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const mainMenu = document.getElementById("mainMenu");
const playButton = document.getElementById("playButton");
const instructionsMenu =document.getElementById("instructionsMenu");
const instructionsButton =document.getElementById("instructionsButton");
const okButton =document.getElementById("okButton");
console.log("Menu:", mainMenu);
console.log("Play button:", playButton);
canvas.width = 900;
canvas.height = 700;

const fireboyImage = new Image();
fireboyImage.src = "assest/fireboy.png";

const backgroundImage = new Image();
backgroundImage.src = "assest/bg.png";
canvas.style.backgroundSize = "cover";
canvas.style.backgroundPosition = "center";

const platformImage = new Image();
platformImage.src = "assest/platform.png";

const flakeImage = new Image();
flakeImage.src = "assest/lakef3.png";

const player = {
  x: 0,
  y: 630,
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
    x: 300,
    y: 560,
    width: 115,
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
function drawPlayer() {
  ctx.drawImage(fireboyImage, player.x, player.y, player.width, player.height);
}
function draw(time) {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(platformImage, 0, 0, canvas.width, canvas.height);
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
  draw(time);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
