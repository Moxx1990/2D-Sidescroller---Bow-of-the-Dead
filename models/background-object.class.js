/**
 * Represents a background layer or object in the game world.
 * Extends MoveableObject to allow for potential scrolling or parallax effects.
 */
class BackGroundObject extends MoveableObject {

    width = 720;
    height = 480;
    x;
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