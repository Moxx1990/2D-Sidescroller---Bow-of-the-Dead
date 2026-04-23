/**
 * Represents a collectible arrow item in the game world.
 * Extends MoveableObject and includes custom rendering logic for a glowing effect 
 * and a 90-degree rotation for vertical display.
 */
class CollectibleArrow extends MoveableObject {

    /** @type {number} Rendering width of the arrow. */
    width = 50;
    /** @type {number} Rendering height of the arrow. */
    height = 100;
    /** @type {string} Color of the outer glow effect (Yellow/Gold). */
    glowColor = 'rgba(255, 255, 0, 0.7)';
    /** @type {number} The intensity/size of the shadow blur. */
    glowBlur = 20;

    /**
     * Creates an instance of a collectible arrow.
     * @param {number} x - The X-coordinate for the arrow's position.
     * @param {number} y - The Y-coordinate for the arrow's position.
     */
    constructor(x, y) {
        super()
        this.loadImage('img/Character/Arrow.png');
        this.x = x;
        this.y = y;
        this.offsetLeft = 15;
        this.offsetRight = 15;
        this.offsetTop = 15;
        this.offsetBottom = 15;
    }

    /**
     * Renders the arrow with a glow effect and a rotation.
     * Saves the current canvas state, applies shadow and rotation, and restores it afterwards.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        ctx.save();
        this.setShadow(ctx);
        this.drawRotatedImage(ctx);
        ctx.restore();
    }

    /**
     * Configures the shadow/glow settings on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    setShadow(ctx) {
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = this.glowBlur;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    /**
     * Rotates the canvas context by -90 degrees around the arrow's center and draws the image.
     * This is used to display the arrow vertically if the source image is horizontal.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    drawRotatedImage(ctx) {
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(-90 * Math.PI / 180);
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    }
}