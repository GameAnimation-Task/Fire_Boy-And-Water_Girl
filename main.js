
const canvas = document.getElementById("gameCanvas");
console.log("CANVAS",canvas);
const ctx = canvas.getContext("2d");
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
backgroundImage.src = "assest/background.png";

const player = {

    x: 0,y: 630,
    width: 50,height: 60,
    speed: 5,
    velocityY: 0,
    gravity: 0.5,
    jumpPower: -10,
    onGround: false

};
function drawPlayer() {

    ctx.drawImage(
        fireboyImage,
        player.x,
        player.y,
        player.width,
        player.height
    );

}
function draw() {
    ctx.drawImage(
        backgroundImage,
        0,
        0,
        canvas.width,
        canvas.height
    );

   
    drawPlayer();

}

function animate() {
    draw();
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
    console.log("PLAY CLICKED");
    mainMenu.style.display = "none";

    canvas.style.display = "block";

    animate();

});

