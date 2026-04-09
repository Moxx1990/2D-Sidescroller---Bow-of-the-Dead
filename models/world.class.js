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
        }, 50);
    }

 checkCollisions() {
    this.level.enemies.forEach((enemy) => {
        if (!enemy.isDead() && this.character.isColliding(enemy)) {
            
            // Die Bedingung für den Kopf-Sprung:
            // 1. Charakter fällt (speedY < 0)
            // 2. UND Charakter ist in der Luft
            // 3. UND die Unterkante des Charakters ist über der Oberkante des Gegners
            if (this.character.speedY < 0 && 
                this.character.isAboveGround() && 
                (this.character.y + this.character.height) < (enemy.y + enemy.offsetTop + 50)) {
                
                enemy.hit(); // Gegner verliert Leben
                this.character.jump(); // Charakter hüpft nach Treffer wieder hoch
                console.log('Erfolgreich auf den Kopf gesprungen!');
                
            } else {
                // Falls er den Gegner berührt, aber NICHT von oben kommt:
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        }
    });
}

checkArrowCollisions() {
    this.throwableObjects.forEach((arrow, arrowIndex) => {
        this.level.enemies.forEach((enemy) => {
            // Nutze hier deine neue Funktion arrowIsHittingEnemy!
            if (!enemy.isDead() && this.arrowIsHittingEnemy(arrow, enemy)) {
                enemy.hit();
                this.throwableObjects.splice(arrowIndex, 1);
                console.log('Treffer! Energie übrig:', enemy.energy);
            }
        });
    });
}

// Eine extra Funktion nur für den Pfeil-Treffer
arrowIsHittingEnemy(arrow, enemy) {
    // Hier ignorieren wir die strengen Offsets des Gegners ein bisschen (+ 50 Spielraum)
    return  arrow.x + arrow.width > enemy.x + enemy.offsetLeft - 50 &&
            arrow.y + arrow.height > enemy.y + enemy.offsetTop &&
            arrow.x < enemy.x + enemy.width - enemy.offsetRight + 50 &&
            arrow.y < enemy.y + enemy.height - enemy.offsetBottom;
}

// Hilfsmethode zum sauberen Entfernen
removeEnemy(index) {
    // Optional: Hier könntest du eine Todes-Animation triggern
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
    if (!mo.img || !mo.img.complete || mo.img.naturalWidth === 0) {
        return; // Falls "broken" oder noch am Laden: Einfach nicht zeichnen
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