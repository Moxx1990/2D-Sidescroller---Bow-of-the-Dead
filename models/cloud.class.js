class Cloud extends MoveableObject {

    

     constructor() {
        super();
        this.loadImage('img/Background/Clouds.png');
        this.x = 200 + Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

   

}