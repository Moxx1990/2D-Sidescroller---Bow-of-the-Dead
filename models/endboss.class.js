class Endboss extends MoveableObject {

    energy = 3;
    height = 350;
    width = 250;
    y = 70;
    
    // Diese Variablen MÜSSEN vorhanden sein für playEnemyAnimation()
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
        // WICHTIG: Das Todesbild vorab laden, damit der "broken state" Fehler verschwindet
        this.deathSheet = new Image();
        this.deathSheet.src = 'img/Enemy/Basic/Dead.png'; 

        this.x = 2050;
        this.speed = 0.15;
        this.playEnemyAnimation();
    }

    // Wir überschreiben animateDeath nur ganz kurz, um das Bild zu tauschen
    animateDeath() {
        this.img = this.deathSheet; // Bild direkt tauschen ohne neu zu laden
        super.animateDeath(); // Restliche Logik aus MoveableObject nutzen
    }

    hit() {
        this.energy -= 1;
    }

    getFrameX() {
        return this.currentFrame * this.frameWidth;
    }
}