class StatusBar {

    IMAGES = [
        "img/Statusbar/1_statusbar_coin/blue/0.png",
        "img/Statusbar/1_statusbar_coin/blue/20.png",
        "img/Statusbar/1_statusbar_coin/blue/40.png",
        "img/Statusbar/1_statusbar_coin/blue/60.png",
        "img/Statusbar/1_statusbar_coin/blue/80.png",
        "img/Statusbar/1_statusbar_coin/blue/100.png"
    ];

    percentage = 100;

    constructor() {
        this.loadImages(this.IMAGES);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
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