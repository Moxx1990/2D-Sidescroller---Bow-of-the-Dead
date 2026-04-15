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
    walking_sound = new Audio('audio/running.mp3');
    shooting_sound = new Audio('audio/shoot.mp3');
    
    
    constructor() {
        super();
        this.loadImage('img/Character/Idle.png');
        this.hurtSheet = new Image();
        this.hurtSheet.src = 'img/Character/Hurt.png';
        this.applyGravity();
        this.arrow = 3;
        this.animate();
    }

    throwArrow() {
        if (this.arrow > 0) {
            this.shooting_sound.pause();
            this.shooting_sound.currentTime = 0;
            this.shooting_sound.play();
            let arrow = new ThrowableObject(this.x + 50, this.y + 50);
            this.world.throwableObjects.push(arrow);
            this.arrow--;
        }}

    bounce() {
    this.speedY = 25;
    }

   animate() {
    setInterval(() => {
        this.walking_sound.pause();
        if (this.world.keyboard.right || this.world.keyboard.left) {
            this.world.background_music.play();
            if (!this.isAboveGround()) {
                this.walking_sound.play();
            }
        }
        if (this.world.keyboard.left && this.x > 0) {
            this.moveLeft();
        }
        if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
            this.moveRight();
        }
        if (this.world.keyboard.up && !this.isAboveGround()) {
            this.jump();
        }
      if (this.world.keyboard.space && this.canThrow && this.arrow > 0) {
    this.throwArrow();
    this.canThrow = false; 
    setTimeout(() => {
        this.canThrow = true;
    }, 500); 
}
        this.world.camera_x = -this.x + 100;
    }, 1000 / 60);


    setInterval(() => {
        this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        if (this.isDead()) {
            this.loadImage('img/Character/Dead.png')
        }
        else if (this.isHurt()) {
            this.currentFrame = (this.currentFrame + 1) % 3;
            this.img = this.hurtSheet;
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