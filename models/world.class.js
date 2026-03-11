class World {

character = new Character();
enemies = [
    new Enemy(),
    new Enemy(),
    new Enemy(),
];
clouds = [
    new Cloud(),
];
backgrounds = [
    new BackGroundObject('img/Background/Sky.png', 0, 0),
    new BackGroundObject('img/Background/Clouds.png', 0, 0),
    new BackGroundObject('img/Background/Mountain_Back.png', 0, 0),
    new BackGroundObject('img/Background/Mountain_Middle.png', 0, 0),
    new BackGroundObject('img/Background/Mountain_Front.png', 0, 0),
    new BackGroundObject('img/Background/Fuji.png', 0, 0),
    new BackGroundObject('img/Background/Shrine_Multiple.png', 0, 0),
    new BackGroundObject('img/Background/BackgroundTrees.png', 0, 0),
    new BackGroundObject('img/Background/Ground.png', 0, 0),
];
canvas;
ctx;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgrounds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
    if (mo.getFrameX) {
        this.ctx.drawImage(
            mo.img,
            mo.getFrameX(),
            0,
            mo.frameWidth,
            mo.frameHeight,
            mo.x,
            mo.y,
            mo.width,
            mo.height
        );
    } else {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }}

}