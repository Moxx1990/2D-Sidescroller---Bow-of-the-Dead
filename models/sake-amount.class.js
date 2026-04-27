/**
 * Represents the UI element for displaying the amount of collected sake bottles.
 * Extends DrawableObject and renders both an icon and a dynamic text counter.
 */
class SakeAmount extends DrawableObject {
    
    sakeCount = 0;

    /**
     * Initializes the sake counter UI element with its icon, position, and dimensions.
     */
    constructor() {
        super();
        this.loadImage('img/Statusbar/collect/Sake.png');
        this.x = 30;
        this.y = 100;
        this.width = 30;
        this.height = 30;
    }

    /**
     * Renders the sake icon and the current count as text onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = "24px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("x " + this.sakeCount, this.x + 50, this.y + 30);
    }

    /**
     * Updates the internal sake count to be displayed.
     * @param {number} count - The new total amount of collected sake.
     */
    setSake(count) {
        this.sakeCount = count;
    }
}