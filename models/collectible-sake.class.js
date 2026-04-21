class CollectibleSake extends MoveableObject {
    
    width = 20;
    height = 20;
    glowColor = 'rgba(255, 255, 255, 0.8)';
    glowAnimationStep = 0;

    constructor(x, y) {
        super();
        this.loadImage('img/Statusbar/collect/Sake.png');
        this.x = x;
        this.y = y;
        this.offsetLeft = 5;
        this.offsetRight = 5;
        this.offsetTop = 5;
        this.offsetBottom = 5;
    }

    draw(ctx) {
        ctx.save();
        this.glowAnimationStep += 0.05;
        let currentBlur = 10 + Math.sin(this.glowAnimationStep) * 8;
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = currentBlur;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}