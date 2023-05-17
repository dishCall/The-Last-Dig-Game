import TitleScene from './scenes/TitleScene.js';
import InstructionScene from './scenes/InstructionScene.js';
import CreditsScene from './scenes/CreditsScene.js';
import GameScene from './scenes/GameScene.js'
import GameScene2 from './scenes/GameScene2.js';
import GameScene3 from './scenes/GameScene3.js';
import GameOverScene from './scenes/GameOverScene.js';
import GameOverScene2 from './scenes/GameOverScene2.js';
import GameOverScene3 from './scenes/GameOverScene3.js';
import StageClearScene1 from './scenes/StageClearScene1.js';
import StageClearScene2 from './scenes/StageClearScene2.js';
import StageClearScene3 from './scenes/StageClearScene3.js';
import PauseScene from './scenes/PauseScene.js';
import PauseScene2 from './scenes/PauseScene2.js';
import PauseScene3 from './scenes/PauseScene3.js';


let titleScene = new TitleScene();
let instructionScene = new InstructionScene();
let creditsScene = new CreditsScene();
let gameScene = new GameScene();
let gameScene2 = new GameScene2();
let gameScene3 = new GameScene3();
let gameOverScene = new GameOverScene();
let gameOverScene2 = new GameOverScene2();
let gameOverScene3 = new GameOverScene3();
let stageClearScene1 = new StageClearScene1();
let stageClearScene2 = new StageClearScene2();
let stageClearScene3 = new StageClearScene3();
let pauseScene = new PauseScene();
let pauseScene2 = new PauseScene2();
let pauseScene3 = new PauseScene3();


let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 492,
    backgroundColor: "#D8FBFF",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },  
};

let game = new Phaser.Game(config);

game.scene.add('TitleScene', titleScene);
game.scene.add('InstructionScene', instructionScene);
game.scene.add('CreditsScene', creditsScene)
game.scene.add('GameScene', gameScene);
game.scene.add('GameScene2', gameScene2);
game.scene.add('GameScene3', gameScene3);
game.scene.add('GameOverScene', gameOverScene);
game.scene.add('GameOverScene2', gameOverScene2);
game.scene.add('GameOverScene3', gameOverScene3);
game.scene.add('StageClearScene1', stageClearScene1);
game.scene.add('StageClearScene2', stageClearScene2);
game.scene.add('StageClearScene3', stageClearScene3);
game.scene.add('PauseScene', pauseScene);
game.scene.add('PauseScene2', pauseScene2);
game.scene.add('PauseScene3', pauseScene3);

// Starting Scene
game.scene.start('TitleScene');



