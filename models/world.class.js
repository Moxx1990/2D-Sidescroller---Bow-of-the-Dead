class World {

character = new Character();
level = level1
canvas;
ctx;
keyboard;
camera_x = 0;
statusBar = new StatusBar();
throwableObjects = [];

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowobjects();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach( (enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }); 
    }

    checkThrowobjects() {
        if(this.keyboard.space) {
            let arrow = new ThrowableObject(this.character.x + 120, this.character.y + 40);
            this.throwableObjects.push(arrow);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgrounds);
        
        this.ctx.translate(-this.camera_x, 0);
        //--------Space for fixed objects--------
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);
        
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.clouds);
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
        this.flipImage(mo);
    }
    if (mo.getFrameX) {
        this.ctx.drawImage(
            mo.img, mo.getFrameX(), 0, mo.frameWidth, mo.frameHeight, mo.x, mo.y, mo.width, mo.height
        );
        mo.drawFrame(this.ctx);
    } else {
        mo.draw(this.ctx);
    }
    if (mo.otherDirection) {
        this.flipImageBack(mo);
    }}

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}