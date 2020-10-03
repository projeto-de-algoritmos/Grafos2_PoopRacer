var MainMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function MainMenu() {
    Phaser.Scene.call(this, { key: "main_menu" });
  },

  preload: function () {
    this.load.image("roads", "assets/roads.png");
    this.load.image("f12", "assets/f12.png");

    this.load.image("finnish", "assets/finnish.png");
    this.load.image("lambo", "assets/lambo.png");

    this.load.tilemapTiledJSON("circuit1", "src/stages/circuit1.json");
    this.load.json("circuit1_info", `src/stages/circuit1_info.json`);
  },

  create: function () {
    this.scene.start("cq_1");
    this.scene.stop("main_menu");
  },
});

var Circuit1 = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function Circuit1() {
    Phaser.Scene.call(this, { key: "cq_1" });
  },

  preload: function () {},

  create: function () {
    // this.next_stage = 2;

    loadStage("circuit1", this);
    create(this);
  },

  update: function () {
    update(this);
  },
});

function loadStage(stage_name, scene) {
  scene.stage_finished = false;
  scene.stage = new Stage(scene, stage_name, "roads");
  // console.log(scene.stage.floor_graph);
  scene.player = new Player(
    scene,
    "lambo",
    scene.stage.spawn_point.x * 16,
    scene.stage.spawn_point.y * 16
  );
  scene.end_area = scene.add
    .image(
      scene.stage.end_area.start.x * 16,
      scene.stage.end_area.start.y * 16,
      "finnish"
    )
    .setOrigin(0)
    .setDisplaySize(16 * 8, 16 * 2);
  scene.enemies = [];
  scene.end = scene.physics.add.staticGroup(scene.end_area);
  // console.log(scene.end);
  scene.physics.add.overlap(scene.end, scene.player.entity, () => {
    // console.log("notfuck");
    if (scene.stage_finished) {
      game.scene.start(`st_${scene.next_stage}`);
      game.scene.stop(scene.scene.key);
      scene.stopped = true;
    }
  });

  scene.stage.enemies.forEach((position) => {
    scene.enemies.push(
      new Enemy(scene, position.x * 16, position.y * 16, scene.player.entity)
    );
  });
}

function create(scene) {
  camera = scene.cameras.main;
  camera.setZoom(2);
  camera.startFollow(scene.player.entity);

  game.scale.resize(1920, 1080);

  scene.input.on(
    "pointermove",
    function (e) {
      if (scene.input.mouse.locked) {
        scene.player.incrementRotation(e.movementX / 200);
      }
    },
    scene
  );

  scene.physics.add.collider(scene.player.entity, scene.stage.wall_layer, () =>
    scene.player.hitWall()
  );
  scene.enemies.forEach((enemy) => {
    scene.physics.add.collider(enemy.entity, scene.stage.wall_layer);
  });
}

function update(scene) {
  if (
    scene.stage.poo_layer.getTileAtWorldXY(
      scene.player.entity.x,
      scene.player.entity.y
    )
  ) {
    scene.player.velocity = 200;
  } else {
    scene.player.velocity = 400;
  }

  scene.enemies.forEach((enemy) => {
    if (
      scene.stage.poo_layer.getTileAtWorldXY(enemy.entity.x, enemy.entity.y)
    ) {
      enemy.velocity = 200;
    } else {
      enemy = 400;
    }
  });

  scene.enemies.forEach((enemy) => enemy.update(scene));
  scene.player.update();
  game.input.mouse.requestPointerLock();
}

var config = {
  type: Phaser.AUTO,
  width: 3200,
  height: 3200,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [MainMenu, Circuit1],
  loaderAsync: false,
  pixelArt: true,
  backgroundColor: "#493743",
};

var game = new Phaser.Game(config);
