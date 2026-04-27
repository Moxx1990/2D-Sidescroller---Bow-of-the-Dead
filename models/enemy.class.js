/**
 * Represents a standard enemy in the game.
 * Extends MoveableObject and manages specific animations for walking and dying using sprite sheets.
 */
class Enemy extends MoveableObject {

    energy = 1;
    height = 150;
    width = 200;
    currentWalkFrame = 0;
    totalWalkFrames = 6;
    currentDeathFrame = 0;
    totalDeathFrames = 5;
    frameWidth = 128;
    frameHeight = 128;

    /**
     * Creates an instance of an enemy.
     * Sets up hitboxes, loads textures, and randomizes the spawn position and movement speed.
     */
    constructor() {
        super();
        this.offsetLeft = 110;
        this.offsetRight = 100;
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