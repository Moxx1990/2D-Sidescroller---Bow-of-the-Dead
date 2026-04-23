/**
 * Represents the health status bar displayed on the screen.
 * Extends DrawableObject to render visual updates based on the character's health.
 */
class StatusBar extends DrawableObject {

    /** @type {string[]} Array of image paths representing different health levels (0% to 100%). */
    IMAGES = [
        "img/Statusbar/health/green/0.png",
        "img/Statusbar/health/green/20.png",
        "img/Statusbar/health/green/40.png",
        "img/Statusbar/health/green/60.png",
        "img/Statusbar/health/green/80.png",
        "img/Statusbar/health/green/100.png"
    ];

    /** @type {number} Current health state represented as a value from 0 to 5. */
    percentage = 5;

    /**
     * Initializes the status bar, loads images, and sets default positioning and health.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(5);
    }

    /**
     * Updates the health bar's percentage and switches the displayed image accordingly.
     * @param {number} energy - The current energy level of the character.
     */
    setPercentage(energy) {
        this.percentage = energy; 
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index for the IMAGES array based on the current percentage.
     * @returns {number} The index (0-5) corresponding to the correct health image.
     */
    resolveImageIndex() {
        if (this.percentage >= 5) return 5;
        if (this.percentage == 4) return 4;
        if (this.percentage == 3) return 3;
        if (this.percentage == 2) return 2;
        if (this.percentage == 1) return 1;
        return 0; 
    }
}