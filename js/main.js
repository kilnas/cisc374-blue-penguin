
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

MonsterMystery = {

}



WebFontConfig = { // load custom google fonts
    google: {
      families: ['Coming Soon']
    }

};

//----------VARIABLES ---------------------//

var text = null;
var text2;
var roundRect;
var spacebar;
var textBG;
var createTextFlag = false;
//var grd;

content = ['hello darkness my old friend', "zz zzz zzzz zzzz zzz zzz z z z z z z z z z z zz zzzz zzzz zzzz zzzz zzzzz", 'you found a key', "orange peels"];
var line = [];
var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;


function preload() {

    game.load.image('phaser', 'assets/sprites/phaser2.png');
    game.load.script('filterX', 'js/lib/filters/BlurX.js');
    game.load.script('filterY', 'js/lib/filters/BlurY.js');
    game.load.script('gray', 'js/lib/filters/Gray.js');

    game.load.image('background','assets/tests/debug-grid-1920x1920.png');
    game.load.image('npc','assets/sprites/sonic_havok_sanity.png')
    game.load.image('player','assets/sprites/phaser-dude.png');

    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.image('pic', '../assets/skies/underwater3.png');
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

  // text style for overlay
  var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 200, align: "center", backgroundColor: "#ffff00" };
  //text2 = game.add.text(game.world.centerX - 40, game.world.centerY -50, "PRESS SPACE", style);
 //text2.anchor.set(0.5);


 spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);


}


function update(){
    //player.body.setZeroVelocity();
    player.body.velocity.setTo(0, 0);
    player.body.angularVelocity = 0;

    game.physics.arcade.collide(player, npc, collisionHandler, null, this);


    //Touch Based Movement
    //ActivePointer should be mouse OR finger, depending on device

    if(createTextFlag == false){// if text box not up, move
      if (game.input.activePointer.isDown)
      {
          //  400 is the speed it will move towards the touch
          game.physics.arcade.moveToPointer(player, 400);

          //  if it's overlapping the touch, don't move any more
          if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
          {
              player.body.velocity.setTo(0, 0);
          }
      }
      else
      {
          player.body.velocity.setTo(0, 0);
      }
  }



/*
 Arrow Key Movement (Old)
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
    }*/


    if (spacebar.isDown)
    {
      removeText();
    }



}

function collisionHandler (obj1, obj2) {
    console.log("collision handler!");
    player.tint = 0xdd0c39;
    npc.tint = 0xdd0c39;

    if(createTextFlag === false){
    createText();
    }

    //console.log(player.x);
}

function render() {

    //game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.spriteCoords(player, 32, 500);

}



function createText() {

    //game.paused = true;
    textBG = game.add.sprite(player.x, player.y, 'pic');
    textBG.scale.setTo(.8, .8);
    textBG.x = textBG.x - textBG.width/2;
    textBG.y = textBG.y - textBG.height/2;

    textBG.alpha = .8;

    //game.add.tween(textBG).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);



    //roundRect = new Phaser.Graphics.drawRoundedRect(game.world.centerX, game.world.centerY, 500, 300, 5)
    text = game.add.text(player.x, player.y, '');

    text.anchor.setTo(0.5);



    text.font = 'Coming Soon';
    text.fontSize = 30;
    text.backgroundColor = '#ffff00';

    //  x0, y0 - x1, y1
    //grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
    //grd.addColorStop(0, '#8ED6FF');
    //grd.addColorStop(1, '#004CB3');
    text.fill = '#FFFFFF';

    text.align = 'center';
    text.stroke = '#000000';
    text.strokeThickness = 2;
    text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
    text.wordWrap = true;
    text.wordWrapWidth = 500;


    //text.inputEnabled = true;

    nextLine();
    createTextFlag = true;
    //game.input.onDown.addOnce(removeText, this);




}



function removeText() {
  textBG.destroy();
  textBG.alpha = 0;
    text.destroy();
    createTextFlag = false;
    // if(game.paused == true){
    //   game.paused = false;
    // }
}

function updateText(){
  nextLine();
  textBG.alpha = 1;
  console.log("potato");
}


function nextLine() {

    if (lineIndex === content.length)
    {
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line = content[lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(wordDelay, line.length, nextWord, this);

    //  Advance to the next line
    lineIndex++;

}

function nextWord() {

    //  Add the next word onto the text string, followed by a space
    text.text = text.text.concat(line[wordIndex] + " ");

    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        text.text = text.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay, nextLine, this);
    }

}
