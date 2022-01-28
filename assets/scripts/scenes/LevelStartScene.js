class LevelStartScene extends Phaser.Scene {
  constructor() {
    super("LevelStart");
  }

  create() {
    this.createBackground();
    this.createText();
  }

  init() {
    this.positionLogoY = 30;
  }

  update() {
    this.bg.tilePositionY -= 1;
  }

  createBackground() {
    this.bg = this.add
      .tileSprite(0, 0, config.width, config.height, "bg")
      .setOrigin(0);
  }

  createText() {
    this.textLevel = this.add
      .text(config.width / 2, config.height / 2, "Level 1", {
        font: "40px Galaxian",
        fill: "#428aff",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: this.textLevel,
      y: 100,
      delay: 2000,
      duration: 2000,
      onComplete: () => this.createMission(),
    });
  }

  createMission() {
    this.mission = this.add
      .text(
        config.width / 2,
        config.height / 2,
        "Mission: destroy the death star",
        {
          font: "30px Galaxian",
          fill: "#de2800",
        }
      )
      .setOrigin(0.5);

    this.tweens.add({
      targets: this.mission,
      y: 200,
      delay: 2000,
      duration: 2000,
      onComplete: () => this.createInstruction(),
    });
  }

  createInstruction() {
    this.instruction = this.add
      .text(
        config.width / 2,
        config.height / 2,
        "You need to press enter \nto destroy the death star \nyou have only 10 seconds",
        {
          font: "30px Galaxian",
          fill: "#428aff",
        }
      )
      .setOrigin(0.5);

    this.instruction.setLineSpacing(10);
    this.nextScene();
  }

  nextScene() {
    this.timer = this.time.addEvent({
      delay: 10000,
      callback: () => this.scene.start("GameScene"),
      callbackScope: this,
    });
  }
}
