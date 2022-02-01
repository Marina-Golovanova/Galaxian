class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.createBackground();
    this.player = new Player(this);
    this.enemies = new Enemies(this);
    this.createStat();
    this.playerHP = 6;
    this.maxPlayerHP = 6;
    this.createHP();
    this.addOverlap();
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.countMaxEnemies = 50;
    this.countKilled = 0;
  }

  update() {
    this.bg.tilePositionY -= 1;
    this.player.move();
  }

  createBackground() {
    this.bg = this.add
      .tileSprite(0, 0, config.width, config.height, "bg")
      .setOrigin(0);
  }

  addOverlap() {
    this.physics.add.overlap(
      this.player.fires,
      this.enemies,
      this.onOverlap,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.enemies.fires,
      this.player,
      this.onOverlap,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.enemies,
      this.player,
      this.onOverlap,
      undefined,
      this
    );
  }

  onOverlap(source, target) {
    if (
      target.texture.key === "enemies" &&
      target.y > 0 &&
      source.texture.key === "fire"
    ) {
      this.boom = Boom.generate(this, target.x, target.y);
      target.setAlive(false);
      this.countKilled++;
      this.textKilled.setText(this.countKilled);
    }

    if (
      (target.texture.key === "bullet" || target.texture.key === "enemies") &&
      source.texture.key === "ship"
    ) {
      this[`heart${this.maxPlayerHP - this.playerHP}`].destroy();
      if (this.playerHP > 1) {
        this.playerHP--;
        target.setAlive(false);
      } else {
        this.boom = Boom.generate(this, source.x, source.y);
        source.setAlive(false);
        this.time.addEvent({
          delay: 2000,
          callback: this.onComplete,
          callbackScope: this,
        });
      }
    }
  }

  createStat() {
    this.textKilled = this.add.text(50, 50, this.countKilled, {
      font: "30px Galaxian",
      fill: "#fff",
    });

    this.textAll = this.add.text(150, 50, this.countMaxEnemies, {
      font: "30px Galaxian",
      fill: "#428aff",
    });
  }

  createHeart(positionX, i) {
    this[`heart${i}`] = this.add
      .image(positionX, 50, "heart")
      .setOrigin(1, 0.5);

    this[`heart${i}`].setScale(0.08);
  }

  createHP() {
    for (let i = 0; i < this.playerHP; i++) {
      this.createHeart(i * 50 + 1000, i);
    }
  }

  onComplete() {
    this.scene.start("LevelCompleted", {
      score: this.countKilled,
      completed: this.player.active,
    });
  }
}
