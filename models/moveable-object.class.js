class MoveableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelaration = 2.5;
    energy = 100;
    lastHit = 0;
    offsetLeft = 35;
    offsetRight = 35;
    offsetTop = 10;
    offsetBottom = 10;
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
        if (this instanceof Character || this instanceof Enemy) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.accelaration;}
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 260;
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
}