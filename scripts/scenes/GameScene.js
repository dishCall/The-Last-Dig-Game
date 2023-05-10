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
    }

    preload(){
        this.load.image('tileset', './assets/maps/Tilesheet.png');
        this.load.tilemapTiledJSON('map1', './assets/maps/map1.json');
      
 
    }

    
    create(){
        this.map = this.make.tilemap({key: 'map1'});
        this.tileSet = this.map.addTilesetImage('level3', 'tileset');
        this.flyPlatformLayer = this.map.createLayer('flyplatformLayer', this.tileset, 0, 60);
        this.basePlatformLayer = this.map.createLayer('baseplatformLayer', this.tileset, 0, 60);
        this.middlePlatformLayer = this.map.createLayer('middleplatformLayer', this.tileset, 0, 60);
        this.spikeLayer = this.map.createLayer('spikeLayer', this.tileset, 0, 60);
        this.darkBackgroundLayer = this.map.createLayer('darkBackgroundLayer', this.tileset, 0, 60);
        this.gate = this.map.createLayer('Gate', this.tileset, 0, 60);
        this.checkpoint = this.map.createLayer('Checkpoint', this.tileset, 0, 60);


    }
    
    update(){
      
    }

    

}
