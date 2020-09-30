class Player {
    constructor(game, image, x=0, y=0) {
        this.game = game
        this.entity = this.game.physics.add.sprite(x, y, image);
        this.entity.setOrigin(0.5, 0.5).setDisplaySize(64, 32).setCollideWorldBounds(true).setDrag(500, 500);
		this.velocity = 200;

        this.moveKeys = this.game.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });
    }


    update() {
        if(this.entity.active)  {

            let velocityX = 0;
            let velocityY = 0;
            
            // if(this.moveKeys['right'].isDown)
			// velocityX += this.velocity;
            
            // if(this.moveKeys['left'].isDown)
			// velocityX -= this.velocity;
            
            if(this.moveKeys['down'].isDown)
            // velocityY += this.velocity;
                this.game.physics.velocityFromRotation(this.entity.rotation, -200, this.entity.body.velocity);
            
            if(this.moveKeys['up'].isDown)
            // velocityY -= this.velocity;
                this.game.physics.velocityFromRotation(this.entity.rotation, 200, this.entity.body.velocity);
            
            // this.entity.setVelocityY(velocityY);
            // this.entity.setVelocityX(velocityX);
        }
	}

    incrementRotation(rotation) {
        this.entity.rotation += rotation;
    }

    setRotation(rotation) {
        this.entity.rotation = rotation;
    }
}