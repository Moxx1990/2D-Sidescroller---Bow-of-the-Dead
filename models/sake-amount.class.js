class SakeAmount extends DrawableObject {
    sakeCount = 0;

    constructor() {
        super();
        this.loadImage('img/Statusbar/collect/Sake.png'); // Ein kleines Icon für die Leiste
        this.x = 30;
        this.y = 150; // Position unter der Arrow-Anzeige
        this.width = 30;
        this.height = 30;
    }

    // Diese Methode wird in der World aufgerufen, um die Zahl zu zeichnen
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = "24px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("x " + this.sakeCount, this.x + 50, this.y + 30);
    }

    setSake(count) {
        this.sakeCount = count;
    }
}