let level1;

/**
 * Initializes the first level by instantiating the Level class with all its game objects.
 * This includes enemies, the background layers, collectible arrows, and sake bottles.
 * The background objects are positioned in 720-pixel increments to create a seamless scrolling effect.
 */
function initLevel() {
    level1 = new Level(
    [
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Endboss(),
    ], 

    [
    new BackGroundObject('img/Background/Sky.png', -720, 0),
    new BackGroundObject('img/Background/Clouds.png', -720, 0),
    new BackGroundObject('img/Background/Mountain_Back.png', -720, 0),
    new BackGroundObject('img/Background/Mountain_Middle.png', -720, 0),
    new BackGroundObject('img/Background/Mountain_Front.png', -720, 0),
    new BackGroundObject('img/Background/BackgroundTrees.png', -720, 0),
    new BackGroundObject('img/Background/Ground.png', -720, 0),
    new BackGroundObject('img/Background/Sky.png', 0, 0),
    new BackGroundObject('img/Background/Clouds.png', 0, 0),
    new BackGroundObject('img/Background/Mountain_Back.png', 0, 0),
    new BackGroundObject('img/Background/Mountain_Middle.png', 0, 0),
    new BackGroundObject('img/Background/Mountain_Front.png', 0, 0),
    new BackGroundObject('img/Background/Fuji.png', 0, 0),
    new BackGroundObject('img/Background/Shrine_Multiple.png', 0, 0),
    new BackGroundObject('img/Background/BackgroundTrees.png', 0, 0),
    new BackGroundObject('img/Background/Ground.png', 0, 0),
    new BackGroundObject('img/Background/Sky.png', 720, 0),
    new BackGroundObject('img/Background/Clouds.png', 720, 0),
    new BackGroundObject('img/Background/Mountain_Back.png', 720, 0),
    new BackGroundObject('img/Background/Mountain_Middle.png', 720, 0),
    new BackGroundObject('img/Background/Mountain_Front.png', 720, 0),
    new BackGroundObject('img/Background/BackgroundTrees.png', 720, 0),
    new BackGroundObject('img/Background/House.png', 720, 0),
    new BackGroundObject('img/Background/Ground.png', 720, 0),
    new BackGroundObject('img/Background/Sky.png', 720*2, 0),
    new BackGroundObject('img/Background/Clouds.png', 720*2, 0),
    new BackGroundObject('img/Background/Mountain_Back.png', 720*2, 0),
    new BackGroundObject('img/Background/Mountain_Middle.png', 720*2, 0),
    new BackGroundObject('img/Background/Mountain_Front.png', 720*2, 0),
    new BackGroundObject('img/Background/BackgroundTrees.png', 720*2, 0),
    new BackGroundObject('img/Background/Shrine_Single.png', 720*2, 0),
    new BackGroundObject('img/Background/Ground.png', 720*2, 0),
    new BackGroundObject('img/Background/Sky.png', 720*3, 0),
    new BackGroundObject('img/Background/Clouds.png', 720*3, 0),
    new BackGroundObject('img/Background/Mountain_Back.png', 720*3, 0),
    new BackGroundObject('img/Background/Mountain_Middle.png', 720*3, 0),
    new BackGroundObject('img/Background/Mountain_Front.png', 720*3, 0),
    new BackGroundObject('img/Background/BackgroundTrees.png', 720*3, 0),
    new BackGroundObject('img/Background/House.png', 720*3, 0),
    new BackGroundObject('img/Background/Ground.png', 720*3, 0),
    ], 

     [
        new CollectibleArrow(500, 300),
        new CollectibleArrow(800, 100),
        new CollectibleArrow(1400, 200)
    ],

    [
        new CollectibleSake(500, 200),
        new CollectibleSake(600, 150),
        new CollectibleSake(1100, 250),
        new CollectibleSake(700, 200),
        new CollectibleSake(800, 150),
        new CollectibleSake(900, 200),
        new CollectibleSake(1000, 150),
        new CollectibleSake(1200, 200),
        new CollectibleSake(1300, 150),
    ]
);
}