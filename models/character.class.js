class Character extends MoveableObject {

    currentFrame = 0;
    totalFrames = 7;
    frameWidth = 128;
    frameHeight = 128;
    world;
    speed = 5;
    arrow = 0;
    coins = 0;
    canThrow = true;
    
    
    constructor() {
        super();
        this.loadImage('img/Character/Idle.png');
        this.applyGravity();
        this.arrow = 3;
        this.animate();
    }

    throwArrow() {
    console.log('Vor dem Schuss:', this.arrow);

    if (this.arrow > 0) {
        let arrow = new ThrowableObject(this.x + 50, this.y + 50);
        this.world.throwableObjects.push(arrow);
        this.arrow--;

        console.log('Nach dem Schuss:', this.arrow);
    } else {
        console.log('Keine Pfeile mehr');
    }
}

    bounce() {
    this.speedY = 25;
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
        if (this.world.keyboard.space && this.canThrow) {
                this.throwArrow();
                this.canThrow = false;
            }

            if (!this.world.keyboard.space) {
                this.canThrow = true;
            }
        this.world.camera_x = -this.x + 100;
    }, 1000 / 60);


    setInterval(() => {
        this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        if (this.isDead()) {
            this.loadImage('img/Character/Dead.png')
        }
        else if (this.isHurt()) {
            this.loadImage('img/Character/Hurt.png')
        }
        else if (this.shoot) {
            this.loadImage('img/Character/Shot.png')
        }
        else if (this.isAboveGround()) {
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