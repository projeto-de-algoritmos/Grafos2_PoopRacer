class Player {
    constructor(game, image, x=0, y=0) {
        this.game = game
        this.entity = this.game.physics.add.sprite(x, y, image);
        this.entity.setOrigin(0.5, 0.5).setDisplaySize(64, 32).setCollideWorldBounds(true).setDrag(500, 500);
        this.velocity = 400;

        this.moveKeys = this.game.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update() {
        if(this.entity.active)  {
            //console.log(this.velocity)
            if(this.moveKeys['down'].isDown) {
                if(!this.wallHit) {
                    this.game.physics.velocityFromRotation(this.entity.rotation, -this.velocity, this.entity.body.velocity);
                } else {
                    this.game.physics.velocityFromRotation(this.entity.rotation, -this.velocity/10, this.entity.body.velocity);
                }
                
            }
            
            if(this.moveKeys['up'].isDown) {
                if(!this.wallHit) {
                    this.game.physics.velocityFromRotation(this.entity.rotation, this.velocity, this.entity.body.velocity);
                } else {
                    this.game.physics.velocityFromRotation(this.entity.rotation, this.velocity/10, this.entity.body.velocity);
                }
            }
            this.wallHit = false;
        }
    }
    
    hitWall() {
        this.wallHit = true;
    }

    incrementRotation(rotation) {
        this.entity.rotation += rotation;
    }

    setRotation(rotation) {
        this.entity.rotation = rotation;
    }
}