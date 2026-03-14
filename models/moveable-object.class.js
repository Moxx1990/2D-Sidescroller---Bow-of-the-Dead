class MoveableObject {
    x = 120;
    y = 270;
    img;
    height = 150;
    width = 200;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelaration = 2.5;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.accelaration;}
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 180;
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation() {
        this.moveLeft();
        this.otherDirection = true;
        setInterval(() => {
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        }, 150);
    }

}