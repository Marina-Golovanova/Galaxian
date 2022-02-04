class Enemy extends Phaser.GameObjects.Sprite {
  constructor(data) {
    super(data.scene, data.x, data.y, data.texture, data.frame);
    this.velocity = data.velocity;
    this.scale = 2;
    this.fireTexture = "bullet";
    this.fireVelocity = 700;
    this.scaleFires = 0.1;
    this.init(data);
  }

  static generateAttributes() {
    const x = Phaser.Math.Between(100, config.width - 100);
    const y = -200;
    return { x, y, frame: `enemy${Phaser.Math.Between(1, 3)}` };
  }

  static generate(scene, fires) {
    const { x, y, frame } = Enemy.generateAttributes();
    return new Enemy({
      scene,
      fires,
      x,
      y,
      texture: "enemies",
      frame,
      velocity: 250,
    });
  }

  init(data) {
    this.scene.add.existing(this);
    this.velocity = data.velocity;
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.fires = data.fires || new Fires(this.scene);
    this.setOrigin(0.5, 1);
    this.timer = this.scene.time.addEvent({
      delay: 1000,
      callback: this.fire,
      callbackScope: this,
      loop: true,
    });
    this.scene.events.on("update", this.update, this);
  }

  fire() {
    if (this.active) {
      this.fires.createFire(this);
      this.countCreatedFires++;
    }
  }

  update() {
    if (this.active && this.isDead()) {
      this.setAlive(false);
    }
  }

  reset() {
    const { x, y, frame } = Enemy.generateAttributes();
    this.x = x;
    this.y = y;
    this.setFrame(frame);
    this.setAlive(true);
  }

  isDead() {
    return this.active && this.y > this.height + config.height;
  }

  move() {
    this.body.setVelocityY(this.velocity);
  }

  setAlive(status) {
    this.body.enable = status;
    this.setVisible(status);
    this.setActive(status);
  }
}
