
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

MonsterMystery = {

}

function preload() {

    game.load.image('background','../assets/tests/debug-grid-1920x1920.png');
    game.load.image('npc','../assets/sprites/sonic_havok_sanity.png')
    game.load.image('player','../assets/sprites/phaser-dude.png');
    game.load.spritesheet('spinner', 'assets/sprites/bluemetal_32x32x4.png', 32, 32);
    game.load.image('phaser', 'assets/sprites/phaser2.png');
    game.load.script('filterX', 'js/lib/filters/BlurX.js');
    game.load.script('filterY', 'js/lib/filters/BlurY.js');
    game.load.script('gray', 'js/lib/filters/Gray.js');
}

var player;
var npc;
var cursors;

function create() {



    game.add.tileSprite(0, 0, 1920, 1920, 'background');

    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.P2JS);

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

    npc = game.add.sprite(game.world.centerX/2, game.world.centerY/2, 'npc');

    game.physics.p2.enable(player);

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);
    player.fixedRotation = true;


    var blurX = game.add.filter('BlurX');
    var blurY = game.add.filter('BlurY');
    var gray = game.add.filter('Gray');

     blurX.blur = 100;
     blurY.blur = 1;

    testImage = new MonsterMystery.GameImage(game, 'spinner', 50, 50, gray);
    console.log(testImage);
    testImage.toggle();

}

function update() {

    player.body.setZeroVelocity();



    if (cursors.up.isDown)
    {
        player.body.moveUp(300)
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(300);
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(300);
    }

}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}
