class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
    this.countCreated = 0;
    this.timer = this.scene.time.addEvent({
      delay: 1000,
      callback: this.tick,
      callbackScope: this,
      loop: true,
    });
    this.fires = new Fires(this.scene);
  }

  createEnemy() {
    let enemy = this.getFirstDead();

    if (!enemy) {
      enemy = Enemy.generate(this.scene, this.fires);
      this.add(enemy);
    } else {
      enemy.reset();
    }

    enemy.move();
    ++this.countCreated;
  }

  tick() {
    if (this.countCreated < this.scene.countMaxEnemies) {
      this.createEnemy();
    } else {
      this.scene.time.addEvent({
        delay: 5000,
        callback: () => this.scene.events.emit("enemies-end"),
        callbackScope: this,
      });

      this.timer.remove();
    }
  }
}
