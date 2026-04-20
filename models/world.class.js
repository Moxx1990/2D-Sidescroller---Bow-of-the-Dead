class World {

character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    arrowAmount = new ArrowAmount();
    collectibleArrows = [];
    throwableObjects = [];
    background_music = new Audio('audio/music.mp3');

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.setWorld();  
        this.run();
        this.sakeAmount = new SakeAmount();
        this.draw();
        this.playBackgroundMusic();
    }

    setWorld() {
        this.character.world = this;
    }

 run() {
    setInterval(() => {
        if (this.level && this.level.enemies) {
            this.checkCollisions();
            this.checkArrowCollisions();
            this.checkGameOver();
            this.checkArrowPickups();
            this.checkSakeCollisions();
        }
    }, 1000 / 60);
}

    playBackgroundMusic() {
        this.background_music.loop = true; 
        this.background_music.volume = 0.2; 
        this.background_music.play();
    }

checkCollisions() {
    if (!this.level || !this.level.enemies) return;

    this.level.enemies.forEach((enemy) => {
        if (!enemy.isDead() && this.character.isColliding(enemy)) {
            if (this.character.isAboveGround() && this.character.speedY < 0) {
                enemy.hit();
                this.character.bounce();                
                if(enemy.isDead()) console.log('Gegner besiegt!');
            } else {
                if (!this.character.isHurt()) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        }
    });
}

checkArrowPickups() {
    this.level.collectibleArrows.forEach((arrow, index) => {
        if (this.character.isColliding(arrow)) {
            this.character.arrow++;
            this.arrowAmount.setArrows(this.character.arrow);
            this.level.collectibleArrows.splice(index, 1);
        }
    });
}

checkThrowObjects() {
    if (this.keyboard.SPACE) {
        let arrow = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(arrow);
    }
}

   checkArrowCollisions() {
    this.throwableObjects.forEach((arrow, arrowIndex) => {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && arrow.isColliding(enemy)) {
                enemy.hit();
                arrow.hit();
                this.throwableObjects.splice(arrowIndex, 1);
            }
        });
    });
}

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

checkGameOver() {
    if (this.character.energy <= 0 && !this.gameOverTriggered) {
        this.gameOverTriggered = true;
        this.background_music.pause();
        setTimeout(() => {
            this.clearAllIntervals();
            document.getElementById('gameOverScreen').classList.remove('d-none');
        }, 1500); 
    }
}

checkSakeCollisions() {
    this.level.sakes.forEach((sake, index) => {
        if (this.character.isColliding(sake)) {
            this.character.sake += 1; // Variable im Character muss vorhanden sein
            this.sakeAmount.setSake(this.character.sake); // Anzeige updaten
            this.level.sakes.splice(index, 1); // Flasche aus der Welt entfernen
            
            // Optional: Sound abspielen
            // this.collect_sound.play();
        }
    });
}

draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgrounds);
    this.addObjectsToMap(this.level.collectibleArrows);
    if (this.level.sakes) {
        this.addObjectsToMap(this.level.sakes); 
    }
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    if (this.level.clouds) {
        this.addObjectsToMap(this.level.clouds);
    }
    this.ctx.translate(-this.camera_x, 0);
    if (this.statusBar) {
        this.addToMap(this.statusBar);
    }
    // Hier wird die Zahl auf dem Bildschirm gezeichnet
this.addToMap(this.arrowAmount);
this.addToMap(this.sakeAmount);
    let self = this;
    requestAnimationFrame(function() {
        self.draw();
    });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

addToMap(mo) {
    if (!mo || !mo.img) return;
    if (mo.otherDirection) {
        this.flipImage(mo);
    }
    if (mo.getFrameX && mo.img.complete) {
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
        mo.draw(this.ctx);
    }
    if (mo.drawFrame) {
        mo.drawFrame(this.ctx);
    }
    if (mo.otherDirection) {
        this.flipImageBack(mo);
    }
}

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