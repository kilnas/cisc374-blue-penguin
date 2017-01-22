var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');


//declare Game object and other globals
var MonsterMystery = {

}

//----------VARIABLES ---------------------//
var w = 800; // game width
var text = null;
var text2;
var roundRect;
var spacebar;
var textBG;
var createTextFlag = false;
var menuTextGroup;
var gameOverTextGroup;
var playerX;
var playerY;
var startingGame = true;
//var grd;

content = ['hello darkness my old friend', "zz zzz zzzz zzzz zzz zzz z z z z z z z z z z zz zzzz zzzz zzzz zzzz zzzzz", 'you found a key', "orange peels"];
var intro = ['It has been 10 years since you have lost Powder, your pet turtle. Recently a string of turdel disappearances has occurred. You have gotten a lead that there has been some tertdl sightings at the Professor Pixel mansion. Unfortuneatly all the wanted pictures of missing turtuls are all distorted. It is up to you to match the tertols you find to their rightful owners.'];
var intro2 = ['It has been 10 years since you have lost Powder, your pet turtle.', "Recently a string of turdel disappearances has occured.", 'You have gotten a lead that there has been some tertdl sightings at the Professor Pixel mansion.', "Unfortuneatly all the wanted pictures of missing turtuls are all distorted.", 'It is up to you to match the tertols you find to their rightful owners'];

var line = [];
var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;

var sprites;
var cursors;
var testImage;
var testImage2;

var player;
var npc;
var cursors;
var inBound;
var turtle;
var introText;
var music;
var mute_label;
var l;
var wallGroup;
var ufo;
var turtleText;

var problem;
var onProblem;


//-----------------HELPER FUNCTIONS---------------//
function collisionHandler (obj1, obj2) {

  player.tint = 0xdd0c39;

  //if(createTextFlag === false){
    //createText();
  //}

  turtleText = new Textbox(game.camera.width / 2, game.camera.height / 2, obj2.message);
  turtleText.createText();


  obj2.hitTurtle();

  //console.log(player.x);
}

function collisionHandler2 (obj1, obj2) {
  console.log('wall hit');
}



function listener(){
  testImage.toggle();
}



function createText() {

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
  game.input.onDown.addOnce(removeText, this);


}



function removeText() {
  if(!(typeof textBG === "undefined")){
    textBG.destroy();
    textBG.alpha = 0;
      text.destroy();
      createTextFlag = false;
      // if(game.paused == true){
      //   game.paused = false;
      // }
  }

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

//method to compare if two images are filtered the same way
function compareImages(firstImage, secondImage){
  console.log("compare images");
  console.log(firstImage);
  console.log(secondImage);

  //test for array comparisons
  var arr1 = firstImage.filters;
  var arr2 = secondImage.filters;

  if (firstImage.key != secondImage.key){
    return false;
  }

  //neither image is filtered
  if (arr1 == null && arr2 == null){
    return true;
  }
  else if (arr1 == null || arr2 == null){
    return false;
  }

  if (arr1.length != arr2.length){
    return false;
  }

  //if here, we know that they are both arrays so we can sort them
  arr1 = arr1.sort();
  arr2 = arr2.sort();



  for (var i = arr1.length; i--;) {
    if(arr1[i] != arr2[i]){
      return false;
    }
  }



  return true;

}


function displayImages(obj1, obj2) {
    if (problem == null) {
        problem = new filterClass(game, 'turtle');
        problem.setup();
        onProblem = true;
    }

}


//-----------STATES-----------------//

game.state.add("Boot", bootState);
game.state.add("Preload", preloadState);
game.state.add("GameTitle", gameTitleState);
game.state.add("Main", mainState);
game.state.add("Image", imageState);
game.state.add("GameOver", gameOverState);
game.state.start("Boot");
