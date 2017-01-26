var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');


//declare Game object and other globals
var TurtleAdventure = new function(){
  this.createTextFlag = false;
  this.createDiaFlag = false;
  this.playerX;
  this.playerY;
  this.startingGame = true;
  this.foundPerson = false;
  this.solvedTurtle = false;

  this.Level1 = new function() {
    this.foundPerson = false;
    this.solvedTurtle = false;
    this.compltetedPuzzle1 = false;
  }

}

//----------VARIABLES ---------------------//
var w = 800; // game width
var spacebar;

var createTextFlag = false;
var createDiaFlag = false;
var playerX;
var playerY;
var startingGame = true;
var foundPerson = false;
var solvedTurtle = false;

content = ['hello darkness my old friend', "zz zzz zzzz zzzz zzz zzz z z z z z z z z z z zz zzzz zzzz zzzz zzzz zzzzz", 'you found a key', "orange peels"];

var intro = ['It has been 10 years since you have lost Powder, your pet turtle. Recently a string of turdel disappearances has occurred. You have gotten a lead that there has been some tertdl sightings at the Professor Pixel mansion. Unfortuneatly all the wanted pictures of missing turtuls are all distorted. It is up to you to match the tertols you find to their rightful owners.'];

var intro2 = ['It has been 10 years since you have lost Powder, your pet turtle.', "Recently a string of turdel disappearances has occured.", 'You have gotten a lead that there has been some tertdl sightings at the Professor Pixel mansion.', "Unfortuneatly all the wanted pictures of missing turtuls are all distorted.", 'It is up to you to match the tertols you find to their rightful owners'];

var sonictalk = ['HEY! Have you seen my missing turtle!?! I have not seen him in a week. I am not the only one either. Everyone I know has lost their turtles. Unfortunately all of their pictures in their missing turtle posters are messed up by some evil force.', 'HMM. There are a lot of turtles in this place. Take some missing turtle flyers. Tap twice to stop me from talking.'];

var npctalk = ['me: Im gonna help find and return these turtles.', 'me to me: Steal them and keep them all for yourself'];




var player;
var npc;
var cursors;
var inBound;
var turtle;
var introText;
var NpcTest;

var music;
var mute_label;
var wallGroup;
var turtleText;
var currentDialogue;

var puzzle;
var completedPuzzle1 = false;


function wallCollision (obj1, obj2) {
  //console.log('wall hit');
}

function collidePerson(obj1, obj2){
    if(!foundPerson){
        foundPerson = true;
        console.log("found sonic!");
        turtle.visible = true;
    }
  npcCollision(obj1, obj2);
}



//method to compare if two images are filtered the same way
function compareImages(firstImage, secondImage){
  console.log("compare images");
  console.log(firstImage);
  console.log(secondImage);

  //test for array comparisons
  var arr1 = firstImage.filters;
  var arr2 = secondImage.filters;

  var nameArr1 = [];
  var nameArr2 = [];
  for(var i = arr1.length; i--;){
    nameArr1.push(arr1[i].name);
    nameArr2.push(arr2[i].name);
  }

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
  arr1 = nameArr1.sort();
  arr2 = nameArr2.sort();



  for (var i = nameArr1.length; i--;) {
    if(arr1[i] != arr2[i]){
      return false;
    }
  }



  return true;

}

function onTap(pointer, doubleTap) {
  if (doubleTap)
  {
    //  They double-tapped, so swap the image
    if(createDiaFlag == true){
      console.log('ppppppppppp');
      currentDialogue.removeText();
    }
  }
}


//-----------STATES-----------------//

game.state.add("Boot", bootState);
game.state.add("Preload", preloadState);
game.state.add("GameTitle", gameTitleState);
game.state.add("Intro", introState);
game.state.add("Main", mainState);
game.state.add("Level1", Level1);
//game.state.add("Level0", Level0);
game.state.add("Image", imageState);
game.state.add("GameOver", gameOverState);
game.state.start("Boot");



var level = [
  '                                                       ',
  '                                                       ',
  '                                                       ',
  '                                                       ',
  '                              ',
  '                              ',
  '',
  '',
  '',
  '',
  '',
  '',
  '  ',
  '   ',
  ' ',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '              xxxxxxxxxxxxxxxxxxxxxxxx             ',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              x                      x',
  '              xxxxxxxxxx     xxxxxxxxx             ',
];
var level2 = [
 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
 'x              x                                      x',
 'x              x                                      x',
 'x              x                                      x',
 'x              x       x                              x',
 'x                      x                           xxxx',
 'x                      x                x          x',
 'x                      x                x          x',
 'xxxxxxxxxxxxxxxxxxxxxxxx                x          x',
 '                                        x          x',
 '                                        x          x',
 '                                        x          x',
 '                                        x          x',
 '                                        x          x',
 'x      xxxxxx          xxx    xxx       xxxxxxxxxxxx',
 'x         x            xxxx  xxxx                 x',
 'x         x             xxxxxxxx                  x',
 'x         x              xxxxxx                   x',
 'x      xxxxxx              xx                     x',
 'x                                                 x',
 'x                                                 x',
 'x                                                 x',
 'x      xxxxxx  x   x  xxxx  xxxxx  x     xxxxxxx  x',
 'x         x    x   x  x  x    x    x     x        x',
 'x         x    x   x  x x     x    x     xxxxx    x',
 'x         x     xxx   x  x    x    x     x        x',
 'x         x                        xxxxx xxxxx    x',
 'x         x                                       x',
 'x         x                                       x',
 'x         x                                       x',
 'x         x                                       x',
 'x         xxxxxxxxxxxxxx      xxxxxxxxxxxxxxxxxxxxx',
 'x         x            x      x                    ',
 'x         x            x      x                    ',
 'x         x            x      x           x        ',
 'x         xxxxxxx      x      x           x       x',
 'x         x                   x           x       x',
 'x         x                   xxxxxxxxxxxxx       x',
 'x         x                               x       x',
 'x         x                               x       x',
 'x       xxxxxxxxxxxxxxxx     xxxxxxxx     x       x',
 'x       x                    x            x       x',
 'x       x                    x            x       x',
 'x       x                    x            x       x',
 'x       x                    x            x       x',
 'x       x      xxxxxxxxx     x            x       x',
 'x                      x     x            x       x',
 'x                      x     xxxxxxxxxxxxxx       x',
 'x                      x                          x',
 'x                      x                          x',
 'x                      x                          x',
 'xxxxxxxxxxxxxxxxxxxxxxxx     xxxxxxxxxxxxxxxxxxxxxx',
];
