export default class InstructionScene extends Phaser.Scene{

    constructor(){
        super("InstructionScene")
    }

    init(){
        this.counter = 1;
    }

    preload(){
       this.load.image('controls', './assets/images/Guide1.png');
       this.load.image('lives', './assets/images/Guide2.png');
       this.load.image('coins', './assets/images/Guide3.png');
       this.load.image('mobs', './assets/images/Guide4.png');
       this.load.image("backButton", "/assets/buttons/Back.png");
       this.load.image("nextButton", "/assets/buttons/Next.png");
       this.load.image("prevButton", "/assets/buttons/Prev.png");
       this.load.audio("buttonHover", "/assets/audio/HoverButtonSFX.mp3");
       this.load.audio("buttonClick", "/assets/audio/ClickButtonSFX.mp3");
    }

    create(){

        this.controls = this.add.image(400, 246, 'controls').setScale(1.34);
        this.lives  = this.add.image(400, 246, 'lives').setScale(1.34);
        this.coins  = this.add.image(400, 246, 'coins').setScale(1.34);
        this.mobs  = this.add.image(400, 246, 'mobs').setScale(1.34);

        //Default Visibility
        this.lives.setVisible(false);
        this.coins.setVisible(false);
        this.mobs.setVisible(false);

        //Next Button
        let nextButton = this.add.image(
            750,
            440,
            "nextButton"
            );

        nextButton.setScale(0.2);
        nextButton.setInteractive({ useHandCursor: true });
        nextButton.on("pointerover", () => {
            this.sound.play("buttonHover");
        });
        nextButton.on('pointerdown', () => this.nxtPage());

        //Prev Button
        let prevButton = this.add.image(
            50,
            440,
        "prevButton"
        );

        prevButton.setScale(0.2);
        prevButton.setInteractive({ useHandCursor: true });
        prevButton.on("pointerover", () => {
            this.sound.play("buttonHover");
        });
        prevButton.on('pointerdown', () => this.prevPage());


        // Back Button
        let backButton = this.add.image(
            75,
            60,
            "backButton"
        );

        backButton.setScale(0.4);
        backButton.setInteractive({ useHandCursor: true });
        backButton.on("pointerover", () => {
            this.sound.play("buttonHover");
        });
        backButton.on("pointerdown", () => {
        this.scene.start("TitleScene");
        this.sound.play("buttonClick");
        });

    }

    nxtPage(){
        this.sound.play("buttonClick");
        this.counter++
        if(this.counter==2){
            this.lives.setVisible(true);
            prevButton.setVisible(true);
        }

        if(this.counter==3){
            this.coins.setVisible(true);
        }

        if(this.counter==4){
            this.mobs.setVisible(true);
            nextButton.setVisible(false);
        }
    }

    prevPage(){
        this.sound.play("buttonClick");
        this.counter--
        if(this.counter==1){
            this.lives.setVisible(false);
            prevButton.setVisible(false);
        }
        
        if(this.counter==2){
            this.coins.setVisible(false);
        }

        if(this.counter==3){
            this.mobs.setVisible(false);
            nextButton.setVisible(true);
        }
    }

    close(){
        this.scene.start("TitleScene")
    }

}