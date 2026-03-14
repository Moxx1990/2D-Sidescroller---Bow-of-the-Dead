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
                this.x-= this.speed;
                this.otherDirection = true;
            }

            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.x+= this.speed;
                this.otherDirection = false;
            }
            this.world.camera_x = -this.x +100;
        }, 1000/60);

        setInterval(() => {
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
            this.currentFrame++;
            
            if (this.world.keyboard.left || this.world.keyboard.right) {
                this.loadImage('img/Character/Run.png');            
            } 
            if (this.world.keyboard.up) {
                this.speedY = 20;
                this.loadImage('img/Character/Jump.png')
            }
            else if (this.isAboveGround()) {
                
            }  
            else {
                this.loadImage('img/Character/Idle.png');
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