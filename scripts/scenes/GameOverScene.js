export default class GameOverScene extends Phaser.Scene{

    constructor(){
        super("GameOverScene")
    }

    preload() {
        this.load.image("Gameover", "/assets/images/GameOver.png");
        this.load.image("retryButton", "/assets/buttons/Retry.png");
        this.load.image("retryButtonHover", "/assets/buttons/RetryHover.png");
        this.load.image("titleButton", "/assets/buttons/Menu.png");
        this.load.image("titleButtonHover", "/assets/buttons/MenuHover.png");
        this.load.audio("gameoverBGM", "/assets/audio/GameOverBGM.mp3");
        this.load.audio("buttonHover", "/assets/audio/HoverButtonSFX.mp3");
        this.load.audio("buttonClick", "/assets/audio/ClickButtonSFX.mp3");
    }

    create(){
    //Background
      let bg = this.add.image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "Mainbg"
      );
      bg.setScale(0.4);

    //BGM
    this.sound.play("gameoverBGM", { loop: false, volume: 0.2});

    //Game Over
    let Gameover = this.add.image(
        this.cameras.main.centerX,
        200,
        "Gameover"
        );
        Gameover.setScale(0.9);
        
        let restartButton = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 80, "retryButton").setInteractive({ useHandCursor: true });
        restartButton.setScale(1);
        restartButton.on("pointerover", () => {
            this.sound.play("buttonHover");
            restartButton.setTexture("retryButtonHover"); 
        });
        restartButton.on("pointerout", () => {
            restartButton.setTexture("retryButton"); 
        });
        restartButton.on("pointerdown", () => {
            this.sound.play("buttonClick");
            this.restart();
        });
        
        let titleButton = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 150, "titleButton").setInteractive({ useHandCursor: true });
        titleButton.setScale(1);
        titleButton.on("pointerover", () => {
            this.sound.play("buttonHover");
            titleButton.setTexture("titleButtonHover"); 
        });
        titleButton.on("pointerout", () => {
            titleButton.setTexture("titleButton"); 
        });
        titleButton.on("pointerdown", () => {
            this.sound.play("buttonClick");
            this.home();
        });

        this.cameras.main.setBackgroundColor('#000000')
        
    }

    restart(){
        this.scene.start("GameScene");
        this.sound.stopAll();
    }

    home(){
        this.scene.start("TitleScene");
        this.sound.stopAll();
    }
}