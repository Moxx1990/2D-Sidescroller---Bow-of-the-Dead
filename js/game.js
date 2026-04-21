let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;


function init() {
    canvas = document.getElementById("canvas");
    buttonPressedEvents();
    buttonUnpressedEvents();
};

function startGame() {
    initLevel();
    
    // Startbildschirm weg
    document.getElementById('startScreen').classList.add('d-none');

    // HUD herholen
    let hud = document.getElementById('hud');
    if (hud) {
        hud.classList.remove('d-none'); // Entfernt display: none, aktiviert display: flex aus dem Media-Query
    }

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
}

function restartGame() {
    // 1. Die alte Welt stoppen, falls sie existiert
    if (world) {
        // Musik pausieren und an den Anfang zurücksetzen
        world.background_music.pause();
        world.background_music.currentTime = 0;
        
        // Alle laufenden Intervalle (Bewegungen, Kollisionen) stoppen
        world.clearAllIntervals();
    }

    // 2. UI aufräumen
    document.getElementById('gameOverScreen').classList.add('d-none');
    
    // 3. Level neu initialisieren und neue Welt starten
    initLevel(); 
    world = new World(canvas, keyboard, level1);
}

function showControlls() {
    document.getElementById('controlls').classList.remove('d-none');
}

function closeControlls() {
    document.getElementById('controlls').classList.add('d-none');
}

function toggleMute() {
    isMuted = !isMuted;
    // Sound in der World aktualisieren
    if (world) {
        world.background_music.muted = isMuted;
    }
    // Button-Text anpassen (optional)
    console.log("Muted: " + isMuted);
}

function openFullscreen() {
    let container = document.getElementById('game');
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) { /* Safari */
        container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) { /* IE11 */
        container.msRequestFullscreen();
    }
}

window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
        keyboard.left = true;
    }
    if (e.key == "ArrowRight") {
        keyboard.right = true;
    }
    if (e.key == "ArrowUp") {
        keyboard.up = true;
    }
    if (e.key == "ArrowDown") {
        keyboard.down = true;
    }
    if (e.key == " ") {
        keyboard.space = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowLeft") {
        keyboard.left = false;
    }
    if (e.key == "ArrowRight") {
        keyboard.right = false;
    }
    if (e.key == "ArrowUp") {
        keyboard.up = false;
    }
    if (e.key == "ArrowDown") {
        keyboard.down = false;
    }
    if (e.key == " ") {
        keyboard.space = false;
    }
});

function buttonPressedEvents() {
const mobileButtons = ["btnLeft", "btnRight", "btnUp", "btnSpace"];
    
    mobileButtons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener("touchstart", (e) => {
                e.preventDefault(); // Verhindert Zoom und Kontextmenü nur auf dem Button
                // Deine Logik (z.B. keyboard.left = true)
            });
            
            // Verhindert das Kontextmenü spezifisch auf diesem Button
            btn.oncontextmenu = function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            };
        }
    });
    document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.left = true;});
    document.getElementById("btnRight").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.right = true;});
    document.getElementById("btnUp").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.up = true;});
    document.getElementById("btnSpace").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.space = true;});
};

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