/**
 * Represents a background layer or object in the game world.
 * Extends MoveableObject to allow for potential scrolling or parallax effects.
 */
class BackGroundObject extends MoveableObject {

    /** @type {number} The standard width of a background segment, usually matching the canvas width. */
    width = 720;
    /** @type {number} The standard height of a background segment, usually matching the canvas height. */
    height = 480;
    /** @type {number} The X-coordinate position where this background segment begins. */
    x;
    /** @type {number} The Y-coordinate position where this background segment begins. */
    y;

    /**
     * Creates a new background object.
     * @param {string} imagePath - The file path to the background image.
     * @param {number} x - The initial X-position (used for tiling segments side-by-side).
     * @param {number} y - The initial Y-position (usually 0 for full-screen backgrounds).
     */
    constructor(imagePath, x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(imagePath);
    }    
}