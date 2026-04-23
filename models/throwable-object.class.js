/**
 * Represents a projectile (arrow) that can be thrown or shot by the character.
 * Extends the MoveableObject to inherit movement and gravity physics.
 */
class ThrowableObject extends MoveableObject {

    /**
     * Creates a new ThrowableObject at a specific position and starts the shooting logic.
     * @param {number} x - The starting X-coordinate (usually from the character).
     * @param {number} y - The starting Y-coordinate (usually from the character).
     */
    constructor(x, y) {
    super();
    this.loadImage('img/Character/Arrow.png');
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 60;
    this.offsetLeft = 0;
    this.offsetRight = 0;
    this.offsetTop = 0;
    this.offsetBottom = 0;    
    this.shoot();
    }

    /**
     * Initiates the projectile physics. 
     * Sets an initial upward speed (speedY) for an arc effect, applies gravity,
     * and starts a high-speed interval for horizontal movement.
     */
    shoot() {
        this.speedY = 15;
        this.applyGravity();
        setInterval( () => {
            this.x += 25;
        }, 25);
    }
}