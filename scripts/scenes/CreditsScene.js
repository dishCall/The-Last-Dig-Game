export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super("CreditsScene");
  }

  preload() {
    this.load.image("CreditsPNG", "/assets/images/Credits.png");
    this.load.image("backButton", "/assets/buttons/Back.png");
    this.load.image("backButtonHover", "/assets/buttons/BackHover.png");
  }

  create() {
    // Background Image
    let bg = this.add.image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "Mainbg"
      );
      bg.setScale(0.4);

    // Credits Image
    let CreditsPNG = this.add.image(
        this.cameras.main.centerX,
        250,
        "CreditsPNG"
      );
      CreditsPNG.setScale(0.42);

// Back Button
let backButton = this.add.image(
  70,
  60,
  "backButton"
);
backButton.setScale(0.8);
backButton.setInteractive({ useHandCursor: true });

let backButtonHover = this.add.image(
  70,
  60,
  "backButtonHover"
);
backButtonHover.setScale(0.8);
backButtonHover.setVisible(false);

backButton.on("pointerover", () => {
  this.sound.play("buttonHover");
  backButtonHover.setVisible(true);
});

backButton.on("pointerout", () => {
  backButtonHover.setVisible(false);
});

backButton.on("pointerdown", () => {
  this.scene.start("TitleScene");
  this.sound.play("buttonClick");
});
  }
}