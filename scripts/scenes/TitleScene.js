export default class TitleScene extends Phaser.Scene {
    constructor() {
      super("TitleScene");
    }
  
    preload() {
      this.load.image("bg", "/assets/background/1.png");
      this.load.image("bg2", "/assets/background/2.png");
      this.load.image("bg3", "/assets/background/3.png");
      this.load.image("bg4", "/assets/background/4.png");
      this.load.image("bg5", "/assets/background/5.png");
      this.load.image("bg6", "/assets/background/6.png");
      this.load.image("bg7", "/assets/background/7.png");
      this.load.image("bg8", "/assets/background/8.png");
      this.load.image("bg9", "/assets/background/9.png");
      this.load.image("bg10", "/assets/background/10.png");
      this.load.image("bg11", "/assets/background/11.png");
      this.load.image("bg12", "/assets/background/12.png");
      this.load.image("bg13", "/assets/background/13.png");
      this.load.image("bg14", "/assets/background/14.png");
      this.load.image("bg15", "/assets/background/15.png");
      this.load.image("bg16", "/assets/background/16.png");
      this.load.image("bg17", "/assets/background/17.png");
      this.load.image("Mainbg", "/assets/background/MenuBG.png");
      this.load.image("Mainbg2", "/assets/background/mainbg2.png");
      this.load.image("Mainbg3", "/assets/background/mainbg3.png");
      this.load.image("logo", "/assets/images/GameLogo.png");
      this.load.image("playButton", "/assets/buttons/Play.png");
      this.load.image("playButtonHover", "/assets/buttons/PlayHover.png");
      this.load.image("instructionsButton", "/assets/buttons/Instructions.png");
      this.load.image("instructionsButtonHover", "/assets/buttons/InstructionsHover.png");
      this.load.image("creditsButton", "/assets/buttons/Credits.png");
      this.load.image("creditsButtonHover", "/assets/buttons/CreditsHover.png");
      this.load.image("quitButton", "/assets/buttons/Quit.png");
      this.load.image("quitButtonHover", "/assets/buttons/QuitHover.png");
      this.load.audio("introBGM", "/assets/audio/MainMenuBGM.mp3");
      this.load.audio("buttonHover", "/assets/audio/HoverButtonSFX.mp3");
      this.load.audio("buttonClick", "/assets/audio/ClickButtonSFX.wav");
    }
  
    create() {
      //Background
      let bg = this.add.image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "Mainbg"
      );
      bg.setScale(0.4);
  
      //Logo
      let logo = this.add.image(
        this.cameras.main.centerX,
        100,
        "logo"
      );
      logo.setScale(0.5);
  
      // Play Button Coiny Font
      let playButton = this.add.image(
        this.cameras.main.centerX,
        200,
        "playButton"
      );
      playButton.setScale(1);
      playButton.setInteractive({ useHandCursor: true });

      let PlayButtonHover = this.add.image(
        this.cameras.main.centerX,
        200,
        "playButtonHover"
      );
      PlayButtonHover.setScale(1);
      PlayButtonHover.setVisible(false); 

      playButton.on("pointerover", () => {
        this.sound.play("buttonHover");
        PlayButtonHover.setVisible(true); 
      });

      playButton.on("pointerout", () => {
        PlayButtonHover.setVisible(false); 
      });

      playButton.on("pointerdown", () => {
        this.sound.play("buttonClick");
        this.play();
      });
  
      // Instructions
      let InstructionsButton = this.add.image(
        this.cameras.main.centerX,
        270,
        "instructionsButton"
      );
      InstructionsButton.setScale(1);
      InstructionsButton.setInteractive({ useHandCursor: true });

      let InstructionsButtonHover = this.add.image(
        this.cameras.main.centerX,
        270,
        "instructionsButtonHover"
      );
      InstructionsButtonHover.setScale(1);
      InstructionsButtonHover.setVisible(false); 

      InstructionsButton.on("pointerover", () => {
        this.sound.play("buttonHover");
        InstructionsButtonHover.setVisible(true); 
      });

      InstructionsButton.on("pointerout", () => {
        InstructionsButtonHover.setVisible(false); 
      });

      InstructionsButton.on("pointerdown", () => {
        this.sound.play("buttonClick");
        this.instructions();
      });
  
      // Credits
      let CreditsButton = this.add.image(
        this.cameras.main.centerX,
        340,
        "creditsButton"
      );
      CreditsButton.setScale(1);
      CreditsButton.setInteractive({ useHandCursor: true });

      let CreditsButtonHover = this.add.image(
        this.cameras.main.centerX,
        340,
        "creditsButtonHover"
      );
      CreditsButtonHover.setScale(1);
      CreditsButtonHover.setVisible(false); 

      CreditsButton.on("pointerover", () => {
        this.sound.play("buttonHover");
        CreditsButtonHover.setVisible(true); 
      });

      CreditsButton.on("pointerout", () => {
        CreditsButtonHover.setVisible(false); 
      });

      CreditsButton.on("pointerdown", () => {
        this.sound.play("buttonClick");
        this.credits();
      });
  
      // Quit 
      let QuitButton = this.add.image(
        this.cameras.main.centerX,
        410,
        "quitButton"
      );
      QuitButton.setScale(1);
      QuitButton.setInteractive({ useHandCursor: true });

      let QuitButtonHover = this.add.image(
        this.cameras.main.centerX,
        410,
        "quitButtonHover"
      );
      QuitButtonHover.setScale(1);
      QuitButtonHover.setVisible(false); 

      QuitButton.on("pointerover", () => {
        this.sound.play("buttonHover");
        QuitButtonHover.setVisible(true); 
      });

      QuitButton.on("pointerout", () => {
        QuitButtonHover.setVisible(false); 
      });

      QuitButton.on("pointerdown", () => {
        this.sound.play("buttonClick");
        this.quit();
      });


    // IntroBGM
    if (!this.sound.get("introBGM")) {
      this.introBGM = this.sound.add("introBGM", { loop: true });
      this.introBGM.play();
      this.introBGM.volume = 3
    } else if (!this.sound.get("introBGM").isPlaying) {
      this.sound.get("introBGM").play();
    }

    //Hover Button SFX
    let buttonHover = this.sound.add("buttonHover");
    buttonHover.volume = 0.1;

    //Click Button SFX
    let buttonClick = this.sound.add("buttonClick");
    buttonClick.volume = 1;

    }
  
    play() {
      this.scene.start("GameScene1");
      this.sound.stopAll();
    }
  
    instructions() {
      this.scene.start("InstructionScene");
      this.sound.play("buttonClick");
    }
  
    credits() {
      this.scene.start("CreditsScene");
      this.sound.play("buttonClick");
    }
  
    quit() {
        if (confirm("Are you sure you want to quit?")) {
          var newWindow = window.open("", "_self");
          window.close();
          newWindow.close();
        }
      }
  }