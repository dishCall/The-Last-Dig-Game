export default class GameScene2 extends Phaser.Scene {
    constructor(){
        super('GameScene2')
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
    }

    preload(){
        this.load.image('tiles', './assets/maps/sheet2.png');
        this.load.tilemapTiledJSON('tilemap2', './assets/maps/desertmap.tmj');
        this.load.image('heart', './assets/icons/heart.png');
        this.load.image('coin', './assets/images/coin.png');
        this.load.image('BlueShell', './assets/images/BlueShell.png');
        this.load.image('RedShell', './assets/images/RedShell.png');
        this.load.spritesheet('player', '/assets/images/Adventurer.png', {frameWidth: 32, frameHeight: 48});
        this.load.audio("gameBGM2", "/assets/audio/GameBGM2.mp3");
        this.load.audio("CollectCoin", "/assets/audio/CollectCoinSFX.mp3");
        this.load.audio("Hitsfx", "/assets/audio/HitSFX.wav");
        this.load.audio("JumpHitEnemysfx", "/assets/audio/JumpHitEnemySFX.mp3");
        this.load.audio("JumpHitBluesfx", "/assets/audio/JumpHitBlueSFX.mp3");
        this.load.audio("FriendHitEnemysfx", "/assets/audio/FriendHitEnemySFX.mp3");
    }

    
    create(){

        let bg7 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg7').setScale(2).setScrollFactor(0.01);
        let bg8 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg8').setDepth(-1).setScale(2).setScrollFactor(0.1);
        let bg9 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg9').setDepth(-2).setScale(2).setScrollFactor(0.2);
        let bg10 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg10').setDepth(-3).setScale(2).setScrollFactor(0.1);
        let bg11 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg11').setDepth(-4).setScale(2).setScrollFactor(0.2);
        let bg12 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg12').setDepth(-5).setScale(2).setScrollFactor(0.01);
        
        this.cameras.main.startFollow(bg12);
        
        this.cameras.main.on('camerafadeoutcomplete', function () {
            this.cameras.main.fadeIn(2000);
            this.cameras.main.setScroll(0, 0);
            this.cameras.main.setBounds(0, 0, bg7.width, bg7.height);
        }, this);
        
        this.cameras.main.setBounds(0, 0, bg7.width * 2, bg7.height);
        
        this.cameras.main.setScroll(0, 0);
        
        this.cameras.main.setZoom(1);
        
        this.cameras.main.setLerp(0.1);
        
        this.cameras.main.setBackgroundColor('#000000');
        
        this.cameras.main.fadeIn(2000);
        
        this.cameras.main.on('cameraupdate', function () {
            bg7.x = this.cameras.main.scrollX * 0.1;
            bg8.x = this.cameras.main.scrollX * 0.3;
            bg9.x = this.cameras.main.scrollX * 0.6;
            bg10.x = this.cameras.main.scrollX * 0.9;
            bg11.x = this.cameras.main.scrollX * 0.9;
            bg12.x = this.cameras.main.scrollX * 0.9;

        }, this);

        //BGM
        this.sound.play("gameBGM2", { loop: true, volume: 0.3 });

        // Map
        this.map = this.make.tilemap({key: 'tilemap2'});
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
        this.CoinLayer = this.map.getObjectLayer('coins')['objects'];
        
        this.coins = this.physics.add.staticGroup()
        this.CoinLayer.forEach(object => {
            let obj = this.coins.create(object.x, object.y, "coin"); 
            obj.setScale(object.width/18, object.height/18); 
            obj.setOrigin(0.5, 0.5); 
            obj.body.width = object.width; 
            obj.body.height = object.height;
        })
    
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
        this.player = this.physics.add.sprite(200, 350, 'player');
    
        this.player.setCollideWorldBounds(false);
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.player.invulnerable = false;

        //Hearts
        this.heart1 = this.add.sprite(30, 50, 'heart').setScrollFactor(0);
        this.heart2 = this.add.sprite(60, 50, 'heart').setScrollFactor(0);
        this.heart3 = this.add.sprite(90, 50, 'heart').setScrollFactor(0);

        // Texts
        this.coinText = this.add.text(180, 10, `Coins: ${this.coinsScore}x`, {
            fontSize: '20px',
            fill: '#ffffff'
          });
        this.coinText.setScrollFactor(0);
    
        this.scoreText = this.add.text(15, 10, `Score: ${this.score}`,{
            fontSize: '20px',
            fill: '#ffffff'
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
        this.physics.add.collider(this.player, this.flag, this.clear, null, this);
    
        this.cameras.main
        .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        .startFollow(this.player);
    }
    
    update(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.speed = 150;
        

        if (this.cursors.left.isDown){
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
            this.player.setVelocityY(-380);
        }
    }
    
    collectCoins(player, coins){
        coins.destroy(coins.x, coins.y)
        this.coinsScore ++;
        this.coinCounter++;
    
        this.coinText.setText(`Coins: ${this.coinsScore}x`);
    
        if(this.coinCounter==5){
            this.score+=200
            this.scoreText.setText(`Score: ${this.score}`);
            this.coinCounter = 0;
        }
    
        if(this.coinsScore==21){
            this.score+=1000
            this.scoreText.setText(`Score: ${this.score}`);
        }
        
        this.sound.play("CollectCoin", { volume: 0.3 });
    
        return false; 
    }
    hitEnemy(player, gEnemies){

        player.setVelocityY(-400)
    
        if(gEnemies.body.touching.up && !gEnemies.hit){
            this.sound.play("JumpHitEnemysfx");
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
    
            this.score+=100
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
                this.scene.start("GameOverScene2")
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
    clear(){
        this.scene.start("StageClearScene2")
        this.sound.stopAll();
    }

    gameOver() {
        this.sound.stopAll();
        this.scene.start('GameOverScene2');
      }

}
