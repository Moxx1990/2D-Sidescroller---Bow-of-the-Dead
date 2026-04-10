class World {

character = new Character();
level = level1
canvas;
ctx;
keyboard;
camera_x = 0;
statusBar = new StatusBar();
throwableObjects = [];
background_music = new Audio('audio/music.mp3');

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.playBackgroundMusic();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkArrowCollisions();
        }, 50);
    }

    playBackgroundMusic() {
        this.background_music.loop = true; // Musik soll sich wiederholen
        this.background_music.volume = 0.2; // Etwas leiser, damit Sounds hörbar bleiben
        this.background_music.play();
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                if (this.character.speedY < 0 && 
                    this.character.isAboveGround() && 
                    (this.character.y + this.character.height) < (enemy.y + enemy.offsetTop + 50)) {
                    enemy.hit(); 
                    this.character.jump();
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkArrowCollisions() {
        this.throwableObjects.forEach((arrow, arrowIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (!enemy.isDead() && this.arrowIsHittingEnemy(arrow, enemy)) {
                    enemy.hit();
                    this.throwableObjects.splice(arrowIndex, 1);
                    console.log('Treffer! Energie übrig:', enemy.energy);
                }
            });
        });
    };

    arrowIsHittingEnemy(arrow, enemy) {
        return  arrow.x + arrow.width > enemy.x + enemy.offsetLeft - 50 &&
                arrow.y + arrow.height > enemy.y + enemy.offsetTop &&
                arrow.x < enemy.x + enemy.width - enemy.offsetRight + 50 &&
                arrow.y < enemy.y + enemy.height - enemy.offsetBottom;
    }

    removeEnemy(index) {
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 150);
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
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
    if (!mo.img || !mo.img.complete || mo.img.naturalWidth === 0) {
        return;
    }
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