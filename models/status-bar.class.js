class StatusBar extends DrawableObject {

    IMAGES_HEALTH = [
        "img/Statusbar/health/green/0.png",
        "img/Statusbar/health/green/20.png",
        "img/Statusbar/health/green/40.png",
        "img/Statusbar/health/green/60.png",
        "img/Statusbar/health/green/80.png",
        "img/Statusbar/health/green/100.png"
    ];

    IMAGES_COIN = [
        "img/Statusbar/coin/orange/0.png",
        "img/Statusbar/coin/orange/20.png",
        "img/Statusbar/coin/orange/40.png",
        "img/Statusbar/coin/orange/60.png",
        "img/Statusbar/coin/orange/80.png",
        "img/Statusbar/coin/orange/100.png"
    ];

    IMAGES_BOW = [
        "img/Statusbar/bow/blue/0.png",
        "img/Statusbar/bow/blue/20.png",
        "img/Statusbar/bow/blue/40.png",
        "img/Statusbar/bow/blue/60.png",
        "img/Statusbar/bow/blue/80.png",
        "img/Statusbar/bow/blue/100.png"
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 30;
        this.y = 20;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}