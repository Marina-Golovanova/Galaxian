class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  create() {
    this.createBackground();
    this.createLogo();
    this.setEvents();
  }

  init() {
    this.positionLogoY = 30;
  }

  update() {
    this.bg.tilePositionY -= 1;
    if (this.logo.y > this.positionLogoY) {
      this.logo.y -= 1;
    } else {
      this.createText();
    }
  }

  createBackground() {
    this.bg = this.add
      .tileSprite(0, 0, config.width, config.height, "bg")
      .setOrigin(0);
  }

  createLogo() {
    this.logo = this.add
      .image(config.width / 2, config.height, "logo")
      .setScale(0.2)
      .setOrigin(0.5, 0);
  }

  createText() {
    this.text = this.add
      .text(config.width / 2, config.height / 2, "Tap to start", {
        font: "40px Galaxian",
        fill: "#428aff",
      })
      .setOrigin(0.5);
    this.text.setAlpha(0);

    this.tweens.add({
      targets: this.text,
      alpha: 1,
      ease: "Linear",
      duration: 5000,
    });
  }

  setEvents() {
    this.input.on("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
