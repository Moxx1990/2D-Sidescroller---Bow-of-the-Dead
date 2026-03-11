class BackGroundObject extends MoveableObject {

    width = 720;
    height = 480;

    constructor(imagePath, x, y) {
        super();
        this.x = 720 - this.width;
        this.y = 480 - this.height;
        this.loadImage(imagePath);
    }
    
}