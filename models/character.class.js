class Character extends MoveableObject {

    currentFrame = 0;
    totalFrames = 8;
    frameWidth = 128;
    frameHeight = 128;
    world;
    speed = 5;

    constructor() {
        super();
        this.loadImage('img/Character/Idle.png');
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.left) {
                this.x-= this.speed;
                this.otherDirection = true;
            }

            if (this.world.keyboard.right) {
                this.x+= this.speed;
                this.otherDirection = false;
            }
            this.world.camera_x = -this.x;
        }, 1000/60);

        setInterval(() => {

            this.currentFrame = this.currentFrame % this.totalFrames;
            this.currentFrame++;

            if (this.world.keyboard.left || this.world.keyboard.right) {
                this.loadImage('img/Character/Run.png');
                this.totalFrames = 7;
            
            } else {
                this.loadImage('img/Character/Idle.png');
                this.totalFrames = 8;
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