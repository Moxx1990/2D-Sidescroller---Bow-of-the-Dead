/**
 * Represents the game world where all objects, logic, and rendering come together.
 */
class World {

    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    gameWonTriggered = false;
    camera_x = 0;
    statusBar = new StatusBar();
    arrowAmount = new ArrowAmount();
    throwableObjects = [];
    background_music = new Audio('audio/music.mp3');
    enemy_sound = new Audio('audio/enemy.mp3');
    enemySoundPlaying = false;
    gameIsMuted = false;

    /**
     * Creates an instance of the World.
     * @param {HTMLCanvasElement} canvas - The game canvas.
     * @param {Keyboard} keyboard - The input handler.
     * @param {Level} level - The level data.
     */
    constructor(canvas, keyboard, level) {
        Object.assign(this, { canvas, keyboard, level, ctx: canvas.getContext('2d') });
        this.gameIsMuted = localStorage.getItem('gameMuted') === 'true';
        this.setWorld();
        this.run();
        this.sakeAmount = new SakeAmount();
        this.draw();
        this.gameIsMuted ? this.background_music.pause() : this.playBackgroundMusic();
    }

    /**
     * Links the character to the world instance to allow communication.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the main game logic interval (60 FPS).
     */
    run() {
        setInterval(() => {
            if (this.level && this.level.enemies) {
                this.checkCollisions();
                this.checkArrowCollisions();
                this.checkGameOver();
                this.checkWinCondition();
                this.checkArrowPickups();
                this.checkSakeCollisions();
                this.checkEnemySounds();
            }
        }, 1000 / 60);
    }

