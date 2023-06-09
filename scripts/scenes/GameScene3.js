export default class GameScene3 extends Phaser.Scene {
    constructor(){
        super('GameScene3')
    }

    init(){
        this.lives = 3;
        this.player;
        this.RustyKeys;
        this.cursors;
        this.coinsScore = 0;
        this.coinCounter = 0;
        this.score = 0;
        this.pMobs;
        this.gEnemies;
        this.enemyMovementRange = 200;
        this.keyIsInPlayer = false;
        this.hasPlayedSfx = false;
        this.attackRange = 40;
        
    }

    preload(){
        this.load.image('tiles', './assets/maps/sheet.png');
        this.load.tilemapTiledJSON('tilemap3', './assets/maps/Level3.tmj');
        this.load.image('heart', './assets/icons/heart.png');
        this.load.image('RustyKey', './assets/images/Key.png');
        this.load.image('FindKeyText', './assets/images/FindKey.png');
        this.load.image('KeyCollectText', './assets/images/KeyCollect.png');
        this.load.image('BlueShell', './assets/images/BlueShell.png');
        this.load.image('RedShell', './assets/images/RedShell.png');
        this.load.image("pauseButton", "/assets/buttons/Pause.png");
        this.load.image("pauseButtonHover", "/assets/buttons/PauseHover.png");
        this.load.spritesheet('player_walk', '/assets/images/Adventurer.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('player_attack', '/assets/images/AttackAnim.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('player_jump', '/assets/images/JumpAnim.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('enemy', '/assets/images/ZombieEnemy.png', {frameWidth: 17, frameHeight: 48});
        this.load.audio("gameBGM3", "/assets/audio/GameBGM3.mp3");
        this.load.audio("CollectCoin", "/assets/audio/CollectCoinSFX.mp3");
        this.load.audio("Hitsfx", "/assets/audio/HitSFX.wav");
        this.load.audio("Swordmisssfx", "/assets/audio/SwordMissSFX.wav");
        this.load.audio("JumpHitBluesfx", "/assets/audio/JumpHitBlueSFX.mp3");
        this.load.audio("FriendHitEnemysfx", "/assets/audio/FriendHitEnemySFX.mp3");
        this.load.audio("oofPlayer", "/assets/audio/oof2.wav");
        this.load.audio("enemyDeath", "/assets/audio/arggs3.wav");
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
        this.sound.play("gameBGM3", { loop: true, volume: 0.4 });

        // Map
        this.map3 = this.make.tilemap({key: 'tilemap3'});
        this.tileset3 = this.map3.addTilesetImage('tiles_packed', 'tiles');
        this.platform3 = this.map3.createLayer('platform', this.tileset3, 0, 60);
        this.flag3 = this.map3.createLayer('flag', this.tileset3, 0, 60);
        this.water3 = this.map3.createLayer('water', this.tileset3, 0, 60);
    
        this.map3.createLayer('backdrops-extra', this.tileset3, 0, 60)
        this.map3.createLayer('backdrops', this.tileset3, 0, 60)
        this.map3.createLayer('extra details', this.tileset3, 0, 60)
        
        this.flag3.setCollisionByExclusion(-1, true);
        this.platform3.setCollisionByExclusion(-1, true);
        this.water3.setCollisionByExclusion(-1, true);
    
        //Key
        this.RustyKeys = this.physics.add.staticGroup();
        this.RustyKeys.create(910, 550, 'RustyKey');

        //Enemies

        this.enemies = this.physics.add.group();
        //Enemy 1
        const enemy = this.enemies.create(150, 750, 'enemy');
        enemy.setCollideWorldBounds(false);
        enemy.setVelocityX(20);

         //Enemy 2
        const enemy2 = this.enemies.create(190, 850, 'enemy');
        enemy2.setCollideWorldBounds(false);
        enemy2.setVelocityX(20);

        //Enemy 3
        const enemy3 = this.enemies.create(230, 250, 'enemy');
        enemy3.setCollideWorldBounds(false);
        enemy3.setVelocityX(20);

        //Enemy 4
        const enemy4 = this.enemies.create(170, 550, 'enemy');
        enemy4.setCollideWorldBounds(false);
        enemy4.setVelocityX(20);

        //Enemy 5
        const enemy5 = this.enemies.create(1450, 850, 'enemy');
        enemy5.setCollideWorldBounds(false);
        enemy5.setVelocityX(20);

        //Enemy 6
        const enemy6 = this.enemies.create(1550, 450, 'enemy');
        enemy6.setCollideWorldBounds(false);
        enemy6.setVelocityX(20);

        //Enemy 7
        const enemy7 = this.enemies.create(1580, 650, 'enemy');
        enemy7.setCollideWorldBounds(false);
        enemy7.setVelocityX(20);
        
    
        // Player
        this.player = this.physics.add.sprite(150, 900, 'player'); //150,900
        this.player.setScale(1.2);
        this.player.setCollideWorldBounds(false);
        this.player.body.setSize(32, 32);
        this.player.body.setOffset(0, 0);        
        this.player.setOrigin(0.5, 0.75); 
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player_walk', { start: 6, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn_right',
            frames: [{ key: 'player_walk', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'turn_left',
            frames: [{ key: 'player_walk', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player_walk', { start: 6, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack_right',
            frames: this.anims.generateFrameNumbers('player_attack', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

                this.anims.create({
            key: 'attack_left',
            frames: this.anims.generateFrameNumbers('player_attack', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player_jump', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy_movement',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
            });

        this.player.invulnerable = false;

        //Hearts
        this.heart1 = this.add.sprite(30, 50, 'heart').setScrollFactor(0);
        this.heart2 = this.add.sprite(60, 50, 'heart').setScrollFactor(0);
        this.heart3 = this.add.sprite(90, 50, 'heart').setScrollFactor(0);

        //Pause button
        const pauseButton = this.add.image(765, 35, 'pauseButton')
        .setInteractive()
        .setScrollFactor(0)
        .setScale(0.1)
        .on('pointerup', () => {
        this.sound.play('buttonClick');
        this.scene.pause('GameScene3');
        this.scene.run('PauseScene3');
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

        //Score
        this.scoreText = this.add.text(15, 10, `Score: ${this.score}`,{
            fontSize: '20px',
            fill: '#ffffff'
        }); 
        this.scoreText.setScrollFactor(0);
    
        //Physics and Camera
        this.physics.add.collider(this.player, this.platform3);

        this.physics.add.overlap(this.player, this.RustyKeys, this.collectCoins, null, this);
        
        this.physics.add.collider(this.player, this.water3, this.gameOver, null, this);
        this.physics.add.collider(this.enemies, this.platform3);
        
        this.physics.add.collider(this.player, this.flag3, this.playerOnDoor, null, this);
    
        this.physics.add.overlap(this.player,this.enemies,this.hitEnemy, null, this);
        this.cameras.main
        .setBounds(0, 0, this.map3.widthInPixels, this.map3.heightInPixels)
        .startFollow(this.player);
    }
    
    update() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.speed = 150;
    
        if (this.cursors.space.isDown) {
            // Attack animation
            if (this.player.flipX) {
                this.player.anims.play('attack_left', true);
            } else {
                this.player.anims.play('attack_right', true);
            }
            this.player.setVelocityX(0);
        
            // Check for enemies within attack range
            const enemiesInRange = this.enemies.getChildren().filter((enemy) => {
                return (
                    Math.abs(enemy.x - this.player.x) <= this.attackRange &&
                    Math.abs(enemy.y - this.player.y) <= this.attackRange
                );
            });
        
            enemiesInRange.forEach((enemy) => {
                enemy.destroy();
                this.sound.play("enemyDeath");
                this.score += 100;
                this.scoreText.setText(`Score: ${this.score}`);
            });
        } else if (this.cursors.left.isDown) {
            // Left movement animation
            this.player.setVelocityX(-this.speed);
            this.player.anims.play('left', true);
            this.player.flipX = true; 
        } else if (this.cursors.right.isDown) {
            // Right movement animation
            this.player.setVelocityX(this.speed);
            this.player.anims.play('right', true);
            this.player.flipX = false; 
        } else {
            this.player.setVelocityX(0);
            if (this.player.body.onFloor()) {
                // Standing or turning animation on the floor
                if (this.player.flipX) {
                    this.player.anims.play('turn_left');
                } else {
                    this.player.anims.play('turn_right');
                }
            } else {
                // Jump animation
                this.player.anims.play('jump', true);
            }
        }

        this.enemyMovementRange = 50;
        this.enemies.children.each((enemy) => {
            enemy.anims.play('enemy_movement', true);
          
            if (!enemy.originalX) {
              enemy.originalX = enemy.x;
            }
          
            // Move within the specified range
            if (enemy.x <= enemy.originalX - this.enemyMovementRange) {
                enemy.body.velocity.x = 20; 
                enemy.flipX = false; 
            } else if (enemy.x >= enemy.originalX + this.enemyMovementRange) {
                enemy.body.velocity.x = -20; 
                enemy.flipX = true; 
            }
          
          });

        if (this.player.anims.currentAnim.key === 'attack_right') {
            const currentFrame = this.player.anims.currentFrame;
            if (currentFrame && currentFrame.index === 3) {
                const volume = 0.25;
                this.sound.play('Swordmisssfx', { volume });
            }
        }

        if (this.player.anims.currentAnim.key === 'attack_left') {
            const currentFrame = this.player.anims.currentFrame;
            if (currentFrame && currentFrame.index === 3) {
                const volume = 0.25;
                this.sound.play('Swordmisssfx', { volume });
            }
        }
    
        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-500);
        }
        
    }

    
    hitEnemy(player, enemies){

        if (player.anims.currentAnim.key == 'attack_left' || player.anims.currentAnim.key == 'attack_right') {
            enemies.destroy();
            this.sound.play("enemyDeath");
            this.score+=100;
            this.scoreText.setText(`Score: ${this.score}`);
        }
        else{
                player.setVelocityY(-400)

            if (player.invulnerable == false){
                this.sound.play("oofPlayer");
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
    
            this.time.delayedCall(1000, this.removeIFrame, [], this);
    
            if(this.lives==0){
                this.sound.play("oofPlayer");
                this.scene.start("GameOverScene3")
                this.sound.stopAll();
            }
        }
    }

    removeIFrame(){
        this.player.clearTint()
        this.player.invulnerable = false;
    }
   
    collectCoins(player, RustyKeys) {
        RustyKeys.destroy();
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

    playerOnDoor(player, flag3) {
    if (this.keyIsInPlayer) {
        this.scene.start("StageClearScene3");
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
        this.scene.start('GameOverScene3');
      }

}
