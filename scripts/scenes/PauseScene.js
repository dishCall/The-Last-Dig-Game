export default class PauseScene extends Phaser.Scene {
    constructor() {
      super("PauseScene");
    }
  
    preload() {
        this.load.image("Pausebg", "/assets/background/PauseBG.png");
        this.load.image("logopause", "/assets/images/GameLogo.png");
        this.load.image("retryButton", "/assets/buttons/Retry.png");
        this.load.image("retryButtonHover", "/assets/buttons/RetryHover.png");
        this.load.image("titleButton", "/assets/buttons/Menu.png");
        this.load.image("titleButtonHover", "/assets/buttons/MenuHover.png");
        this.load.image("resumeButton", "/assets/buttons/Resume.png");
        this.load.image("resumeButtonHover", "/assets/buttons/ResumeHover.png");
        this.load.image("soundButton", "/assets/buttons/Sound.png");
        this.load.image("soundButtonHover", "/assets/buttons/SoundHover.png");
        this.load.audio("buttonHover", "/assets/audio/HoverButtonSFX.mp3");
        this.load.audio("buttonClick", "/assets/audio/ClickButtonSFX.mp3");
        
    }

    create() {

              //Logo
      const logoPause = this.add.image(
        100,
        100,
        "logopause"
      );
      logoPause.setScale(0.3);

        // Add background
        const background = this.add.image(0, 0, 'Pausebg')
        .setOrigin(0)
        .setDepth(-2)
        .setScale(0.3,0.5);
      
        // Add resume button
        const resumeButton = this.add.image(100, 190, 'resumeButton')
          .setInteractive()
          .setDepth(-1)
          .setScale(0.55)
          .on('pointerup', () => {
            this.sound.play('buttonClick');
            this.scene.resume('GameScene');
            this.scene.stop();
          })
          .on('pointerover', () => {
            resumeButton.setTexture('resumeButtonHover');
            this.sound.play('buttonHover');
          })
          .on('pointerout', () => {
            resumeButton.setTexture('resumeButton');
          });
      
        // Retry button
        const retryButton = this.add.image(100, 240, 'retryButton')
          .setInteractive()
          .setDepth(-1)
          .setScale(0.55)
          .on('pointerup', () => {
            this.sound.play('buttonClick');
            this.scene.stop();
            this.sound.stopAll();
            this.scene.start('GameScene');
          })
          .on('pointerover', () => {
            retryButton.setTexture('retryButtonHover');
            this.sound.play('buttonHover');
          })
          .on('pointerout', () => {
            retryButton.setTexture('retryButton');
          });
      
        // Main menu button
          const mainMenuButton = this.add.image(100, 290, 'titleButton')
          .setInteractive()
          .setDepth(-1)
          .setScale(0.55)
          .on('pointerup', () => {
            this.sound.play('buttonClick');
            this.sound.stopAll();
            this.scene.start('TitleScene');
            this.scene.stop();
            this.scene.stop('GameScene');
          })
          .on('pointerover', () => {
            mainMenuButton.setTexture('titleButtonHover');
            this.sound.play('buttonHover');
          })
          .on('pointerout', () => {
            mainMenuButton.setTexture('titleButton');
          });
      
        // Sound on/off button
        const soundButton = this.add.image(100, 340, 'soundButton')
          .setInteractive()
          .setDepth(-1)
          .setScale(0.55)
          .on('pointerup', () => {
            this.sound.play('buttonClick');
            if (this.sound.mute) {
              this.sound.setMute(false);
              this.sound.play('buttonClick');
              soundButton.setTexture('soundButton');
            } else {
              this.sound.setMute(true);
              this.sound.play('buttonClick');
              soundButton.setTexture('soundButton');
            }
          })
          .on('pointerover', () => {
            soundButton.setTexture('soundButtonHover');
            this.sound.play('buttonHover');
          })
          .on('pointerout', () => {
            soundButton.setTexture('soundButton');
          });
      }}