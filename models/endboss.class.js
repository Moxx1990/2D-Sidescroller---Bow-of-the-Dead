/**
 * Represents the final boss of the game.
 * Extends MoveableObject and features higher health, larger dimensions, 
 * and a fixed starting position at the end of the level.
 */
class Endboss extends MoveableObject {

    /** @type {number} The total health points of the boss. */
    energy = 3;
    /** @type {number} Rendering height of the boss sprite. */
    height = 350;
    /** @type {number} Rendering width of the boss sprite. */
    width = 250;
    /** @type {number} Initial vertical position on the canvas. */
    y = 70;
    /** @type {number} Current index in the walking animation sequence. */
    currentWalkFrame = 0;
    /** @type {number} Total number of frames in the walking sprite sheet. */
    totalWalkFrames = 6; 
    /** @type {number} Current index in the death animation sequence. */
    currentDeathFrame = 0;
    /** @type {number} Total number of frames in the death sprite sheet. */
    totalDeathFrames = 5; 
    /** @type {number} The width of an individual frame in the sprite sheet. */
    frameWidth = 128;
    /** @type {number} The height of an individual frame in the sprite sheet. */
    frameHeight = 128;

    /**
     * Creates an instance of the Endboss.
     * Sets specific hitbox offsets, loads textures, and positions the boss at the level's end.
     */
    constructor() {
        super();
        this.offsetLeft = 140;
        this.offsetRight = 130;
        this.offsetTop = 100;
        this.offsetBottom = 20;
        this.loadImage('img/Enemy/Basic/Walk.png');
        this.deathSheet = new Image();
        this.deathSheet.src = 'img/Enemy/Basic/Dead.png';
        this.x = 2050;
        this.speed = 0.15;
        this.playEnemyAnimation();
    }

    /**
     * Changes the texture to the death sprite sheet and advances the death animation.
     * Overrides the default behavior to handle boss-specific death visuals.
     */
    animateDeath() {
        this.img = this.deathSheet;
        super.animateDeath();
    }

    /**
     * Reduces the boss's energy by one point per hit.
     */
    hit() {
        this.energy -= 1;
    }

    /**
     * Calculates the horizontal pixel offset for the current frame on the sprite sheet.
     * @returns {number} The X-coordinate for the drawImage source clipping.
     */
    getFrameX() {
        return this.currentFrame * this.frameWidth;
    }
}