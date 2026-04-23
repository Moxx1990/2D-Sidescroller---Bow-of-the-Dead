/** @type {HTMLCanvasElement} The main game canvas */
let canvas;

/** @type {World} The instance of the game world */
let world;

/** @type {Keyboard} Instance to manage user input states */
let keyboard = new Keyboard();

/** @type {boolean} Flag to track if the game audio is muted */
let isMuted = false;

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
}

/**
 * Restarts the game by clearing all intervals, resetting music, and re-initializing the world.
 */
function restartGame() {
    if (world) {
        world.background_music.pause();
        world.background_music.currentTime = 0;
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
    isMuted = !isMuted;
    if (world) {
        world.background_music.muted = isMuted;
        world.enemy_sound.muted = !world.enemy_sound.muted;
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