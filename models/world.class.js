class World {

character = new Character();
enemies = level1.enemies;
clouds = level1.clouds;
backgrounds = level1.backgrounds
canvas;
ctx;
keyboard;
camera_x = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgrounds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

        this.ctx.translate(-this.camera_x, 0);
        

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
    if (mo.otherDirection) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;

    }
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
    }
    if (mo.otherDirection) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }}

}