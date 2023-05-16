export default class GameScene extends Phaser.Scene {
    constructor(){
        super('GameScene')
    }

    init(){
        this.lives = 3;
        this.player;
        this.coins;
        this.cursors;
        this.coinsScore = 0;
        this.coinCounter = 0;
        this.score = 0;
        this.pMobs;
        this.gEnemies;
        this.enemyMovementRange = 200;
        this.keyIsInPlayer = false;
    }

    preload(){
        this.load.image('tiles', './assets/maps/sheet.png');
        this.load.tilemapTiledJSON('tilemap', './assets/maps/Level1.tmj');
        this.load.image('heart', './assets/icons/heart.png');
        this.load.image('coin', './assets/images/Key.png');
        this.load.image('FindKeyText', './assets/images/FindKey.png');
        this.load.image('KeyCollectText', './assets/images/KeyCollect.png');
        this.load.image('BlueShell', './assets/images/BlueShell.png');
        this.load.image('RedShell', './assets/images/RedShell.png');
        this.load.image("pauseButton", "/assets/buttons/Pause.png");
        this.load.image("pauseButtonHover", "/assets/buttons/PauseHover.png");
        this.load.spritesheet('player_right', '/assets/images/Adventurer.png', {frameWidth: 32, frameHeight: 32});
                this.load.spritesheet('player_left', '/assets/images/AdventurerLeft.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('player_attack_right', '/assets/images/AttackAnim.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('player_attack_left', '/assets/images/AttackAnimLeft.png', {frameWidth: 32, frameHeight: 32});
        this.load.audio("gameBGM", "/assets/audio/GameBGM.mp3");
        this.load.audio("CollectCoin", "/assets/audio/CollectCoinSFX.mp3");
        this.load.audio("Hitsfx", "/assets/audio/HitSFX.wav");
        this.load.audio("JumpHitEnemysfx", "/assets/audio/JumpHitEnemySFX.mp3");
        this.load.audio("JumpHitBluesfx", "/assets/audio/JumpHitBlueSFX.mp3");
        this.load.audio("FriendHitEnemysfx", "/assets/audio/FriendHitEnemySFX.mp3");
    }

    
    create(){
        
        let bg = this.add.image(this.cameras.main.centerX, 350, 'bg').setScale(1.5).setScrollFactor(0.3);
        let bg2 = this.add.image(this.cameras.main.centerX, 350, 'bg2').setDepth(-3).setScale(1.5).setScrollFactor(0.3);
        let bg3 = this.add.image(this.cameras.main.centerX, 280, 'bg3').setDepth(-1).setScale(1.5).setScrollFactor(0.1);
        let bg4 = this.add.image(this.cameras.main.centerX, 280, 'bg4').setDepth(-2).setScale(1.5).setScrollFactor(0.2);
        let bg6 = this.add.image(this.cameras.main.centerX, 280, 'bg6').setDepth(-5).setScale(1.5).setScrollFactor(0.1);

        
        this.cameras.main.startFollow(bg);
        
        this.cameras.main.on('camerafadeoutcomplete', function () {
            this.cameras.main.fadeIn(2000);
            this.cameras.main.setScroll(0, 0);
            this.cameras.main.setBounds(0, 0, bg.width, bg.height);
        }, this);
        
        this.cameras.main.setBounds(0, 0, bg.width * 2, bg.height);
        
        this.cameras.main.setScroll(0, 0);
        
        this.cameras.main.setZoom(1);
        
        this.cameras.main.setLerp(0.1);
        
        this.cameras.main.setBackgroundColor('#000000');
        
        this.cameras.main.fadeIn(2000);
        
        this.cameras.main.on('cameraupdate', function () {
            bg.x = this.cameras.main.scrollX * 0.1;
            bg2.x = this.cameras.main.scrollX * 0.3;
            bg3.x = this.cameras.main.scrollX * 0.6;
            bg4.x = this.cameras.main.scrollX * 0.9;
            bg5.x = this.cameras.main.scrollX * 0.9;
            bg6.x = this.cameras.main.scrollX * 0.9;

        }, this);

        //BGM
        this.sound.play("gameBGM", { loop: true, volume: 0.3 });

        // Map
        this.map = this.make.tilemap({key: 'tilemap'});
        this.tileset = this.map.addTilesetImage('tiles_packed', 'tiles');
        this.platform = this.map.createLayer('platform', this.tileset, 0, 60);
        this.flag = this.map.createLayer('flag', this.tileset, 0, 60);
        this.water = this.map.createLayer('water', this.tileset, 0, 60);
    
        this.map.createLayer('backdrops-extra', this.tileset, 0, 60)
        this.map.createLayer('backdrops', this.tileset, 0, 60)
        this.map.createLayer('extra details', this.tileset, 0, 60)
        
        this.flag.setCollisionByExclusion(-1, true);
        this.platform.setCollisionByExclusion(-1, true);
        this.water.setCollisionByExclusion(-1, true);
    
        // Coins
        this.coins = this.physics.add.staticGroup();
        this.coins.create(50, 100, 'coin');

        // Player
        this.player = this.physics.add.sprite(200, 850, 'player');
        this.player.setScale(1.2);

        this.player.setCollideWorldBounds(false);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player_left', { start: 3, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn_right',
            frames: [{ key: 'player_right', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'turn_left',
            frames: [{ key: 'player_left', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player_right', { start: 6, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack_right',
            frames: this.anims.generateFrameNumbers('player_attack_right', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        });

                this.anims.create({
            key: 'attack_left',
            frames: this.anims.generateFrameNumbers('player_attack_left', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        });

        this.player.invulnerable = false;

        //Hearts
        this.heart1 = this.add.sprite(30, 50, 'heart').setScrollFactor(0);
        this.heart2 = this.add.sprite(60, 50, 'heart').setScrollFactor(0);
        this.heart3 = this.add.sprite(90, 50, 'heart').setScrollFactor(0);

        // Pause button
        const pauseButton = this.add.image(765, 35, 'pauseButton')
        .setInteractive()
        .setScrollFactor(0)
        .setScale(0.1)
        .on('pointerup', () => {
        this.sound.play('buttonClick');
        this.scene.pause('GameScene');
        this.scene.run('PauseScene');
        });

        const hoverImage = this.add.image(765, 35, 'pauseButtonHover')
        .setAlpha(0)
        .setScale(0.1)
        .setScrollFactor(0);

        pauseButton.on('pointerover', () => {
        this.sound.play('buttonHover');
        hoverImage.setAlpha(1);
        });

        pauseButton.on('pointerout', () => {
        hoverImage.setAlpha(0);
        });

        // Score
        this.scoreText = this.add.text(15, 10, `Score: ${this.score}`,{
            fontSize: '20px',
            fill: '#ffffff'
        }); 
        this.scoreText.setScrollFactor(0);
    
        // Physics and Camera
        this.physics.add.collider(this.player, this.platform);

        this.physics.add.overlap(this.player, this.coins, this.collectCoins, null, this);

        // Lose Conditions - If player collides with red enemies/water
        this.physics.add.collider(this.player, this.water, this.gameOver, null, this);
        
        // Win Conditions - If player collides with the flag at the end of the map
        this.physics.add.collider(this.player, this.flag, this.playerOnDoor, null, this);
    
        this.cameras.main
        .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        .startFollow(this.player);
    }
    
update() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.speed = 150;

    if (this.cursors.space.isDown) {
        if (this.player.flipX) {
            this.player.anims.play('attack_left', true);
        } else {
            this.player.anims.play('attack_right', true);
        }
        this.player.setVelocityX(0);
    } else if (this.cursors.left.isDown) {
        this.player.setVelocityX(-this.speed);
        this.player.anims.play('left', true);
        this.player.flipX = true; // Set flipX to true to face left
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(this.speed);
        this.player.anims.play('right', true);
        this.player.flipX = false; // Set flipX to false to face right
    } else {
        this.player.setVelocityX(0);
        if (this.player.flipX) {
            this.player.anims.play('turn_left');
        } else {
            this.player.anims.play('turn_right');
        }
    }

    if (this.cursors.up.isDown && this.player.body.onFloor()) {
        this.player.setVelocityY(-500);
    }
}

    
    collectCoins(player, coins) {
        coins.destroy();
        this.coinsScore++;
    
        this.keyIsInPlayer = true; 
    
        const keyCollectedImage = this.add.image(400, 100, "KeyCollectText")
            .setOrigin(0.5, 1)
            .setScale(0.15) 
            .setScrollFactor(0);
    
        this.sound.play("CollectCoin", { volume: 0.3 });
    
        this.time.delayedCall(3000, function() {
            keyCollectedImage.destroy();
        }, [], this);
    
        return false;
    }


    // Win-Lose Functions
    playerOnDoor(player, flag) {
    if (this.keyIsInPlayer) {
        this.scene.start("StageClearScene");
        this.sound.stopAll();
    } else {
        if (!this.keyReminderImage) {
            this.sound.play("buttonClick")
            this.keyReminderImage = this.add.image(400, 100, "FindKeyText").setOrigin(0.5, 1).setScrollFactor(0);
            this.keyReminderImage.setScale(0.15);
            
            this.time.delayedCall(3000, function() {
                this.keyReminderImage.destroy();
                this.keyReminderImage = null;
            }, [], this);
        }
    }
}
    
    gameOver() {
        this.sound.stopAll();
        this.scene.start('GameOverScene');
      }

}
