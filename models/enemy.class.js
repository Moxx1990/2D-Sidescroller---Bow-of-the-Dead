class Enemy extends MoveableObject {
    energy = 1;
    height = 150;
    width = 200;
    
    currentWalkFrame = 0;
    totalWalkFrames = 6;
    currentDeathFrame = 0;
    totalDeathFrames = 5;
    frameWidth = 128;
    frameHeight = 128;

    constructor() {
        super();
        this.offsetLeft = 110;
        this.offsetRight = 110;
        this.offsetTop = 80;
        this.offsetBottom = 20;
        this.loadImage('img/Enemy/Basic/Walk.png');
        this.deathSheet = new Image();
        this.deathSheet.src = 'img/Enemy/Basic/Dead.png';
        this.x = 700 + Math.random() * 1000;
        this.speed = 0.15 + Math.random() * 0.25;
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