class Diamond {
    constructor(x, y, width, height, image, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.type = type;
        this.collected = false;
    }

    draw(ctx) {
        if (!this.collected) {
            ctx.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }
}

export default Diamond;