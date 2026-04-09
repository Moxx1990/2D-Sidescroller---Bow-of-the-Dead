class Enemy extends MoveableObject {
    energy = 1;
    height = 150;
    width = 200;
    
    currentFrame = 0;
    totalFrames = 6;
    frameWidth = 128;
    frameHeight = 128;

    constructor() {
        super();
        this.offsetLeft = 110;
        this.offsetRight = 110;
        this.offsetTop = 100;
        this.offsetBottom = 20;
        this.loadImage('img/Enemy/Basic/Walk.png');
        this.x = 600 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.playEnemyAnimation();
    }

    getFrameX() {
        return this.currentFrame * this.frameWidth;
    }
  
}