var MainMenu = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function MainMenu() {
		Phaser.Scene.call(this, {key: 'main_menu'});
	},
	
	preload: function() {
		// this.load.image('roadEW', 'assets/roadEW.png');
		// this.load.image('roadNE', 'assets/roadNE.png');
		// this.load.image('roadNEWS', 'assets/roadNEWS.png');
		// this.load.image('roadNS', 'assets/roadNS.png');
		// this.load.image('roadNW', 'assets/roadNW.png');
		// this.load.image('roadPLAZA', 'assets/roadPLAZA.png');
		// this.load.image('roadSE', 'assets/roadSE.png');
		// this.load.image('roadSW', 'assets/roadSW.png');
		// this.load.image('roadTE', 'assets/roadTE.png');
		// this.load.image('roadTN', 'assets/roadTN.png');
		// this.load.image('roadTS', 'assets/roadTS.png');
		// this.load.image('roadTW', 'assets/roadTW.png');
		// tilemaps = [
		// 	'roadEW',
		// 	'roadNE',
		// 	'roadNEWS',
		// 	'roadNS',
		// 	'roadNW',
		// 	'roadPLAZA',
		// 	'roadSE',
		// 	'roadSW',
		// 	'roadTE',
		// 	'roadTN',
		// 	'roadTS',
		// 	'roadTW'
		// ]

		// this.load.image('tilemap', 'assets/spritesheet_tiles.png');
		this.load.image('roads', 'assets/roads.png');
		this.load.spritesheet('spr_enemy', 'assets/spr_enemy.png', { frameWidth: 32, frameHeight: 32 });

		this.load.image('lambo', 'assets/lambo.png');

		this.load.tilemapTiledJSON('circuit1', 'src/stages/circuit1.json');
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

	// scene.stage.enemies.forEach((position) => {
	// 	scene.enemies.push(new Enemy(scene, position.x * 16, position.y * 16,  position.followDistance, scene.stage.wall_layer));
	// });
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
    scene: [MainMenu, Circuit1],
	loaderAsync: false,
	pixelArt: true,
	backgroundColor: "#493743"
};

var game = new Phaser.Game(config);