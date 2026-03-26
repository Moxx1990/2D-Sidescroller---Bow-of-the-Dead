class MoveableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelaration = 2.5;
    energy = 100;
    lastHit = 0;

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
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        }, 150);
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    jump() {
        this.speedY = 25;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    isDead() {
        return this.energy == 0;
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