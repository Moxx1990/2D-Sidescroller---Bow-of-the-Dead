class Character extends MoveableObject {

    height = 150;
    width = 200;
    currentFrame = 0;
    totalFrames = 9;
    frameWidth = 128;
    frameHeight = 128;

    constructor() {
        super();
        this.loadImage('img/Character/Idle.png');
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.currentFrame++;
            if (this.currentFrame >= this.totalFrames) {
                this.currentFrame = 0;
            }
        }, 120);
    }

    getFrameX() {
        return this.currentFrame * this.frameWidth;
    }

    jump() {
        console.log("jump");
    }
}