const FRAME_DATA = {
  fire: {
    idle: [
      { x: 13, y: 171, w: 52, h: 77 },
      { x: 121, y: 170, w: 53, h: 76 },
      { x: 227, y: 165, w: 53, h: 79 },
      { x: 337, y: 168, w: 54, h: 76 },
    ],
    walk: [
      { x: 17, y: 254, w: 52, h: 95 },
      { x: 125, y: 253, w: 53, h: 99 },
      { x: 232, y: 244, w: 53, h: 104 },
      { x: 341, y: 246, w: 52, h: 103 },
    ],
  },
  water: {
    idle: [
      { x: 10, y: 10, w: 73, h: 111 },
      { x: 93, y: 10, w: 73, h: 111 },
      { x: 176, y: 10, w: 74, h: 111 },
      { x: 260, y: 10, w: 73, h: 111 },
    ],
    walk: [
      { x: 10, y: 131, w: 75, h: 119 },
      { x: 95, y: 131, w: 75, h: 119 },
      { x: 180, y: 131, w: 75, h: 118 },
      { x: 265, y: 131, w: 74, h: 118 },
      { x: 349, y: 131, w: 75, h: 118 },
    ],
  },
};

export default class Player {
  constructor(x, y, width, height, image, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 5;
    this.velocityY = 0;
    this.gravity = 0.3;
    this.jumpPower = -10;
    this.onGround = false;
    this.type = type;
    this.image = image;

    this.facing = 1;
    this.animations = FRAME_DATA[type];
    if (!this.animations) {
      throw new Error(
        `Player: no frame data for type "${type}". Expected "fire" or "water".`,
      );
    }

    this.state = "idle";
    this.frameIndex = 0;
    this.frameTimer = 0;
    this.frameDuration = 120;
  }

  setState(name) {
    if (this.state !== name) {
      this.state = name;
      this.frameIndex = 0;
      this.frameTimer = 0;
    }
  }

  animate(moving, dt) {
    this.setState(moving ? "walk" : "idle");

    const frames = this.animations[this.state];
    this.frameTimer += dt;
    if (this.frameTimer >= this.frameDuration) {
      this.frameTimer = 0;
      this.frameIndex = (this.frameIndex + 1) % frames.length;
    }
  }

  draw(ctx) {
    const frames = this.animations[this.state];
    const f = frames[this.frameIndex];

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height);
    ctx.scale(this.facing, 1);
    ctx.drawImage(
      this.image,
      f.x,
      f.y,
      f.w,
      f.h,
      -this.width / 2,
      -this.height,
      this.width,
      this.height,
    );
    ctx.restore();
  }
}
