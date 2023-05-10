export default class StageClearScene3 extends Phaser.Scene{

    constructor(){
        super("StageClearScene3")
    }

    preload() {
        this.load.image("Gameclear", "/assets/images/GameClear.png");
        this.load.image("retryButton", "/assets/buttons/Retry.png");
        this.load.image("titleButton", "/assets/buttons/Menu.png");
        this.load.audio("gameclearBGM", "/assets/audio/GameClearBGM.mp3");
        this.load.audio("buttonHover", "/assets/audio/HoverButtonSFX.mp3");
        this.load.audio("buttonClick", "/assets/audio/ClickButtonSFX.mp3");
    }

    create(){
        //Background
        let bg = this.add.image(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            "Mainbg3"
        );
        bg.setScale(0.5);

        //BGM
        this.sound.play("gameclearBGM", { loop: true, volume: 0.3 });

        //Game Clear
        let GameClear = this.add.image(
            this.cameras.main.centerX,
            120,
            "Gameclear"
        );
        GameClear.setScale(1);

        let restartButton = this.add.sprite(this.cameras.main.centerX, 280, "retryButton").setInteractive({useHandCursor: true});
        restartButton.setScale(0.4);
        restartButton.on("pointerover", () => {
            this.sound.play("buttonHover");
        });
        restartButton.on("pointerdown", () => {
            this.sound.play("buttonClick");
            this.restart();
        });

        let titleButton = this.add.sprite(this.cameras.main.centerX, 360, "titleButton").setInteractive({useHandCursor: true});
        titleButton.setScale(0.4);
        titleButton.on("pointerover", () => {
            this.sound.play("buttonHover");
        });
        titleButton.on("pointerdown", () => {
            this.sound.play("buttonClick");
            this.home();
        });

        this.cameras.main.setBackgroundColor('#000000')
    }

    restart(){
        this.scene.start("GameScene3");
        this.sound.stopAll();
    }

    home(){
        this.scene.start("TitleScene");
        this.sound.stopAll();
    }
}