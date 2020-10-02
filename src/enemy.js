class Enemy {
	health = 100;
	constructor(game, x = 0, y = 0, target, collision_layer = null) {
		this.entity = game.physics.add.sprite(x, y, 'f12').setDisplaySize(64, 32);
		this.velocity = 400;
		this.target = target;
		this.game = game;
		// this.collision_layer = collision_layer;
		// this.followDistance = followDistance;
		this.lastCalculated = Date.now() - 1001
	}
	
	getHit(damage) {
		// this.health -= damage;
		// console.log('alive', this.health)
		// if(this.health <= 0 ) {
		// 	console.log('dead')
		// 	this.entity.destroy()
		// }
	}
	
	followTarget() {
		this.entity.rotation = Phaser.Math.Angle.Between(this.entity.x, this.entity.y, this.target.x, this.target.y);
		this.game.physics.velocityFromRotation(this.entity.rotation, this.velocity, this.entity.body.velocity);
	}
	
	followPath(scene){
		// var target = scene.end_area.body;
		var target = scene.player.entity;
		var now = Date.now();
		var thisTile = scene.stage.floor_layer.getTileAtWorldXY(this.entity.x, this.entity.y)
		var finnishTile = scene.stage.floor_layer.getTileAtWorldXY(target.x, target.y)
		// console.log(thisTile, finnishTile)
		if(thisTile && finnishTile) {
			// console.log(this.lastCalculated - now)
			if((now - this.lastCalculated ) >= 1000) {
				var thisNode = thisTile.x + (thisTile.y * scene.stage.floor_layer.layer.width)
				var playerNode = finnishTile.x + (finnishTile.y * scene.stage.floor_layer.layer.width)
				this.path = scene.stage.floor_graph.BFSShortestPath(thisNode, playerNode);
				// console.log(this.path)
				this.lastCalculated = now;
			// 	// console.log(this.lastCalculated)
			// 	if(!this.followDistance || this.path.length <= this.followDistance) {
				var next_vertex = scene.stage.floor_graph.getVertex(this.path[0]);
				this.entity.rotation = Phaser.Math.Angle.Between(this.entity.x, this.entity.y, next_vertex.centerPosition.x, next_vertex.centerPosition.y);
				this.game.physics.velocityFromRotation(this.entity.rotation, this.velocity, this.entity.body.velocity);
			// 	} else {
			// 		return;
			// 	}
			} else {
				console.log(thisTile.index, this.path[0])
				if((now - this.lastCalculated ) >= 500) {
				// if(thisTile.index == this.path[0]) {
					if(this.path.length >= 2) {
						this.path.shift();
					}
				}
				var next_vertex = scene.stage.floor_graph.getVertex(this.path[0]);
				this.entity.rotation = Phaser.Math.Angle.Between(this.entity.x, this.entity.y, next_vertex.centerPosition.x, next_vertex.centerPosition.y);
				this.game.physics.velocityFromRotation(this.entity.rotation, this.velocity, this.entity.body.velocity);
			// 	if(!this.followDistance || this.path.length <= this.followDistance) {
			// 		var next_vertex = stage.floor_graph.getVertex(this.path[0]);
			// 		this.entity.rotation = Phaser.Math.Angle.Between(this.entity.x, this.entity.y, next_vertex.centerPosition.x, next_vertex.centerPosition.y);
			// 		this.game.physics.velocityFromRotation(this.entity.rotation, 200, this.entity.body.velocity);
			// 	} else {
			// 		return;
			// 	}
			}
		}
	}

	getInput() {
		if(!cast_ray_into_tilemap(this.entity.x, this.entity.y, this.target.x, this.target.y, this.collision_layer).length)
		return 2;
		else if(1)
		return 1;
		return 0;
	}
	
	update(scene) {
		// switch(this.getInput()) {
		// 	case 0:
		// 		break;
		// 	case 1:
				this.followPath(scene);
		// 		break;
		// 	case 2:
				// this.followTarget();
		// 		break;
		// }
	}

	isAlive() {
	// 	if(this.health > 0) {
	// 		return true
	// 	}
	// 	return false
	}
}