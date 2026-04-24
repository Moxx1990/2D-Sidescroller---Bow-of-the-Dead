/**
 * Represents the final boss of the game.
 * Extends MoveableObject and features higher health, larger dimensions, 
 * and a fixed starting position at the end of the level.
 */
class Endboss extends MoveableObject {

    energy = 5;
    height = 350;
    width = 250;
    y = 70;
    currentWalkFrame = 0;
    totalWalkFrames = 6; 
    currentDeathFrame = 0;
    totalDeathFrames = 5; 
    frameWidth = 128;
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
        this.x = 2100;
        this.speed = 0.7;
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