    /**
     * Configures and plays the background loop.
     */
    playBackgroundMusic() {
        this.background_music.loop = true; 
        this.background_music.volume = 0.2; 
        this.background_music.play();
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkCollisions() {
        if (!this.level?.enemies) return;
        this.level.enemies.forEach((enemy, index) => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    this.handleEnemyJumpHit(enemy, index);
                } else {
                    this.handleCharacterHit();
                }
            }
        });
    }

    /**
     * Handles the logic when the player jumps on an enemy's head.
     * @param {Enemy} enemy - The enemy that was hit.
     * @param {number} index - The index of the enemy in the level array.
     */
    handleEnemyJumpHit(enemy, index) {
        enemy.hit();
        this.character.bounce();
        if (enemy.isDead() && !(enemy instanceof Endboss)) {
            this.removeEnemy(index);
        }
    }

    /**
     * Handles logic when the character gets hit by an enemy.
     */
    handleCharacterHit() {
        if (!this.character.isHurt()) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks for collisions between character and collectible arrows.
     */
    checkArrowPickups() {
        this.level.collectibleArrows.forEach((arrow, index) => {
            if (this.character.isColliding(arrow)) {
                this.character.arrow++;
                this.arrowAmount.setArrows(this.character.arrow);
                this.level.collectibleArrows.splice(index, 1);
            }
        });
    }

    /**
     * Checks if active throwable objects (arrows) hit any enemies.
     */
    checkThrowObjects() {
        if (this.keyboard.SPACE) {
            let arrow = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(arrow);
        }
    }

   /**
     * Checks if active throwable objects (arrows) hit any enemies.
     */
    checkArrowCollisions() {
        this.throwableObjects.forEach((arrow, arrowIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (!enemy.isDead() && arrow.isColliding(enemy)) {
                    enemy.hit();
                    arrow.hit();
                    this.throwableObjects.splice(arrowIndex, 1);                
                if (enemy.isDead() && !(enemy instanceof Endboss)) {
                    this.removeEnemy(enemyIndex);
                    }
                }
            });
        });
    }

    /**
     * Evaluates if the victory conditions are met.
     */
    checkWinCondition() {
        if (this.allEnemiesDefeated() && !this.gameWonTriggered && !this.gameOverTriggered) {
            this.gameWonTriggered = true;
            this.stopAllRunningSounds();
            setTimeout(() => {
                this.clearAllIntervals();
                const sakeText = `Sake collected: ${this.character.sake}`;
                document.getElementById('sakeResult').innerHTML = sakeText;
                document.getElementById('winScreen').classList.remove('d-none');
            }, 1000);
        }
    }

    /**
     * Stops all active game sounds.
     */
    muteAllSounds() {
        this.gameIsMuted = true;
        localStorage.setItem('gameMuted', 'true');
        this.background_music.pause();
        this.character.walking_sound.pause();
        this.character.shooting_sound.pause();
        this.stopEnemySound();
        this.level.enemies.forEach(enemy => {
        if (enemy.walking_sound) {
            enemy.walking_sound.pause();
            }
        });
    }

    /**
     * Checks if all enemies (including the boss) are defeated.
     * @returns {boolean} True if all enemies are dead.
     */
    allEnemiesDefeated() {
        const boss = this.level.enemies.find(e => e instanceof Endboss);
        const normalEnemiesDead = this.level.enemies.every(e => e.isDead());
        return boss && boss.isDead() && normalEnemiesDead;
    }

    /**
     * Specialized collision detection for arrows and enemies with custom offsets.
     * @param {ThrowableObject} arrow - The flying arrow.
     * @param {Enemy} enemy - The target enemy.
     * @returns {boolean} True if the arrow hits the enemy's hitbox.
     */
    arrowIsHittingEnemy(arrow, enemy) {
        return  arrow.x + arrow.width > enemy.x + enemy.offsetLeft - 50 &&
                arrow.y + arrow.height > enemy.y + enemy.offsetTop &&
                arrow.x < enemy.x + enemy.width - enemy.offsetRight + 50 &&
                arrow.y < enemy.y + enemy.height - enemy.offsetBottom;
    }

    /**
     * Removes an enemy from the game after a short delay.
     * @param {number} index - Index in the enemies array.
     */
    removeEnemy(index) {
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 150);
    }

    /**
     * Checks if the character's health has reached zero to trigger game over.
     */
    checkGameOver() {
        if (this.character.energy <= 0 && !this.gameOverTriggered) {
            this.gameOverTriggered = true;
            this.background_music.pause();
            setTimeout(() => {
                this.clearAllIntervals();
                document.getElementById('gameOverScreen').classList.remove('d-none');
            }, 1500); 
        }
    }

    /**
     * Checks for collisions between the character and sake items.
     * Updates character stats and the UI (sakeAmount).
     */
    checkSakeCollisions() {
        this.level.sakes.forEach((sake, index) => {
            if (this.character.isColliding(sake)) {
                this.character.sake += 1;
                this.sakeAmount.setSake(this.character.sake);
                this.level.sakes.splice(index, 1);
            }
        });
    }

    /**
     * Removes an enemy from the level's enemy array after a short delay.
     * The delay allows for death animations or sound effects to complete 
     * before the object is removed from the game logic and rendering.
     * @param {number} index - The position of the enemy within the level.enemies array.
     */
    removeEnemy(index) {
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 150);
    }

    /**
     * Manages proximity-based ambient enemy sounds.
     */
    checkEnemySounds() {
        let enemyNearby = this.level.enemies.some(enemy => {
            return !enemy.isDead() && 
                enemy.x + this.camera_x > -200 && 
                enemy.x + this.camera_x < this.canvas.width + 200;
        });
        if (enemyNearby && !this.enemySoundPlaying && !this.gameIsMuted) {
            this.playEnemySound();
        } else if ((!enemyNearby || this.gameIsMuted) && this.enemySoundPlaying) {
            this.stopEnemySound();
        }
    }

    /**
     * Starts playing the ambient enemy sound effect.
     */
    playEnemySound() {
        this.enemySoundPlaying = true;
        this.enemy_sound.volume = 0.5;
        this.enemy_sound.loop = true;
        this.enemy_sound.play();
    }

    /**
     * Stops the ambient enemy sound and resets its playback position.
     */
    stopEnemySound() {
        this.enemySoundPlaying = false;
        this.enemy_sound.pause();
        this.enemy_sound.currentTime = 0;
    }

    /**
     * Renders all game objects to the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawLevelObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusBars();
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Orchestrates the drawing order of all game objects (background to foreground).
     */
    drawLevelObjects() {
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds || []);
        this.addObjectsToMap(this.level.collectibleArrows);
        this.addObjectsToMap(this.level.sakes || []);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
    }

    /**
     * Draws all static UI elements (Statusbars) that don't move with the camera.
     */
    drawStatusBars() {
        if (this.statusBar) this.addToMap(this.statusBar);
        this.addToMap(this.arrowAmount);
        this.addToMap(this.sakeAmount);
    }

    /**
     * Iterates through an array of objects and adds each to the canvas map.
     * @param {Object[]} objects - Array of drawable objects.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Handles the drawing logic for a single object, including mirroring.
     * @param {MoveableObject} mo - The object to be drawn.
     */
    addToMap(mo) {
        if (!mo?.img) return;
        if (mo.otherDirection) this.flipImage(mo);
        this.drawObject(mo);
        if (mo.drawFrame) mo.drawFrame(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /**
     * Executes the actual drawImage call on the context.
     * Supports both static images and sprite animations (frames).
     * @param {MoveableObject} mo - The object to render.
     */
    drawObject(mo) {
        if (mo.getFrameX && mo.img.complete) {
            this.ctx.drawImage(mo.img, mo.getFrameX(), 0, mo.frameWidth, 
                mo.frameHeight, mo.x, mo.y, mo.width, mo.height);
        } else {
            mo.draw(this.ctx);
        }
    }

    /**
     * Mirrors the canvas context for objects facing the opposite direction.
     * @param {MoveableObject} mo - The object to be mirrored.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the canvas context after drawing a mirrored object.
     * @param {MoveableObject} mo - The object that was mirrored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Stops all active intervals in the browser.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
    * Pauses all currently playing audio tracks (background music, character, and enemy sounds).
    * This is used to silence the game during screen transitions (e.g., Win or Game Over)
    * without affecting the persistent mute settings in local storage.
    */
    stopAllRunningSounds() {
        this.background_music.pause();
        this.character.walking_sound.pause();
        this.character.shooting_sound.pause();
        this.stopEnemySound();
        this.level.enemies.forEach(enemy => {
            if (enemy.walking_sound) enemy.walking_sound.pause();
        });
    }
}