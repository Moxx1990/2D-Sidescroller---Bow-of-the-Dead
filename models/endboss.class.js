class Endboss extends MoveableObject {

    height = 350;
    width = 250;
    y = 70;
    
    currentFrame = 0;
    totalFrames = 6;
    frameWidth = 128;
    frameHeight = 128;

    constructor() {
        super();
        this.loadImage('img/Enemy/Basic/Walk.png');
        this.x = 2050
        this.speed = 0.15;
        this.playAnimation();
    }

    getFrameX() {
        return this.currentFrame * this.frameWidth;
    }

}