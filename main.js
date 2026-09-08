
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
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
animate();

