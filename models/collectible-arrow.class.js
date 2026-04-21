class CollectibleArrow extends MoveableObject {
    width = 50;
    height = 100;
    glowColor = 'rgba(255, 255, 0, 0.7)';
    glowBlur = 20;

    constructor(x, y) {
        super().loadImage('img/Character/Arrow.png');
        this.x = x;
        this.y = y;
        this.offsetLeft = 15;
        this.offsetRight = 15;
        this.offsetTop = 15;
        this.offsetBottom = 15;
    }

    draw(ctx) {
        ctx.save();
        ctx.shadowColor = this.glowColor; 
        ctx.shadowBlur = this.glowBlur; 
        ctx.shadowOffsetX = 0; 
        ctx.shadowOffsetY = 0;
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(-90 * Math.PI / 180);
        ctx.drawImage(
            this.img, 
            -this.width / 2, 
            -this.height / 2, 
            this.width, 
            this.height
        );
        ctx.restore(); 
    }
}