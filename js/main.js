
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

MonsterMystery = {

}

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser2.png');
    game.load.script('filterX', 'js/lib/filters/BlurX.js');
    game.load.script('filterY', 'js/lib/filters/BlurY.js');
    game.load.script('gray', 'js/lib/filters/Gray.js');

    game.load.image('background','assets/tests/debug-grid-1920x1920.png');
    game.load.image('npc','assets/sprites/sonic_havok_sanity.png')
    game.load.image('player','assets/sprites/phaser-dude.png');

}


var sprites;
var cursors;
var testImage;

var player;
var npc;
var cursors;



function create() {



    // var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'phaser');
    // logo.anchor.setTo(0.5, 0.5);

    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    npc = game.add.sprite(game.world.centerX/2, game.world.centerY/2, 'npc');

    //game.physics.p2.enable(player);
    game.physics.enable([player,npc], Phaser.Physics.ARCADE);
    npc.body.immovable = true;
    player.fixedRotation = true;

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);


   var blurX = game.add.filter('BlurX');
   var blurY = game.add.filter('BlurY');
   var gray = game.add.filter('Gray');


    blurX.blur = 100;
    blurY.blur = 1;


	// logo.filters = [blurX, blurY, gray];
    //  Here we create a group, populate it with sprites, give them all a random velocity
    //  and then check the group against itself for collision



    testImage = new MonsterMystery.GameImage(game, 'phaser', game.world.centerX/2 + 300, game.world.centerY/2, gray);
    // testImage.toggle();
    // console.log(testImage);
    // testImage.toggle();



/*
    for (var i = 0; i < 90; i++)
    {
        var s = sprites.create(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'spinner');
        s.animations.add('spin', [0, 1, 2, 3]);
        s.play('spin', 20, true);
        s.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
    }

    sprites.setAll('body.collideWorldBounds', true);
    sprites.setAll('body.bounce.x', 1);
    sprites.setAll('body.bounce.y', 1);

  */

}


function update(){

    //player.body.setZeroVelocity();
    player.body.velocity.setTo(0, 0);
    player.body.angularVelocity = 0;

    game.physics.arcade.collide(player, npc, collisionHandler, null, this);


    if (cursors.up.isDown)
    {
        //player.body.moveUp(300)
        player.body.velocity.y = -300;
    }
    else if (cursors.down.isDown)
    {
        //player.body.moveDown(300);
        player.body.velocity.y = 300;
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        //player.body.moveRight(300);
        player.body.velocity.x = 300;
    }


}

function collisionHandler (obj1, obj2) {
    console.log("collision handler!");
    player.tint = 0xdd0c39;
    npc.tint = 0xdd0c39;
}

function render() {

  game.debug.cameraInfo(game.camera, 32, 32);
  game.debug.spriteCoords(player, 32, 500);
}

function listener(){
  testImage.toggle();
}
