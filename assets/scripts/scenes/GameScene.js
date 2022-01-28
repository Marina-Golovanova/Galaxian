class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.createBackground();
    this.player = new Player(this);
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
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
}
