export default class GameScene extends Phaser.Scene {
    constructor(){
        super('GameScene')
    }

    init(){
        this.player;
        this.enemy;
        this.playerHP = 3;
        this.score = 0;

    }

    preload(){
        this.load.image('tileset', './assets/maps/Tilesheet.png');
        this.load.tilemapTiledJSON('map1', './assets/maps/map1.json');
      
 
    }

    
    create(){
        this.map = this.make.tilemap({key: 'map1'});
        this.tileSet = this.map.addTilesetImage('level3', 'tileset');
        this.flyPlatformLayer = this.map.createLayer('flyplatformLayer', this.tileset);
        this.basePlatformLayer = this.map.createLayer('baseplatformLayer', this.tileset);
        this.middlePlatformLayer = this.map.createLayer('middleplatformLayer', this.tileset);
        this.spikeLayer = this.map.createLayer('spikeLayer', this.tileset);
        this.darkBackgroundLayer = this.map.createLayer('darkBackgroundLayer', this.tileset);
        this.gate = this.map.createLayer('Gate', this.tileset);
        this.checkpoint = this.map.createLayer('Checkpoint', this.tileset);
        // Key still not loaded.
    
        this.physics.add.collider(this.player,this.middlePlatformLayer);
        this.physics.add.collider(this.player,this.basePlatformLayer);
        this.physics.add.collider(this.player,this.flyPlatformLayer);
        this.physics.add.collider(this.enemy,this.middlePlatformLayer);
        this.physics.add.collider(this.enemy,this.basePlatformLayerr);
        this.physics.add.collider(this.enemy,this.flyPlatformLayer);
        this.physics.add.collider(this.gate,this.middlePlatformLayer);
        this.physics.add.collider(this.gate,this.basePlatformLayer);
        this.physics.add.collider(this.gate,this.flyPlatformLayer);
        //this.physics.add.collider(this.key,this.middlePlatformLayer);
        //this.physics.add.collider(this.key,this.basePlatformLayer);
        //this.physics.add.collider(this.key,this.flyPlatformLayer);
        this.physics.add.overlap(this.player,this.spikeLayer,this.playerOnSpike);
        this.physics.add.overlap(this.player,this.checkpoint,this.playerOnCheckPoint);
        this.physics.add.overlap(this.player,this.enemy,this.playerIsHit);
        this.physics.add.overlap(this.player,this.gate,this.playerOnDoor);
    }
    
    update(){
      
    }

    playerIsHit(player, enemy, lastCheckpoint){
        /* If Player collide with the enemy, the Player HP is deducted by 1 and Teleport Player to the Last Checkpoint
            */ 
         playerHP -= 1;
         playerLastCheckpoint(player,lastCheckpoint);
        // 
    
    }
    
    playerOnSpike(player,spike, lastCheckpoint){
        /**
         * If Player collide with the spike, the Player HP is deducted by 1 and Teleport Player to the Last Checkpoint
         */
        playerHP -= 1 ;
        playerLastCheckpoint(player,lastCheckpoint);
    }
     playerOnCheckPoint(player, checkpoint){
        /* if player collide with a checkpoint, get the X and Y of the checkpoint
        */
         lastCheckpoint = checkpoint;
    
    }
    playerLastCheckpoint(player,lastCheckpoint){
        /*
         * Set Player X and Y to the last Checkpoint. 
         */
    
         player.x = lastCheckpoint.x;
         player.y = lastCheckpoint.y;
    }
    
    
     playerAttack(player, enemy){
        /*If Player sword collide with the enemy
         the enemy is destroyed and a score is added to the player.*/
        enemy.destroy();
        score += 1;
    }
    
     doorKeyCollected(player,key){
        /* Key is destroyed 
           and set doorKeInPlayer from false to true
           
           Add a key image on top right to indicate that the key is collected.
            */
    
         doorKey.destroy();
         doorKeyInPlayer = true;
        // Image Text Here....
    
    }
    // This need to be in the scenes.... or Also just try use If statement and assign numbers to the currentLevel like var currentLevel = 1; then using this
    // variable we can use If(currentLevel == 1){this.scene.start(level2)};
    // Remember number in coding start at 0 though we can start at 1 if you want cause global currentLevel gonna be in 0:D.
     playerOnDoor(player,gate){
        if(doorKeyInPlayer == true){
            this.scene.start('level2');
        }else{
            //Show A text that say "Key is not Collected."
            
        }
    }

}
 