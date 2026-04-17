class MoveableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelaration = 2.5;
    energy = 100;
    lastHit = 0;
    offsetLeft = 0;
    offsetRight = 0;
    offsetTop = 0;
    offsetBottom = 0;
    currentFrame = 0;
    currentWalkFrame = 0;
    totalWalkFrames = 1;
    currentDeathFrame = 0;
    totalDeathFrames = 1;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    drawFrame(ctx) {
        
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(
        this.x + this.offsetLeft, 
        this.y + this.offsetTop, 
        this.width - this.offsetLeft - this.offsetRight, 
        this.height - this.offsetTop - this.offsetBottom
    );
            ctx.stroke();
        
    }

applyGravity() {
    setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.accelaration;
        }

        if (!this.isAboveGround()) {
            if (!(this instanceof ThrowableObject)) {
                // Probiere hier einen höheren Wert statt 260, z.B. 400
                this.y = 410 - (this.height - this.offsetBottom);
                this.speedY = 0;
            }
        }
    }, 1000 / 25);
}

isAboveGround() {
    if (this instanceof ThrowableObject) {
        return true;
    } else {
        // Hier muss dann natürlich auch der gleiche Wert (410) stehen
        return (this.y + this.height - this.offsetBottom) < 410;
    }
}

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    playEnemyAnimation() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.animateDeath();
            } else {
                this.animateWalk();
            }
        }, 150);
    }

    animateWalk() {
        this.currentWalkFrame = (this.currentWalkFrame + 1) % this.totalWalkFrames;
        this.currentFrame = this.currentWalkFrame;
    }

    animateDeath() {
        if (this.currentDeathFrame < this.totalDeathFrames - 1) {
            this.currentDeathFrame++;
        }
        this.currentFrame = this.currentDeathFrame;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    jump() {
        this.speedY = 25;
    }

    isColliding(mo) {
        return (
            this.x + this.width - this.offsetRight > mo.x + mo.offsetLeft &&
            this.y + this.height - this.offsetBottom > mo.y + mo.offsetTop &&
            this.x + this.offsetLeft < mo.x + mo.width - mo.offsetRight &&
            this.y + this.offsetTop < mo.y + mo.height - mo.offsetBottom
        );
    }

    isDead() {
        return this.energy <= 0;
    }

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    die() {
    this.energy = 0;
}
}