/**
 * Represents a level in the game, acting as a container for all level-specific objects.
 * It holds enemies, background layers, and collectibles, and defines the level's boundaries.
 */
class Level {

    enemies;
    backgrounds;
    collectibleArrows;
    sakes;
    level_end_x = 2100;

    /**
     * Creates an instance of a level.
     * @param {Enemy[]} enemies - List of enemies to be spawned.
     * @param {BackGroundObject[]} backgrounds - List of background elements to be rendered.
     * @param {CollectibleArrow[]} collectibleArrows - List of arrows to be placed in the level.
     * @param {CollectibleSake[]} sakes - List of sake bottles to be placed in the level.
     */
    constructor(enemies, backgrounds, collectibleArrows, sakes) {
        this.enemies = enemies;
        this.backgrounds = backgrounds;
        this.collectibleArrows = collectibleArrows;
        this.sakes = sakes;
    }
}