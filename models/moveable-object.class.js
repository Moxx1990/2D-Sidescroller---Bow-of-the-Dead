/**
 * Represents a base class for all objects that can move, jump, and interact with physics.
 * Extends DrawableObject to include movement, gravity, collision detection, and health management.
 */
class MoveableObject extends DrawableObject {
    
    /** @type {number} Horizontal movement speed. */
    speed = 0.15;
    /** @type {boolean} If true, the object is facing the opposite direction (left). */
    otherDirection = false;
    /** @type {number} Vertical speed for jumping and gravity. */
    speedY = 0;
    /** @type {number} Gravity force that pulls the object down. */
    accelaration = 2.5;
    /** @type {number} Health points of the object. */
    energy = 5;
    /** @type {number} Timestamp of the last time the object was hit. */
    lastHit = 0;
    /** @type {number} Left offset for the collision hitbox. */
    offsetLeft = 0;
    /** @type {number} Right offset for the collision hitbox. */
    offsetRight = 0;
    /** @type {number} Top offset for the collision hitbox. */
    offsetTop = 0;
    /** @type {number} Bottom offset for the collision hitbox. */
    offsetBottom = 0;
    /** @type {number} The current frame index to be rendered from a sprite sheet. */
    currentFrame = 0;
    /** @type {number} Current index in the walking animation sequence. */
    currentWalkFrame = 0;
    /** @type {number} Total number of frames available for the walking animation. */
    totalWalkFrames = 1;
    /** @type {number} Current index in the death animation sequence. */
    currentDeathFrame = 0;
    /** @type {number} Total number of frames available for the death animation. */
    totalDeathFrames = 1;

    /**
     * Loads an image from the specified path.
     * @param {string} path - The URL or local path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Applies gravity physics to the object.
     * Decreases vertical position based on speedY and reduces speedY by acceleration.
     * Prevents objects (except projectiles) from falling through the ground.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
            if (!this.isAboveGround()) {
                if (!(this instanceof ThrowableObject)) {
                this.y = 410 - (this.height - this.offsetBottom);
                this.speedY = 0;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is currently in the air.
     * ThrowableObjects are always considered above ground.
     * @returns {boolean} True if the object's feet are above the ground level (410px).
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return (this.y + this.height - this.offsetBottom) < 410;
        }
    }

    /**
     * Moves the object to the left and updates its facing direction.
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
     * Starts both the movement and the animation loops for enemies.
     */
    playEnemyAnimation() {
        this.startMovement();
        this.startAnimationLoop();
    }

    /**
     * Starts an interval that moves the object left as long as it is not dead.
     */
    startMovement() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    /**
     * Starts an interval that switches between walking and death animations.
     */
    startAnimationLoop() {
        setInterval(() => {
            if (this.isDead()) {
                this.animateDeath();
            } else {
                this.animateWalk();
            }
        }, 150);
    }

    /**
     * Advances the walking animation by one frame, looping back to the start if necessary.
     */
    animateWalk() {
        this.currentWalkFrame = (this.currentWalkFrame + 1) % this.totalWalkFrames;
        this.currentFrame = this.currentWalkFrame;
    }

    /**
     * Advances the death animation by one frame until the final frame is reached.
     */
    animateDeath() {
        if (this.currentDeathFrame < this.totalDeathFrames - 1) {
            this.currentDeathFrame++;
        }
        this.currentFrame = this.currentDeathFrame;
    }

    /**
     * Moves the object to the right and updates its facing direction.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Triggers a jump by setting a high vertical speed.
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * Detects a collision with another MoveableObject using hitbox offsets.
     * @param {MoveableObject} mo - The other object to check collision against.
     * @returns {boolean} True if the hitboxes overlap.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offsetRight > mo.x + mo.offsetLeft &&
            this.y + this.height - this.offsetBottom > mo.y + mo.offsetTop &&
            this.x + this.offsetLeft < mo.x + mo.width - mo.offsetRight &&
            this.y + this.offsetTop < mo.y + mo.height - mo.offsetBottom
        );
    }

    /**
     * Checks if the object's health has reached zero.
     * @returns {boolean} True if energy is 0 or less.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Reduces the object's energy by 1 and records the timestamp of the hit.
     */
    hit() {
        this.energy -= 1;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object was recently hit (within the last 0.5 seconds).
     * Used for invincibility frames.
     * @returns {boolean} True if the object is currently in a hurt state.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Instantly sets the object's energy to zero.
     */
    die() {
        this.energy = 0;
    }
}