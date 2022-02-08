class Boss extends Phaser.GameObjects.Sprite {
  constructor(data) {
    super(data.scene, config.width / 2, 0, data.texture);
    this.scene = data.scene;
    this.setOrigin(0.5, 1);
    this.scale = 0.6;
    this.init();
    this.velocity = data.velocity;
    this.fireTexture = "bullet-star-death";
    this.fireVelocity = 800;
    this.scaleFires = 0.6;
    this.needRandom = true;
    this.fires = new Fires(this.scene);
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.body.setSize(300, 350);
    this.scene.tweens.add({
      targets: this,
      y: 300,
      ease: "Linear",
      duration: 3000,
      onComplete: () => {
        this.body.setVelocityX(-this.velocity);
        this.scene.events.on("update", this.move, this);
        this.timer = this.scene.time.addEvent({
          delay: 600,
          callback: this.fire,
          callbackScope: this,
          loop: true,
        });
      },
    });
  }

  move() {
    if (this.x < 100) {
      this.body.setVelocityX(this.velocity);
    }

    if (this.x > config.width - 100) {
      this.body.setVelocityX(-this.velocity);
    }
  }

  fire() {
    if (this.active) {
      this.fires.createFire(this);
      this.countCreatedFires++;
    }
  }
}
