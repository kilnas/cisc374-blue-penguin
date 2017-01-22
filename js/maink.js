
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });



WebFontConfig = { // load custom google fonts
    google: {
      families: ['Coming Soon']
    }

};

//----------VARIABLES ---------------------//
var w = 800; // game width;

var roundRect;
var spacebar;

var createTextFlag = false;
//var grd;

var content = ['hello darkness my old friend', "zz zzz zzzz zzzz zzz zzz z z z z z z z z z z zz zzzz zzzz zzzz zzzz zzzzz", 'you found a key', "orange peels"];
var intro = ['It has been 10 years since you have lost Powder, your pet turtle. Recently a string of turdel disappearances has occurred. You have gotten a lead that there has been some tertdl sightings at the Professor Pixel mansion. Unfortuneatly all the wanted pictures of missing turtuls are all distorted. It is up to you to match the tertols you find to their rightful owners.'];
var intro2 = ['It has been 10 years since you have lost Powder, your pet turtle.', "Recently a string of turdel disappearances has occured.", 'You have gotten a lead that there has been some tertdl sightings at the Professor Pixel mansion.', "Unfortuneatly all the wanted pictures of missing turtuls are all distorted.", 'It is up to you to match the tertols you find to their rightful owners'];




function preload() {

    game.load.image('phaser', 'assets/sprites/phaser2.png');
    game.load.script('filterX', 'js/lib/filters/BlurX.js');
    game.load.script('filterY', 'js/lib/filters/BlurY.js');
    game.load.script('gray', 'js/lib/filters/Gray.js');

    game.load.image('background','images/darkback.jpg'); //assets/tests/debug-grid-1920x1920.png
    game.load.image('npc','assets/sprites/sonic_havok_sanity.png')
    game.load.image('player','assets/sprites/phaser-dude.png');

    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.image('pic', 'assets/skies/underwater3.png');
    game.load.audio('noir1', 'images/DancesandDames.mp3');
    game.load.image('wall','images/wall.jpg');
    game.load.image('turtle','images/turtle.png');
}


var sprites;
var cursors;
var testImage;

var player;
var npc;
var turtle;
var cursors;
var inBound;


var introText;
var music;
var mute_label;

var l;
var wallGroup;
var ufo;
var turtleText;



function create() {



    music = game.add.audio('noir1');

     music.play();



    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(50, game.world.centerY, 'player');
    npc = game.add.sprite(game.world.centerX/2, game.world.centerY/2, 'npc');


    //turtle = game.add.sprite(game.world.centerX/2 - 90, game.world.centerY/2 + 90, 'turtle');
    turtle = new Turtle(80, 40, game, 'turtle', content);

    introText = new Textbox(game.camera.width / 2, game.camera.height / 2, intro);
    turtleText = new Textbox(game.camera.width / 2, game.camera.height / 2, content);

    //game.physics.p2.enable(player);
    game.physics.enable([player,npc], Phaser.Physics.ARCADE);
    npc.body.immovable = true;
    player.fixedRotation = true;

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);


    game.physics.enable([turtle], Phaser.Physics.ARCADE);
    turtle.body.immovable = true;



    wallGroup = game.add.physicsGroup();


   //ufo = game.add.tileSprite(200, 240, 100, 20, 'wall');
   //wallGroup.add(ufo);


   var level = [
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'x                                                       x',
    'x                                                    x',
    'x                                                x',
    'x                                             x',
    'x              x                               x',
    'x              x                              x',
    'x              x                                 x',
    '            x              x                    x',
    '       x              x                                x',
    '           x              x                                x',
    '             x              x                                x',
    '                                         x              x',
    '                          x              x          x',
    'x                                                        x',
    'x                                                        x',
    'x                                                        x',
    'x                                                       x',
    'x                                                        x',
    'x                                                       x',
    'x                                                       x',
    'x                                                       x',
    'x                                                      x',
    'x                                                      x',
    'x                                                       x',
    'x                                                     x',
    'x                                                   x',
    'x                                               x',
    'x                                                 x',
    'x                                                 x',
    'x                                                 x',
    'x                                                  x',
    'x                                                  x',
    'x                                                 x',
    'x                                                   x',
    'x                                               x',
    'x                                                x',
    'x                                               x',
    'x                                               x',
    'x                                             x',
    'x                                            x',
    'x                                            x',
    'x                                            x',
    'x                                            x',
    'x                                            x',
    'x                                            x',
    'x                                            x',
    'x                                            x',
    'x                                                  x',
    'x                                                   x',
    'x                                                  x',
    'xxx           xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
];


for (var i = 0; i < level.length; i++) {
    for (var j = 0; j < level[i].length; j++) {

        // Create a wall and add it to the 'walls' group
        if (level[i][j] == 'x') {
            var wall = game.add.sprite(32+32*j, 32+32*i, 'wall');
            wallGroup.add(wall);
            wall.body.immovable = true;
        }
      }
    }


 spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);



//--- START/RESTART

restart_label = game.add.text(w - 100, 20, 'Restart', { font: '20px Arial', fill: '#fff' });
   restart_label.inputEnabled = true;

   restart_label.events.onInputUp.add(function () {
       // When the paus button is pressed, we pause the game
       //game.paused = true;

       console.log('meow');

       this.game.state.start(game);

       // Then add the menu
      // menu = game.add.sprite(w/2, h/2, 'menu');
      // menu.anchor.setTo(0.5, 0.5);
   });

restart_label.fixedToCamera = true;

mute_label = game.add.text(w - 100, 40, 'Mute', { font: '20px Arial', fill: '#fff' });
  mute_label.inputEnabled = true;
  mute_label.fixedToCamera = true;

mute_label.events.onInputUp.add(function () {

     if(music.mute == false){
       music.mute = true;
     }else{
       music.mute = false;
     }
      //game.input.onDown.add(changeVolume, this);
});


}


function collisionHandler (obj1, obj2) {


    //if(createTextFlag === false){
    //createText();


    //introText.createText();
    turtleText = new Textbox(game.camera.width / 2, game.camera.height / 2, obj2.message);
    turtleText.createText();


    obj2.hitTurtle();


    //}
}




function collisionHandler2 (obj1, obj2) {
  console.log('wall hit');
}

function update(){

    player.body.velocity.setTo(0, 0);
    player.body.angularVelocity = 0;

    /*
   wallGroup.forEach(function(wall) {
        //game.physics.arcade.collide(pla, platforms);
        wall.body.immovable = true;
    }, this);
    */

    game.physics.arcade.collide(player, turtle, collisionHandler, null, this);
    game.physics.arcade.collide(player, wallGroup, collisionHandler2, null, this);



    //Touch Based Movement
    //ActivePointer should be mouse OR finger, depending on device

    if(createTextFlag == false){// if text box not up, move //&& inBound = true
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



  if (spacebar.isDown)
  {
    //introText.removeText();
    turtleText.removeText();
  }
}



function render() {

    //game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.spriteCoords(player, 32, 500);

}
