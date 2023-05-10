export default class StageClearScene extends Phaser.Scene{

    constructor(){
        super("StageClearScene")
    }

    preload() {
        this.load.image("Stageclear", "/assets/images/StageClear.png");
        this.load.image("retryButton", "/assets/buttons/Retry.png");
        this.load.image("titleButton", "/assets/buttons/Menu.png");
        this.load.image("nextStageButton", "/assets/buttons/NextLevel.png");
        this.load.audio("stageclearBGM", "/assets/audio/StageClearBGM.mp3");
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
        bg.setScale(3);

        //BGM
        this.sound.play("stageclearBGM", { loop: true, volume: 0.3 });

        //Stage Clear
        let StageClear = this.add.image(
            this.cameras.main.centerX,
            120,
            "Stageclear"
        );
        StageClear.setScale(1);

        let restartButton = this.add.sprite(this.cameras.main.centerX, 250, "retryButton").setInteractive({useHandCursor: true});
        restartButton.setScale(0.4);
        restartButton.on("pointerover", () => {
            this.sound.play("buttonHover");
        });
        restartButton.on("pointerdown", () => {
            this.sound.play("buttonClick");
            this.restart();
        });

        let titleButton = this.add.sprite(this.cameras.main.centerX, 410, "titleButton").setInteractive({useHandCursor: true});
        titleButton.setScale(0.4);
        titleButton.on("pointerover", () => {
            this.sound.play("buttonHover");
        });
        titleButton.on("pointerdown", () => {
            this.sound.play("buttonClick");
            this.home();
        });

        let nextStageButton = this.add.sprite(this.cameras.main.centerX, 330, "nextStageButton").setInteractive({useHandCursor: true});
        nextStageButton.setScale(0.4);
        nextStageButton.on("pointerover", () => {
            this.sound.play("buttonHover");
        });
        nextStageButton.on("pointerdown", () => {
            this.sound.play("buttonClick");
            this.nextstage();
        });

        this.cameras.main.setBackgroundColor('#000000')
    }

    nextstage(){
        this.scene.start('GameScene2');
        this.sound.stopAll();
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