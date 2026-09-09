export default class Lake {
  constructor(x, y, width, height, image, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.type = type;
    this.currentFrame = 0;
    this.frameTime = 0;
    this.frameWidth = 173;
    this.frameHeight = 40;
    this.totalFrames = 5;
  }

  update(time) {
    if (time - this.frameTime > 300) {
      this.currentFrame++;
      if (this.currentFrame >= this.totalFrames) {
        this.currentFrame = 0;
      }
      this.frameTime = time;
    }
  }

  draw(ctx) {
    const sourceX = this.currentFrame * this.frameWidth;
    ctx.drawImage(
      this.image,
      sourceX,
      0,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}