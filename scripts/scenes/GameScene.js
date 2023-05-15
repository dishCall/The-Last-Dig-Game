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
        this.load.tilemapTiledJSON('tilemap', './assets/maps/snowmap.tmj');
        this.load.image('heart', './assets/icons/heart.png');
        this.load.image('coin', './assets/images/Key.png');
        this.load.image('BlueShell', './assets/images/BlueShell.png');
        this.load.image('RedShell', './assets/images/RedShell.png');
        this.load.spritesheet('player', '/assets/images/Adventurer.png', {frameWidth: 32, frameHeight: 48});
        this.load.spritesheet('player_attack', '/assets/images/AttackAnim.png', {frameWidth: 32, frameHeight: 48});
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
        this.coins.create(300, 300, 'coin');
        // RedShell
        this.enemyGround = this.map.getObjectLayer('ground enemies')['objects'];
    
        this.gEnemies = this.physics.add.group();
        this.enemyGround.forEach(object => {
            let obj = this.gEnemies.create(object.x, object.y, "RedShell");
            obj.setScale(object.width/16, object.height/16); 
            obj.setOrigin(0);
            obj.setImmovable([true]); 
            obj.body.width = object.width; 
            obj.body.height = object.height;
        })
        
        // BlueShell
        this.pushMobs = this.map.getObjectLayer('push mobs')['objects'];
        
        this.pMobs = this.physics.add.group();
        this.pushMobs.forEach(object => {
            let obj = this.pMobs.create(object.x, object.y, "BlueShell");
            obj.setScale(object.width/16, object.height/16); 
            obj.setOrigin(0); 
            obj.body.width = object.width; 
            obj.body.height = object.height;
        })
    
        // Player
        this.player = this.physics.add.sprite(200, 850, 'player');
        this.player.setScale(1.2);

        this.player.setCollideWorldBounds(false);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('player_attack', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        });

        this.player.invulnerable = false;

        //Hearts
        this.heart1 = this.add.sprite(30, 50, 'heart').setScrollFactor(0);
        this.heart2 = this.add.sprite(60, 50, 'heart').setScrollFactor(0);
        this.heart3 = this.add.sprite(90, 50, 'heart').setScrollFactor(0);

        // Texts
      /*  this.coinText = this.add.text(180, 10, `Coins: ${this.coinsScore}x`, {
            fontSize: '20px',
            fill: '#000000'
          });
        this.coinText.setScrollFactor(0);
    */
        this.scoreText = this.add.text(15, 10, `Score: ${this.score}`,{
            fontSize: '20px',
            fill: '#000000'
        });
        this.scoreText.setScrollFactor(0);
    
        // Physics and Camera
        this.physics.add.collider(this.player, this.platform);
        this.physics.add.collider(this.player, this.pMobs);
        this.physics.add.collider(this.pMobs, this.platform);
        this.physics.add.collider(this.gEnemies, this.platform);
        

        this.physics.add.overlap(this.player, this.coins, this.collectCoins, null, this);
        this.physics.add.collider(this.player, this.pMobs, this.upMob, null, this);
        this.physics.add.collider(this.pMobs, this.gEnemies, this.hitMob, null, this);

        // Lose Conditions - If player collides with red enemies/water
        this.physics.add.collider(this.player, this.water, this.gameOver, null, this);
        this.physics.add.collider(this.player, this.gEnemies, this.hitEnemy, null, this);
        
        // Win Conditions - If player collides with the flag at the end of the map
        this.physics.add.collider(this.player, this.flag, this.playerOnDoor, null, this);
    
        this.cameras.main
        .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        .startFollow(this.player);
    }
    
    update(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.speed = 150;
        
        if (this.cursors.space.isDown) {
            this.player.anims.play('attack', true);
            this.player.setVelocityX(0);
        }
        else if (this.cursors.left.isDown){
            this.player.setVelocityX(-this.speed);
            this.player.anims.play('left', true);
        }
    
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(this.speed);
            this.player.anims.play('right', true);
        }
    
        else{
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }   
    
        if (this.cursors.up.isDown && this.player.body.onFloor()){
            this.player.setVelocityY(-500);
        }
    }
    
    collectCoins(player, coins){
        coins.destroy();
        this.coinsScore++;
    
        this.keyIsInPlayer = true; // set keyIsInPlayer to true
        this.add.text(510, 20, 'Key Collected!', {
            font: 'bold 16px Arial',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(1, 0).setScrollFactor(0); // add text to show that key is collected
        this.sound.play("CollectCoin", { volume: 0.3 });
    
        return false; 
    }
    hitEnemy(player, gEnemies){
     
    if (player.anims.currentAnim.key == 'attack') {
        gEnemies.disableBody(false,false);
        this.tweens.add({
            targets: gEnemies,
            alpha: 0.3,
            scaleX: 1.5,
            scaleY: 1.5,
            ease: 'Linear',
            duration: 200,
            onComplete: function() {
                gEnemies.destroy(gEnemies.x, gEnemies.y);
            },
        });

        this.score+=100;
        this.scoreText.setText(`Score: ${this.score}`);
    }
    
        else{
            if (player.invulnerable == false){
                this.sound.play("Hitsfx");
                this.lives-=1
                player.setTint(0xff0000);
                player.invulnerable = true;
                
                if (this.lives == 2){
                    this.tweens.add({
                        targets: this.heart3,
                        alpha: 0,
                        scaleX: 0,
                        scaleY: 0,
                        ease: 'Linear',
                        duration: 200
                    });
                }
    
                else if(this.lives == 1){
                    this.tweens.add({
                        targets: this.heart2,
                        alpha: 0,
                        scaleX: 0,
                        scaleY: 0,
                        ease: 'Linear',
                        duration: 200
                    });
                }
            }
    
            // remove I-frame
            this.time.delayedCall(1000, this.removeIFrame, [], this);
    
            if(this.lives==0){
                this.sound.play("Hitsfx");
                this.scene.start("GameOverScene")
                this.sound.stopAll();
            }
        }
    }

    removeIFrame(){
        this.player.clearTint()
        this.player.invulnerable = false;
    }
    
    hitMob (pMobs, gEnemies){
        
        pMobs.setVelocityX(100)

        gEnemies.disableBody(false,false);
        this.sound.play("FriendHitEnemysfx", { volume : 2});
        this.tweens.add({
            targets: gEnemies,
            alpha: 0.3,
            scaleX: 1.5,
            scaleY: 1.5,
            ease: 'Linear',
            duration: 200,
            onComplete: function() {
                gEnemies.destroy(gEnemies.x, gEnemies.y);
            },
        });
        this.score+=100;
        this.scoreText.setText(`Score: ${this.score}`);    
    }
    
    // when player is up the pMob
    upMob (player, pMobs){

        if(pMobs.body.touching.up && !pMobs.hit){
            this.sound.play("JumpHitBluesfx")
            player.setVelocityY(-400)
        }
    }

    // Win-Lose Fucntions
    playerOnDoor(player, flag) {
        if (this.keyIsInPlayer) {
            this.scene.start("StageClearScene");
            this.sound.stopAll();
        } else {
            // Show text for a few seconds if the player hasn't collected the key
            if (!this.keyReminderText) {
                this.keyReminderText = this.add.text(350, 250, "You need to find the key first!", {
                    font: 'bold 16px Arial',
                    fill: '#fff',
                    stroke: '#000',
                    strokeThickness: 4
                }).setOrigin(0.5, 1).setScrollFactor(0);
    
                this.time.delayedCall(3000, function() {
                    this.keyReminderText.destroy();
                    this.keyReminderText = null;
                }, [], this);
            }
        }
    }
    
    gameOver() {
        this.sound.stopAll();
        this.scene.start('GameOverScene');
      }

}
