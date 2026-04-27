/**
 * The base class for all objects that can be drawn on the canvas.
 * It handles basic image loading, image caching for animations, and the core rendering logic.
 */
class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 270;
    height = 150;
    width = 200;

    /**
     * Preloads multiple images into the image cache.
     * Used for objects with animations (like walking or jumping).
     * @param {string[]} arr - An array of file paths to the images.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Loads a single image for objects that don't have animations.
     * @param {string} path - The file path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the current image of the object onto the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

}