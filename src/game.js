var MainMenu = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function MainMenu() {
		Phaser.Scene.call(this, {key: 'main_menu'});
	},
	
	preload: function() {
		this.load.image('tilemap', 'assets/tilemap.png');
		this.load.spritesheet('spr_enemy', 'assets/spr_enemy.png', { frameWidth: 32, frameHeight: 32 });

		this.load.tilemapTiledJSON('stage1', 'src/stages/stage1.json');
		this.load.json('stage1_info', `src/stages/stage1_info.json`);
	},
	
	create: function() {
		this.scene.start('st_1');
		this.scene.stop('main_menu');
	}
});

var Stage1 = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function Stage1() {
		Phaser.Scene.call(this, {key: 'st_1'});
	},
	
	preload: function() {
	},
	
	create: function() {
		// this.next_stage = 2;
		loadStage('stage1', this);
		create(this);
	},
	
	update: function() {update(this)}
});


function loadStage(stage_name, scene) {
	scene.stage_finished = false;
	scene.stage = new Stage(scene, stage_name);
	// scene.player = new Player(scene, 'dude', scene.stage.spawn_point.x * 16, scene.stage.spawn_point.y * 16);
	scene.enemies = [];

	scene.stage.enemies.forEach((position) => {
		scene.enemies.push(new Enemy(scene, position.x * 16, position.y * 16,  position.followDistance, scene.stage.wall_layer));
	});
}


function create(scene) {
    
}

function update(scene) {
    

}

var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MainMenu, Stage1],
	loaderAsync: false,
	pixelArt: true,
	backgroundColor: "#493743"
};

var game = new Phaser.Game(config);