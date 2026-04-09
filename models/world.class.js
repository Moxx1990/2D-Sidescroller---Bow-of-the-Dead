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
            this.checkArrowCollisions();
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

    checkArrowCollisions() {
        this.throwableObjects.forEach((arrow, arrowIndex) => {

            this.level.enemies.forEach((enemy, enemyIndex) => {

                if (arrow.isColliding(enemy)) {
                    enemy.energy--;

                    this.throwableObjects.splice(arrowIndex, 1);

                    if (enemy.energy <= 0) {
                        this.level.enemies.splice(enemyIndex, 1);
                    }
                }
            });
        });
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

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}