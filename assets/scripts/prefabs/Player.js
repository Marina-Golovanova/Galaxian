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
    this.fires.createFire(this);
    this.countCreatedFires++;
  }
}
