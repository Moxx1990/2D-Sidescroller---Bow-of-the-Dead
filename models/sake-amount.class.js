class SakeAmount extends DrawableObject {
    sakeCount = 0;

    constructor() {
        super();
        this.loadImage('img/Statusbar/collect/Sake.png');
        this.x = 30;
        this.y = 100;
        this.width = 30;
        this.height = 30;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = "24px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("x " + this.sakeCount, this.x + 50, this.y + 30);
    }

    setSake(count) {
        this.sakeCount = count;
    }
}