var MainMenu = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function MainMenu() {
		Phaser.Scene.call(this, {key: 'main_menu'});
	},
	
	preload: function() {
		this.load.image('roads', 'assets/roads.png');
		this.load.spritesheet('spr_enemy', 'assets/spr_enemy.png', { frameWidth: 32, frameHeight: 32 });

		this.load.image('lambo', 'assets/lambo.png');

		this.load.tilemapTiledJSON('circuit1', 'src/stages/circuit11.json');
		this.load.json('circuit1_info', `src/stages/stage1_info.json`);
	},
	
	create: function() {
		this.scene.start('cq_1');
		this.scene.stop('main_menu');
	}
});

var Circuit1 = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function Stage1() {
		Phaser.Scene.call(this, {key: 'cq_1'});
	},
	
	preload: function() {
	},
	
	create: function() {
		// this.next_stage = 2;
		
		loadStage('circuit1', this);
		create(this);
	},
	
	update: function() {update(this)}
});


function loadStage(stage_name, scene) {
	scene.stage_finished = false;
	scene.stage = new Stage(scene, stage_name, 'roads');
	scene.player = new Player(scene, 'lambo', scene.stage.spawn_point.x * 16, scene.stage.spawn_point.y * 16);
	scene.enemies = [];
	
	scene.stage.enemies.forEach((position) => {
		scene.enemies.push(new Enemy(scene, position.x * 16, position.y * 16,  position.followDistance, scene.stage.wall_layer));
	});
}


function create(scene) {
	camera = scene.cameras.main;
	camera.setZoom(2);
	camera.startFollow(scene.player.entity)

	game.scale.resize(1920, 1080);

    scene.input.on('pointermove', function (e) {
		if (scene.input.mouse.locked) {
			scene.player.incrementRotation(e.movementX/200);
        }
	}, scene);
	
	scene.physics.add.collider(scene.player.entity, scene.stage.wall_layer, () => scene.player.hitWall());
}

function update(scene) {
	if (scene.stage.poo_layer.getTileAtWorldXY(scene.player.entity.x, scene.player.entity.y)) {
		scene.player.velocity = 200;
	} else {
		scene.player.velocity = 400;
	}
	
	scene.player.update();
	game.input.mouse.requestPointerLock();
	
}

var config = {
    type: Phaser.AUTO,
    width: 3200,
    height: 3200,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MainMenu, Circuit1],
	loaderAsync: false,
	pixelArt: true,
	backgroundColor: "#493743"
};

var game = new Phaser.Game(config);