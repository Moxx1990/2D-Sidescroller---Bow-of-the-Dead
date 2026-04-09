class Endboss extends MoveableObject {

    energy = 3;
    height = 350;
    width = 250;
    y = 70;
    currentWalkFrame = 0;
    totalWalkFrames = 6; 
    currentDeathFrame = 0;
    totalDeathFrames = 5; 
    frameWidth = 128;
    frameHeight = 128;

    constructor() {
        super();
        this.offsetLeft = 140;
        this.offsetRight = 130;
        this.offsetTop = 100;
        this.offsetBottom = 20;
        this.loadImage('img/Enemy/Basic/Walk.png');
        this.deathSheet = new Image();
        this.deathSheet.src = 'img/Enemy/Basic/Dead.png';
        this.x = 2050;
        this.speed = 0.15;
        this.playEnemyAnimation();
    }

    animateDeath() {
        this.img = this.deathSheet;
        super.animateDeath();
    }

    hit() {
        this.energy -= 1;
    }

    getFrameX() {
        return this.currentFrame * this.frameWidth;
    }
}