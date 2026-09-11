class Collision {
  static update(player, platforms, keys, GAME_WIDTH, GAME_HEIGHT, dt = 16.67,controls = {
        left: "ArrowLeft",
        right: "ArrowRight",
        up: "ArrowUp"
    }) {
    const previousX = player.x;
    let moving = false;

    if (keys[controls.left]) {
      player.x -= player.speed;
      player.facing = -1;
      moving = true;
    }

    if (keys[controls.right]) {
      player.x += player.speed;
      player.facing = 1;
      moving = true;
    }

    for (let platform of platforms) {
      const playerTop = player.y;
      const playerBottom = player.y + player.height;
      const playerLeft = player.x;
      const playerRight = player.x + player.width;
      const verticalOverlap =
        playerBottom > platform.y && playerTop < platform.y + platform.height;
      const horizontalOverlap =
        playerRight > platform.x && playerLeft < platform.x + platform.width;

      if (verticalOverlap && horizontalOverlap) {
        if (player.x > previousX) {
          player.x = platform.x - player.width;
        } else if (player.x < previousX) {
          player.x = platform.x + platform.width;
        }
      }
    }

    const previousY = player.y;
    player.velocityY += player.gravity;
    player.y += player.velocityY;
    player.onGround = false;

    for (let platform of platforms) {
      const playerLeft = player.x;
      const playerRight = player.x + player.width;
      const playerTop = player.y;
      const playerBottom = player.y + player.height;
      const previousTop = previousY;
      const previousBottom = previousY + player.height;
      const horizontalOverlap =
        playerRight > platform.x && playerLeft < platform.x + platform.width;

      if (
        horizontalOverlap &&
        player.velocityY >= 0 &&
        previousBottom <= platform.y &&
        playerBottom >= platform.y
      ) {
        player.y = platform.y - player.height;
        player.velocityY = 0;
        player.onGround = true;
      }
      if (
        horizontalOverlap &&
        player.velocityY < 0 &&
        previousTop >= platform.y + platform.height &&
        playerTop <= platform.y + platform.height
      ) {
        player.y = platform.y + platform.height;
        player.velocityY = 0;
      }
    }

    if (keys[controls.up] && player.onGround) {
      player.velocityY = player.jumpPower;
       player.onGround = false;
    }

    if (player.x < 0) {
      player.x = 0;
    }

    if (player.x + player.width > GAME_WIDTH) {
      player.x = GAME_WIDTH - player.width;
    }
    if (player.y + player.height > GAME_HEIGHT) {
      player.y = GAME_HEIGHT - player.height;
       player.velocityY = 0;
      player.onGround = true;
    }

    player.animate(moving, dt);
  }
  static checkButtonCollision(player, button) {
    return (
      player.x < button.x + button.width &&
      player.x + player.width > button.x &&
      player.y < button.y + button.height &&
      player.y + player.height > button.y
    );
}
static checkDiamondCollision(player, diamonds, type) {

    for (let i = diamonds.length - 1; i >= 0; i--) {
        const diamond = diamonds[i];
        if (diamond.type !== type) {
            continue;
        }

        const collision =
            player.x < diamond.x + diamond.width &&
            player.x + player.width > diamond.x &&
            player.y < diamond.y + diamond.height &&
            player.y + player.height > diamond.y;

        if (collision) {
            diamond.collected = true;
        }
    }
}   
    
   
}
export default Collision;
