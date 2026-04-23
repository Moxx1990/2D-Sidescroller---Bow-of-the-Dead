/**
 * Represents a collectible sake bottle item in the game world.
 * Extends MoveableObject and features a custom rendering method to create a glowing animation effect.
 */
class CollectibleSake extends MoveableObject {
    
    /** @type {number} Rendering width of the sake bottle. */
    width = 20;
    /** @type {number} Rendering height of the sake bottle. */
    height = 20;
    /** @type {string} Color of the glow effect (RGBA). */
    glowColor = 'rgba(255, 255, 255, 0.8)';
    /** @type {number} Counter used to calculate the sine-wave for the pulsating glow animation. */
    glowAnimationStep = 0;

    /**
     * Creates an instance of a collectible sake bottle.
     * @param {number} x - The X-coordinate for the bottle's position.
     * @param {number} y - The Y-coordinate for the bottle's position.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/Statusbar/collect/Sake.png');
        this.x = x;
        this.y = y;
        this.offsetLeft = 5;
        this.offsetRight = 5;
        this.offsetTop = 5;
        this.offsetBottom = 5;
    }

    /**
     * Renders the sake bottle with a pulsating glow effect.
     * Overrides the standard draw method to apply shadowBlur based on a sine wave.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        ctx.save();
        this.glowAnimationStep += 0.05;
        let currentBlur = 10 + Math.sin(this.glowAnimationStep) * 8;
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = currentBlur;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}