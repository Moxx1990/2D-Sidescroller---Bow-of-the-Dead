class ArrowAmount extends DrawableObject {
    arrows = 3; // Startwert

    constructor() {
        super();
        this.loadImage('img/Character/Arrow.png');
        this.x = 30;
        this.y = 100;
        this.width = 40;
        this.height = 40;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("x " + this.arrows, this.x + 50, this.y + 32); 
    }

    setArrows(amount) {
        this.arrows = amount;
    }
}