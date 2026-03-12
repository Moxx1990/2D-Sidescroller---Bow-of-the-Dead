class BackGroundObject extends MoveableObject {

    width = 720;
    height = 480;
    x;
    y;

    constructor(imagePath, x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(imagePath);
    }
    
}