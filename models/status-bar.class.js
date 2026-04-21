class StatusBar extends DrawableObject {

    IMAGES = [
        "img/Statusbar/health/green/0.png",
        "img/Statusbar/health/green/20.png",
        "img/Statusbar/health/green/40.png",
        "img/Statusbar/health/green/60.png",
        "img/Statusbar/health/green/80.png",
        "img/Statusbar/health/green/100.png"
    ];

    percentage = 5;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(5);
    }

    setPercentage(energy) {
        this.percentage = energy; 
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage >= 5) return 5;
        if (this.percentage == 4) return 4;
        if (this.percentage == 3) return 3;
        if (this.percentage == 2) return 2;
        if (this.percentage == 1) return 1;
        return 0; 
    }
}