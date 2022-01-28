class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.add.sprite(0, 0, "bg").setOrigin(0);
    this.preloadAssets();
  }

  preloadAssets() {
    this.load.image("logo", "assets/sprites/logo.png");
    this.load.image("ship", "assets/sprites/ship.png");
    this.load.image("fire", "assets/sprites/fire.png");
  }

  create() {
    this.scene.start("Start");
  }
}
