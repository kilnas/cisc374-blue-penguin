
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

MonsterMystery = {

}

function preload() {

    game.load.spritesheet('spinner', 'assets/sprites/bluemetal_32x32x4.png', 32, 32);
    game.load.image('phaser', 'assets/sprites/phaser2.png');
    game.load.script('filterX', 'js/lib/filters/BlurX.js');
    game.load.script('filterY', 'js/lib/filters/BlurY.js');
    game.load.script('gray', 'js/lib/filters/Gray.js');

}


var sprites;
var cursors;
var testImage;



function create() {


    // var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'phaser');
    // logo.anchor.setTo(0.5, 0.5);

    var blurX = game.add.filter('BlurX');
    var blurY = game.add.filter('BlurY');
    var gray = game.add.filter('Gray');

    blurX.blur = 100;
    blurY.blur = 1;

	// logo.filters = [blurX, blurY, gray];
    //  Here we create a group, populate it with sprites, give them all a random velocity
    //  and then check the group against itself for collision

    sprites = game.add.physicsGroup(Phaser.Physics.ARCADE);


    testImage = new MonsterMystery.GameImage(game, 'phaser', game.world.centerX, game.world.centerY, gray);
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
    game.physics.arcade.collide(sprites);


}
