class Fire extends Phaser.GameObjects.Sprite {
  constructor(data) {
    super(data.scene, data.x, data.y, data.texture);
    this.velocity = data.velocity;
    this.init(data);
    this.scale = data.scaleFires;
    this.needRandom = data.needRandom;
  }

  static generate(scene, source) {
    const data = {
      scene,
      x: source.x,
      y: source.y,
      texture: source.fireTexture,
      velocity: source.fireVelocity,
      scaleFires: source.scaleFires,
      needRandom: source.needRandom,
    };
    return new Fire(data);
  }

  init(data) {
    this.scene.add.existing(this);
    this.velocity = data.velocity;
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.scene.events.on("update", this.update, this);
  }

  update() {
    if (this.active && this.isDead()) {
      this.setAlive(false);
    }
  }

  isDead() {
    return this.y < 0 - this.width;
  }

  move() {
    this.body.setVelocityY(this.velocity);
    if (this.needRandom) {
      this.body.setVelocityX(Phaser.Math.Between(-500, 500));
    }
  }

  setAlive(status) {
    this.body.enable = status;
    this.setVisible(status);
    this.setActive(status);
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.setAlive(true);
  }
}
