class Player extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, config.width / 2, 580, "ship");
    this.scene = scene;
    this.scale = 0.4;
    this.init();
    this.velocity = 600;
    this.body.setSize(165, 180);
    this.fires = new Fires(this.scene);
    this.countMaxFires = 10;
    this.countCreatedFires = 0;
    this.setOrigin(0.5, 0);
    this.fireTexture = "fire";
    this.fireVelocity = -900;
    this.stopFire = false;
    this.isFired = false;
    this.scaleFires = 0.1;
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.timer = this.scene.time.addEvent({
      delay: 200,
      callback: this.fire,
      callbackScope: this,
      loop: true,
    });
    this.scene.events.on("update", this.update, this);
  }

  update() {
    if (this.scene) {
      if (this.scene.cursors.space.isUp) {
        this.isFired = false;
      }
    }
  }

  move() {
    this.body.setVelocity(0);

    if (this.scene.cursors.left.isDown && this.body.x > 0) {
      this.body.setVelocityX(-this.velocity);
    } else if (
      this.scene.cursors.right.isDown &&
      this.body.x < config.width - this.body.width
    ) {
      this.body.setVelocityX(this.velocity);
    }
  }

  fire() {
    if (this.active && !this.stopFire) {
      this.fires.createFire(this);
      this.countCreatedFires++;
    } else {
      if (this.scene.cursors.space.isDown && !this.isFired) {
        this.fires.createFire(this);
        this.isFired = true;
      }
    }
  }

  setAlive(status) {
    this.body.enable = status;
    this.setVisible(status);
    this.setActive(status);
  }
}
