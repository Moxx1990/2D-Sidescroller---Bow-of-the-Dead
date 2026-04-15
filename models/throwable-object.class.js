class ThrowableObject extends MoveableObject {


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

    shoot() {
        this.speedY = 15;
        this.applyGravity();
        setInterval( () => {
            this.x += 25;
        }, 25);
    }
    

}