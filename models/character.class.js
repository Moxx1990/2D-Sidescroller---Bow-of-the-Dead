class Character extends MoveableObject {

    constructor() {
        super();
        this.loadImage('img/Character/Idle.png');
    }

    jump() {
        console.log("jump");
    }
}