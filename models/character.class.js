/**
 * Represents the main player character in the game.
 * Extends MoveableObject and manages animations, user inputs, sounds, and projectile throwing.
 */
class Character extends MoveableObject {

    /** @type {number} The current animation frame index. */
    currentFrame = 0;
    /** @type {number} Total frames available in the standard movement animation. */
    totalFrames = 7;
    /** @type {number} Width of a single frame in the sprite sheet. */
    frameWidth = 128;
    /** @type {number} Height of a single frame in the sprite sheet. */
    frameHeight = 128;
    /** @type {World} Reference to the world instance for camera and input access. */
    world;
    /** @type {number} Movement speed on the X-axis. */
    speed = 5;
    /** @type {number} Amount of arrows currently held by the character. */
    arrow = 0;
    /** @type {number} Amount of sake collected. */
    sake = 0;
    /** @type {boolean} Cooldown flag for throwing projectiles. */
    canThrow = true;
    /** @type {HTMLAudioElement} Sound played during movement. */
    walking_sound = new Audio('audio/running.mp3');
    /** @type {HTMLAudioElement} Sound played when shooting an arrow. */
    shooting_sound = new Audio('audio/shoot.mp3');
    /** @type {boolean} Flag to ensure the death animation and sound trigger only once. */
    deathAnimationStarted = false;
    
    /**
     * Creates a new Character instance, initializes hitboxes, and starts animation loops.
     */
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

    /**
     * Executes the logic for throwing an arrow.
     * Checks for arrow availability, plays sound, and updates the world's projectile array.
     */
    throwArrow() {
        if (this.arrow > 0) {
            this.shooting_sound.pause();
            this.shooting_sound.currentTime = 0;
            this.shooting_sound.play();
            let arrow = new ThrowableObject(this.x + 50, this.y + 50);
            this.world.throwableObjects.push(arrow);
            this.arrow--;
            this.world.arrowAmount.setArrows(this.arrow);
        }
    }

    /**
     * Makes the character bounce upwards. Usually triggered after jumping on an enemy.
     */
    bounce() {
        this.speedY = 25;
        this.currentFrame = 0;
    }

    /**
     * Starts the main logic and animation intervals for the character.
     * Also updates the camera position based on character movement.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.handleMovement();
                this.handleAction();
            } else {
                this.walking_sound.pause();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        setInterval(() => this.playCorrectAnimation(), 120);
    }

    /**
     * Handles movement inputs (left, right, up) and manages walking sounds.
     */
    handleMovement() {
        this.walking_sound.pause();
        if (this.world.keyboard.right || this.world.keyboard.left) {
            this.world.background_music.play();
            if (!this.isAboveGround()) this.walking_sound.play();
        }
        if (this.world.keyboard.left && this.x > 0) this.moveLeft();
        if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
            this.moveRight();
        }
        if (this.world.keyboard.up && !this.isAboveGround()) this.jump();
    }

    /**
     * Handles action inputs, specifically throwing projectiles with a cooldown.
     */
    handleAction() {
        if (this.world.keyboard.space && this.canThrow && this.arrow > 0) {
            this.throwArrow();
            this.canThrow = false;
            setTimeout(() => (this.canThrow = true), 500);
        }
    }

    /**
     * Selects and plays the appropriate animation based on the character's state.
     */
    playCorrectAnimation() {
        if (this.isDead()) {
            this.handleDeathAnimation();
        } else if (this.isHurt()) {
            this.img = this.hurtSheet;
            this.currentFrame = (this.currentFrame + 1) % 3;
        } else if (this.isAboveGround()) {
            this.handleJumpAnimation();
        } else if (this.world.keyboard.left || this.world.keyboard.right) {
            this.setAnimationState('img/Character/Run.png', (this.currentFrame + 1) % this.totalFrames);
        } else {
            this.setAnimationState('img/Character/Idle.png', 0);
            this.deathAnimationStarted = false;
        }
    }

    /**
     * Manages the death animation sequence and triggers the game over sound.
     */
    handleDeathAnimation() {
        if (!this.deathAnimationStarted) {
            this.currentFrame = 0;
            this.deathAnimationStarted = true;
            new Audio('audio/gameOver.mp3').play();
        }
        this.img = this.deathSheet;
        if (this.currentFrame < 4) this.currentFrame++;
    }

    /**
     * Manages the jumping animation sequence.
     */
    handleJumpAnimation() {
        this.loadImage('img/Character/Jump.png');
        if (this.currentFrame >= 9) {
            this.currentFrame = 0;
        }
        if (this.currentFrame < 8) {
            this.currentFrame++;
        }
    }

    /**
     * Helper method to set the current image and animation frame.
     * @param {string} imgPaths - Path to the image file.
     * @param {number} frame - The frame index to set.
     */
    setAnimationState(imgPaths, frame) {
        this.loadImage(imgPaths);
        this.currentFrame = frame;
    }

    /**
     * Calculates the horizontal X-coordinate for the current frame in the sprite sheet.
     * @returns {number} The X-pixel offset for rendering.
     */
    getFrameX() {
        return this.currentFrame * this.frameWidth;
    }
}