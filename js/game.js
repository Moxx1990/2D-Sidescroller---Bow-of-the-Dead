let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    buttonPressedEvents();
    buttonUnpressedEvents();
};

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
    document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.left = true;
    });
    document.getElementById("btnRight").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.right = true;
    });
    document.getElementById("btnUp").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.up = true;
    });
    document.getElementById("btnSpace").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.space = true;
    });
};

function buttonUnpressedEvents() {
    document.getElementById("btnLeft").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.left = false;
    });
    document.getElementById("btnRight").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.right = false;
    });
    document.getElementById("btnUp").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.up = false;
    });
    document.getElementById("btnSpace").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.space = false;
    });
}