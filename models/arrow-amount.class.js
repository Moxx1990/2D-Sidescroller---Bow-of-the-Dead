/**
 * Represents the UI element for displaying the current number of arrows available to the player.
 * Extends DrawableObject and renders an arrow icon alongside a dynamic text counter.
 */
class ArrowAmount extends DrawableObject {
    
    arrows = 3;

    /**
     * Initializes the arrow counter UI element with its icon, screen position, and dimensions.
     */
    constructor() {
        super();
        this.loadImage('img/Character/Arrow.png');
        this.x = 30;
        this.y = 45;
        this.width = 40;
        this.height = 40;
    }

    /**
     * Renders the arrow icon and the current count as text on the canvas.
     * The text is positioned relative to the icon's coordinates.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("x " + this.arrows, this.x + 50, this.y + 32); 
    }

    /**
     * Updates the internal arrow count to be displayed.
     * @param {number} amount - The new total amount of available arrows.
     */
    setArrows(amount) {
        this.arrows = amount;
    }
}