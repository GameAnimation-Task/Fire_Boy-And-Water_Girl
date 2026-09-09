class Collision {
    static update(player, platforms, keys, GAME_WIDTH, GAME_HEIGHT){
  const previousX = player.x;

  if (keys["ArrowLeft"]) {
    player.x -= player.speed;
  }

  if (keys["ArrowRight"]) {
    player.x += player.speed;
  }
  for (let platform of platforms) {

    const playerTop = player.y;
    const playerBottom = player.y + player.height;
    const playerLeft = player.x;
    const playerRight = player.x + player.width;
    const verticalOverlap =playerBottom > platform.y &&playerTop < platform.y + platform.height;
    const horizontalOverlap =playerRight > platform.x &&playerLeft < platform.x + platform.width;

    if (verticalOverlap && horizontalOverlap) {
      if (player.x > previousX) {
        player.x = platform.x - player.width;
      }
      else if (player.x < previousX) {

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
    const horizontalOverlap =playerRight > platform.x &&playerLeft < platform.x + platform.width;

    if (horizontalOverlap &&player.velocityY >= 0 &&previousBottom <= platform.y &&playerBottom >= platform.y) {
      player.y = platform.y - player.height;
      player.velocityY = 0;
      player.onGround = true;
    }
    if (horizontalOverlap &&player.velocityY < 0 &&previousTop >= platform.y + platform.height &&playerTop <= platform.y + platform.height) {
      player.y = platform.y + platform.height;
      player.velocityY = 0;
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
  if (player.y + player.height > GAME_HEIGHT) {
    player.y = GAME_HEIGHT - player.height;
    player.velocityY = 0;
    player.onGround = true;
  }
} 
}
export default Collision;