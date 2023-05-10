export default class GameScene extends Phaser.Scene {
    constructor(){
        super('GameScene')
    }

    init(){
        
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


        //this.physics.add.collider(player,middleplatoformLayer);
        //this.physics.add.collider(player,baseplatformLayer);
        //this.physics.add.collider(player,flyplatformLayer);
        //this.physics.add.collider(enemy,middleplatoformLayer);
        //this.physics.add.collider(enemy,baseplatformLayer);
        //this.physics.add.collider(enemy,flyplatformLayer);
        this.physics.add.collider(this.gate,middleplatoformLayer);
        this.physics.add.collider(this.gate,baseplatformLayer);
        this.physics.add.collider(this.gate,flyplatformLayer);
        //this.physics.add.collider(key,middleplatoformLayer);
        //this.physics.add.collider(key,baseplatformLayer);
        //this.physics.add.collider(key,flyplatformLayer);
        this.physics.add.overlap(player,spikeLayer,playerOnSpike);
        this.physics.add.overlap(player,checkpoints,playerOnCheckPoint);
        this.physics.add.overlap(player,enemy,playerIsHit);
        this.physics.add.overlap(player,gate,playerOnDoor);
    }
    
    update(){
      
    }

    

}
function playerIsHit(player, enemy, lastCheckpoint){
    /* If Player collide with the enemy, the Player HP is deducted by 1 and Teleport Player to the Last Checkpoint
        */ 
     playerHP -= 1;
     playerLastCheckpoint(player,lastCheckpoint);
    // 

}

function playerOnSpike(player,spike, lastCheckpoint){
    /**
     * If Player collide with the spike, the Player HP is deducted by 1 and Teleport Player to the Last Checkpoint
     */
    playerHP -= 1 ;
    playerLastCheckpoint(player,lastCheckpoint);
}
function playerOnCheckPoint(player, checkpoint){
    /* if player collide with a checkpoint, get the X and Y of the checkpoint
    */
     lastCheckpoint = checkpoint;

}
function playerLastCheckpoint(player,lastCheckpoint){
    /*
     * Set Player X and Y to the last Checkpoint. 
     */

     player.x = lastCheckpoint.x;
     player.y = lastCheckpoint.y;
}


function playerAttack(player, enemy){
    /*If Player sword collide with the enemy
     the enemy is destroyed and a score is added to the player.*/


    enemy.destroy();
    score += 1;
}

function doorKeyCollected(player,key){
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
function playerOnDoor(player,door){
    if(doorKeyInPlayer == true){
        this.scene.start('level2');
    }else{
        //Show A text that say "Key is not Collected."
        
    }
}