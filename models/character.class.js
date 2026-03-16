class Character extends MoveableObject {

    currentFrame = 0;
    totalFrames = 7;
    frameWidth = 128;
    frameHeight = 128;
    world;
    speed = 5;
    
    constructor() {
        super();
        this.loadImage('img/Character/Idle.png');
        this.applyGravity();
        this.animate();
    }

   animate() {

    setInterval(() => {
        if (this.world.keyboard.left && this.x > 0) {
            this.moveLeft();
        }
        if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
            this.moveRight();
        }
        if (this.world.keyboard.up && !this.isAboveGround()) {
            this.jump();
        }
        this.world.camera_x = -this.x + 100;
    }, 1000 / 60);


    setInterval(() => {
        this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        if (this.isAboveGround()) {
            this.loadImage('img/Character/Jump.png');
        }
        else if (this.world.keyboard.left || this.world.keyboard.right) {
            this.loadImage('img/Character/Run.png');
        }
        else {
            this.loadImage('img/Character/Idle.png');
        }
    }, 120);
}

    getFrameX() {
        return this.currentFrame * this.frameWidth;
    }
}