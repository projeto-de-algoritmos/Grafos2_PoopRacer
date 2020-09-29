class Enemy {
	health = 100;
	constructor(game, x = 0, y = 0, followDistance, collision_layer = null) {
		this.entity = game.physics.add.sprite(x, y, 'spr_enemy');
		// this.entity.setCollideWorldBounds(true);
		// this.target = player;
		this.game = game;
		// this.collision_layer = collision_layer;
		// this.followDistance = followDistance;
		// var now = Date.now()
		// this.lastCalculated = now - 101
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
		// this.entity.rotation = Phaser.Math.Angle.Between(this.entity.x, this.entity.y, this.target.x, this.target.y);
		// this.game.physics.velocityFromRotation(this.entity.rotation, 200, this.entity.body.velocity);
	}
	
	followPath(player, stage){
		// var now = Date.now();
		// var thisTile = stage.map.getTileAtWorldXY(this.entity.x, this.entity.y)
		// var playerTile = stage.map.getTileAtWorldXY(player.entity.x, player.entity.y)
		// if(thisTile && playerTile) {
		// 	// console.log(this.lastCalculated - now)
		// 	if((now - this.lastCalculated ) >= 100) {
		// 		var thisNode = thisTile.x + (thisTile.y * stage.floor_layer.layer.width)
		// 		var playerNode = playerTile.x + (playerTile.y * stage.floor_layer.layer.width)
		// 		this.path = stage.floor_graph.BFSShortestPath(thisNode, playerNode);
		// 		this.lastCalculated = now;
		// 		// console.log(this.lastCalculated)
		// 		if(!this.followDistance || this.path.length <= this.followDistance) {
		// 			var next_vertex = stage.floor_graph.getVertex(this.path[0]);
		// 			this.entity.rotation = Phaser.Math.Angle.Between(this.entity.x, this.entity.y, next_vertex.centerPosition.x, next_vertex.centerPosition.y);
		// 			this.game.physics.velocityFromRotation(this.entity.rotation, 200, this.entity.body.velocity);
		// 		} else {
		// 			return;
		// 		}
		// 	} else {
		// 		if(!this.followDistance || this.path.length <= this.followDistance) {
		// 			var next_vertex = stage.floor_graph.getVertex(this.path[0]);
		// 			this.entity.rotation = Phaser.Math.Angle.Between(this.entity.x, this.entity.y, next_vertex.centerPosition.x, next_vertex.centerPosition.y);
		// 			this.game.physics.velocityFromRotation(this.entity.rotation, 200, this.entity.body.velocity);
		// 		} else {
		// 			return;
		// 		}
		// 	}
		// }
	}
	
	getInput() {
		// if(!cast_ray_into_tilemap(this.entity.x, this.entity.y, this.target.x, this.target.y, this.collision_layer).length)
		// return 2;
		// else if(1)
		// return 1;
		// return 0;
	}
	
	update(player, stage) {
		// switch(this.getInput()) {
		// 	case 0:
		// 		break;
		// 	case 1:
		// 		this.followPath(player, stage);
		// 		break;
		// 	case 2:
		// 		this.followTarget();
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