class Character extends MoveableObject {

    currentFrame = 0;
    totalFrames = 7;
    frameWidth = 128;
    frameHeight = 128;
    world;
    speed = 5;
    arrow = 0;
    sake = 0;
    canThrow = true;
    walking_sound = new Audio('audio/running.mp3');
    shooting_sound = new Audio('audio/shoot.mp3');
    deathAnimationStarted = false;
    
    
    constructor() {
        super();
        this.deathAnimationStarted = false;
        this.currentFrame = 0;
        this.deadSoundPlayed = false;
        this.loadImage('img/Character/Idle.png');
        this.hurtSheet = new Image();
        this.hurtSheet.src = 'img/Character/Hurt.png';
        this.deathSheet = new Image();
        this.deathSheet.src = 'img/Character/Dead.png';
        this.offsetLeft = 55;
        this.offsetRight = 55;
        this.offsetTop = 60;
        this.offsetBottom = 10;
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
            this.world.arrowAmount.setArrows(this.arrow);
        }}

    bounce() {
    this.speedY = 25;
    this.currentFrame = 0;
    }

animate() {
    setInterval(() => {
        if (!this.isDead()) {
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
        } else {
            this.walking_sound.pause();
        }
        this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

setInterval(() => {
    if (this.isDead()) {
        if (!this.deathAnimationStarted) {
            this.currentFrame = 0; 
            this.deathAnimationStarted = true;
            let gameOverSound = new Audio('audio/gameOver.mp3');
            gameOverSound.play();
        }
        this.img = this.deathSheet;
        if (this.currentFrame < 4) {
            this.currentFrame++;
        } 
    }
    else if (this.isHurt()) {
        this.img = this.hurtSheet;
        this.currentFrame = (this.currentFrame + 1) % 3;
    }
    else if (this.isAboveGround()) {
        this.loadImage('img/Character/Jump.png');
        this.currentFrame = 0;
    }
    else if (this.world.keyboard.left || this.world.keyboard.right) {
        this.loadImage('img/Character/Run.png');
        this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
    }
    else {
        this.loadImage('img/Character/Idle.png');
        this.currentFrame = 0;
        this.deathAnimationStarted = false;
    }
}, 120);
}

    getFrameX() {
        return this.currentFrame * this.frameWidth;
    }
}