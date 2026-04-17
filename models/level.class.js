class Level {
    enemies;
    backgrounds;
    collectibleArrows;
    level_end_x = 2100

    constructor(enemies, backgrounds, collectibleArrows, sakes) {
        this.enemies = enemies;
        this.backgrounds = backgrounds;
        this.collectibleArrows = collectibleArrows;
        this.sakes = sakes;
    }
}