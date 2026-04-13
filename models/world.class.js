class World {

character = new Character();
level;
canvas;
ctx;
keyboard;
camera_x = 0;
statusBar = new StatusBar();
throwableObjects = [];
background_music = new Audio('audio/music.mp3');

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.setWorld();     
        this.run();
        this.draw();
        this.playBackgroundMusic();
    }

    setWorld() {
        this.character.world = this;
    }

 run() {
    setInterval(() => {
        // NUR ausführen, wenn this.level existiert UND enemies hat
        if (this.level && this.level.enemies) {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkArrowCollisions();
        }
    }, 50);
}

    playBackgroundMusic() {
        this.background_music.loop = true; 
        this.background_music.volume = 0.2; 
        this.background_music.play();
    }

    checkCollisions() {
 if (!enemy.isDead() && this.character.isColliding(enemy)) {
    // 1. Check: Kommt der Charakter von oben? (speedY < 0 bedeutet er fällt)
    if (this.character.isAboveGround() && this.character.speedY < 0) {
        enemy.die(); 
        // WICHTIG: Gib dem Charakter einen kleinen Rückstoß nach oben, 
        // damit er nicht direkt danach den Boden-Schaden vom Gegner frisst
        this.character.speedY = 15; 
    } else {
        // 2. Normaler Schaden
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }
}
}

checkThrowObjects() {
    if (this.keyboard.SPACE) {
        let arrow = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(arrow);
        // Optional: Hier ein kurzes Timeout einbauen, damit man nicht 100 Pfeile pro Sekunde schießt
    }
}

   checkArrowCollisions() {
    this.throwableObjects.forEach((arrow, arrowIndex) => {
        this.level.enemies.forEach((enemy) => {
            // Wir nutzen hier die Standard 'isColliding' Methode, die auch der Charakter nutzt!
            // Das ist viel sicherer als die manuelle Formel.
            if (!enemy.isDead() && arrow.isColliding(enemy)) {
                enemy.hit(); // Schaden beim Gegner
                arrow.hit(); // Der Pfeil sollte auch "zerstört" werden (z.B. x auf -1000 setzen)
                this.throwableObjects.splice(arrowIndex, 1); // Pfeil entfernen
                console.log('Boss getroffen! Energie:', enemy.energy);
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

draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Kamera vorwärts schieben
    this.ctx.translate(this.camera_x, 0);

    // 1. Hintergründe
    this.addObjectsToMap(this.level.backgrounds);

    // 2. Der Charakter
    this.addToMap(this.character);

    // NEU: Die geworfenen Objekte (Pfeile) zeichnen
    this.addObjectsToMap(this.throwableObjects);

    // 3. Die Gegner
    this.addObjectsToMap(this.level.enemies);
    
    // 4. Wolken (falls vorhanden)
    if (this.level.clouds) {
        this.addObjectsToMap(this.level.clouds);
    }

    // Kamera zurückschieben
    this.ctx.translate(-this.camera_x, 0);

    // 5. Statusbar (Fixiert auf dem Bildschirm, daher nach translate zurück)
    if (this.statusBar) {
        this.addToMap(this.statusBar);
    }

    // Zeichnen-Schleife
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
    // 1. Grundsätzlicher Check: Wenn kein Bild da ist, können wir nichts zeichnen
    if (!mo || !mo.img) return;

    // 2. Spiegeln, falls nötig
    if (mo.otherDirection) {
        this.flipImage(mo);
    }

    // 3. Zeichnen
    // Wenn das Objekt Animationen unterstützt UND das Bild bereit ist
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
        // Standard-Zeichnen (ruft die draw() Methode aus DrawableObject auf)
        mo.draw(this.ctx);
    }

    // 4. Debug-Frame (optional)
    if (mo.drawFrame) {
        mo.drawFrame(this.ctx);
    }

    // 5. Spiegelung zurücksetzen
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