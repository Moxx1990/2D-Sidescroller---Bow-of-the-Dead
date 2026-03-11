class Enemy extends MoveableObject {

    height = 150;
    width = 200;
    
    currentFrame = 0;
    totalFrames = 6;
    frameWidth = 128;
    frameHeight = 128;

    constructor() {
        super();
        this.loadImage('img/Enemy/Basic/Walk.png');
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        }, 150);
    }

    getFrameX() {
        return this.currentFrame * this.frameWidth;
    }
  
}