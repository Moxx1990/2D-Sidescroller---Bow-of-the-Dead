class CollectibleArrow extends MoveableObject {
    width = 50;
    height = 100;
    
    // Konfiguration für das Leuchten (Glow)
    glowColor = 'rgba(255, 255, 0, 0.7)'; // Gelb mit 70% Deckkraft
    glowBlur = 20; // Stärke der Unschärfe (höher = weicherer, größerer Glow)

    constructor(x, y) {
        super().loadImage('img/Character/Arrow.png');
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        ctx.save();
        ctx.shadowColor = this.glowColor; // Die gelbe Farbe des Leuchtens
        ctx.shadowBlur = this.glowBlur;   // Wie stark das Leuchten verschwommen ist
        ctx.shadowOffsetX = 0;           // Keine Verschiebung in X-Richtung
        ctx.shadowOffsetY = 0;           // Keine Verschiebung in Y-Richtung
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(-90 * Math.PI / 180);
        ctx.drawImage(
            this.img, 
            -this.width / 2, 
            -this.height / 2, 
            this.width, 
            this.height
        );
        ctx.restore(); 
    }
}