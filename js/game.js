let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = localStorage.getItem('gameMuted') === 'true';

/**
 * Initializes the basic game setup by fetching the canvas and binding button events.
 */
function init() {
    canvas = document.getElementById("canvas");
    buttonPressedEvents();
    buttonUnpressedEvents();
};

/**
 * Starts the game, initializes the level, hides the start screen, and creates the world instance.
 */
function startGame() {
    initLevel();
    document.getElementById('startScreen').classList.add('d-none');
    let hud = document.getElementById('hud');
    if (hud) {
        hud.classList.remove('d-none'); 
    }
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
    document.getElementById('restartButton').classList.remove('d-none');
}

/**
 * Restarts the game by clearing all intervals, resetting music, and re-initializing the world.
 */
function restartGame() {
    if (world) {
        world.background_music.pause();
        world.background_music.currentTime = 0;
        world.stopEnemySound();
        world.clearAllIntervals();
    }
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    initLevel(); 
    world = new World(canvas, keyboard, level1);
}

/**
 * Displays the controls/how-to-play overlay.
 */
function showControlls() {
    document.getElementById('controlls').classList.remove('d-none');
}

/**
 * Hides the controls/how-to-play overlay.
 */
function closeControlls() {
    document.getElementById('controlls').classList.add('d-none');
}

/**
 * Toggles the game's audio states between muted and unmuted.
 */
function toggleMute() {
    if (world) {
        world.gameIsMuted = !world.gameIsMuted;
        localStorage.setItem('gameMuted', world.gameIsMuted.toString());
        if (world.gameIsMuted) {
            stopAllSounds();
        } else {
            world.background_music.volume = 0.2;
            world.background_music.play();
        }
    }
}

/**
 * A helper function that pauses all currently running instances.
 */
function stopAllSounds() {
    if (world) {
        world.background_music.pause();
        world.character.walking_sound.pause();
        world.character.shooting_sound.pause();
        world.stopEnemySound();
        if (world.level && world.level.enemies) {
            world.level.enemies.forEach(enemy => {
                if (enemy.walking_sound) enemy.walking_sound.pause();
            });
        }
    }
}

/**
 * Requests fullscreen mode for the game container across different browsers.
 */
function openFullscreen() {
    let container = document.getElementById('game');
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
    }
}

/**
 * Global listener for keydown events to update the keyboard state.
 */
window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
        keyboard.left = true;}
    if (e.key == "ArrowRight") {
        keyboard.right = true;}
    if (e.key == "ArrowUp") {
        keyboard.up = true;}
    if (e.key == "ArrowDown") {
        keyboard.down = true;}
    if (e.key == " ") {
        keyboard.space = true;}
});

/**
 * Global listener for keyup events to update the keyboard state.
 */
window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowLeft") {
        keyboard.left = false;}
    if (e.key == "ArrowRight") {
        keyboard.right = false;}
    if (e.key == "ArrowUp") {
        keyboard.up = false;}
    if (e.key == "ArrowDown") {
        keyboard.down = false;}
    if (e.key == " ") {
        keyboard.space = false;}
});

/**
 * Binds touch events to mobile UI buttons and maps them to keyboard states.
 */
function buttonPressedEvents() {
    const controls = { btnLeft: "left", btnRight: "right", btnUp: "up", btnSpace: "space" };
    preventDefaultTouch(Object.keys(controls));
    
    Object.keys(controls).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener("touchstart", () => {
                keyboard[controls[id]] = true;
            });
            btn.addEventListener("touchend", () => {
                keyboard[controls[id]] = false;
            });
        }
    });
}

/**
 * Prevents default browser touch behavior (like zooming or context menus) for specific element IDs.
 * @param {string[]} ids - Array of element IDs to apply the prevention.
 */
function preventDefaultTouch(ids) {
    ids.forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener("touchstart", (e) => e.preventDefault());
        btn.oncontextmenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };
    });
}

/**
 * Explicitly binds touchend events to ensure keyboard states are reset when releasing buttons.
 */
function buttonUnpressedEvents() {
    document.getElementById("btnLeft").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.left = false;});
    document.getElementById("btnRight").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.right = false;});
    document.getElementById("btnUp").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.up = false;});
    document.getElementById("btnSpace").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.space = false;});
}