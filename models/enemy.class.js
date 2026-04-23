/**
 * Represents a standard enemy in the game.
 * Extends MoveableObject and manages specific animations for walking and dying using sprite sheets.
 */
class Enemy extends MoveableObject {

   /** @type {number} Health points of the basic enemy. */
    energy = 1;
    /** @type {number} Rendering height on the canvas. */
    height = 150;
    /** @type {number} Rendering width on the canvas. */
    width = 200;
   /** @type {number} The current frame in the walking sequence. */
    currentWalkFrame = 0;
    /** @type {number} Total number of frames in the walking sprite sheet. */
    totalWalkFrames = 6;
    /** @type {number} The current frame in the death sequence. */
    currentDeathFrame = 0;
    /** @type {number} Total number of frames in the death sprite sheet. */
    totalDeathFrames = 5;
    /** @type {number} The width of a single frame within the sprite sheet image. */
    frameWidth = 128;
    /** @type {number} The height of a single frame within the sprite sheet image. */
    frameHeight = 128;

    /**
     * Creates an instance of an enemy.
     * Sets up hitboxes, loads textures, and randomizes the spawn position and movement speed.
     */
    constructor() {
        super();
        this.offsetLeft = 110;
        this.offsetRight = 120;
        this.offsetTop = 75;
        this.offsetBottom = 5;
        this.loadImage('img/Enemy/Basic/Walk.png');
        this.deathSheet = new Image();
        this.deathSheet.src = 'img/Enemy/Basic/Dead.png';
        this.x = 600 + Math.random() * 1000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.playEnemyAnimation();
    }

    /**
     * Swaps the current texture to the death sprite sheet and advances the death animation.
     * Overrides the animateDeath method from MoveableObject.
     */
    animateDeath() {
        this.img = this.deathSheet;
        super.animateDeath();
    }

    /**
     * Reduces the enemy's energy.
     * Basic enemies are typically defeated with a single hit.
     */
    hit() {
        this.energy -= 1;
    }

    /**
     * Calculates the horizontal X-coordinate of the current animation frame on the sprite sheet.
     * @returns {number} The X-pixel offset for the drawImage method.
     */
    getFrameX() {
        return this.currentFrame * this.frameWidth;
    }
  
}