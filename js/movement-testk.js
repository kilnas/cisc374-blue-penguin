
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });


WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    //active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Coming Soon']
    }

};


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

    game.load.image('background','../assets/tests/debug-grid-1920x1920.png');
    game.load.image('npc','../assets/sprites/sonic_havok_sanity.png')
    game.load.image('player','../assets/sprites/phaser-dude.png');

     game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
     game.load.image('pic', '../assets/skies/underwater3.png');

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





    var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 200, align: "center", backgroundColor: "#ffff00" };
    text2 = game.add.text(game.world.centerX - 40, game.world.centerY -50, "- text on a sprite -\ndrag me", style);
   text2.anchor.set(0.5);


   spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


}



function createText() {

    textBG = game.add.sprite(game.world.centerX, game.world.centerY, 'pic');
    textBG.scale.setTo(.8, .8);
    textBG.x = textBG.x - textBG.width/2;
    textBG.y = textBG.y - textBG.height/2;

    //textBG.alpha = 0;

    //game.add.tween(textBG).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);



    //roundRect = new Phaser.Graphics.drawRoundedRect(game.world.centerX, game.world.centerY, 500, 300, 5)
    text = game.add.text(game.world.centerX, game.world.centerY, '');

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
    //textBG.alpha = 1;
    //text.alpha = 0;


    //text.inputEnabled = true;

    nextLine();
    createTextFlag = true;
    game.input.onDown.addOnce(removeText, this);

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

    if (spacebar.isDown)
    {
      if(createTextFlag === false){
      createText();
    }
      //updateText();

      //text.alpha = 1;
      //textBG.alpha = 1;
    }

    //game.input.onDown.addOnce(updateText, this);

}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);
    //game.debug.geom(roundRect,'#000fff');

}


function removeText() {
  textBG.destroy();
  textBG.alpha = 0;
    text.destroy();
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
