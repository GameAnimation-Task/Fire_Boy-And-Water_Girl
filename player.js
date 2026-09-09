export default class Player {
  constructor(x, y, width, height, image, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 5;
    this.velocityY = 0;
    this.gravity = 0.5;
    this.jumpPower = -10;
    this.onGround = false;
    this.type = type;
    this.image = image;

    this.facing = 1;

    this.animations = {
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
    };

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