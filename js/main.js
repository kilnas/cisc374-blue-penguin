
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.spritesheet('spinner', 'assets/sprites/bluemetal_32x32x4.png', 32, 32);


}
