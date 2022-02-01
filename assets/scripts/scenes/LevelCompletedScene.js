class LevelCompletedScene extends Phaser.Scene {
  constructor() {
    super("LevelCompleted");
  }

  create(data) {
    this.createBackground();
    this.createText(data);
  }

  update() {
    this.bg.tilePositionY -= 1;
  }

  createBackground() {
    this.bg = this.add
      .tileSprite(0, 0, config.width, config.height, "bg")
      .setOrigin(0);
  }

  createText(data) {
    if (!data.completed) {
      this.text = this.add
        .text(config.width / 2, config.height / 2, "Game over!", {
          font: "40px Galaxian",
          fill: "#de2800",
        })
        .setOrigin(0.5);
      this.text.setAlpha(0);

      this.tweens.add({
        targets: this.text,
        alpha: 1,
        ease: "Linear",
        duration: 2000,
        onComplete: () => this.createScore(data),
      });
    }
  }

  createScore(data) {
    this.textScore = this.add
      .text(config.width / 2, config.height / 2 + 50, "Score: " + data.score, {
        font: "25px Galaxian",
        fill: "#00aa00",
      })
      .setOrigin(0.5);

    this.textScore.setAlpha(0);

    this.tweens.add({
      targets: this.textScore,
      alpha: 1,
      ease: "Linear",
      duration: 2000,
      onComplete: () => this.createContinueText(),
    });
  }

  createContinueText() {
    this.textContinue = this.add
      .text(config.width / 2, config.height / 2 + 150, "Tap to try again", {
        font: "25px Galaxian",
        fill: "#428aff",
      })
      .setOrigin(0.5);

    this.textContinue.setAlpha(0);

    this.tweens.add({
      targets: this.textContinue,
      alpha: 1,
      ease: "Linear",
      duration: 2000,
      onComplete: () => this.setEvents(),
    });
  }

  setEvents() {
    this.input.on("pointerdown", () => {
      //   this.scene.start("LevelStart");
      this.scene.start("Game");
    });
  }
}
