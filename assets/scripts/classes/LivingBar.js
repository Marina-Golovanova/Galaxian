class LivingBar {
  constructor(scene) {
    this.scene = scene;
    this.style = {
      boxColor: 0xde2800,
      barColor: 0x00aa00,
      x: config.width / 2 - 300,
      y: 40,
      width: 600,
      height: 25,
    };

    this.progressBox = this.scene.add.graphics();
    this.progressBar = this.scene.add.graphics();

    this.showProgressBox();
    this.showProgressBar(this.scene.bossLives);
    this.init();
  }

  init() {
    this.scene.events.on(
      "boss-shot",
      () => {
        this.showProgressBar(this.scene.bossLives);
      },
      this
    );
  }

  showProgressBox() {
    this.progressBox
      .fillStyle(this.style.boxColor)
      .fillRect(
        this.style.x,
        this.style.y,
        this.style.width,
        this.style.height
      );
  }

  showProgressBar(value) {
    this.progressBar
      .clear()
      .fillStyle(this.style.barColor)
      .fillRect(this.style.x, this.style.y, 60 * value, this.style.height);
  }

  // setEvents() {
  //   this.scene.events.on("boss-shot", this.showProgressBar, this);
  // }
}
