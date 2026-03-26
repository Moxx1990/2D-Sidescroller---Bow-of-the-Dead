class ThrowableObject extends MoveableObject {

    constructor(x, y) {
        super().loadImage('img/Character/Arrow.png')
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 50;
        this.shoot();

    }

    shoot() {
        this.speedY = 15;
        this.applyGravity();
        setInterval( () => {
            this.x += 25;
        }, 25);
    }
    

}