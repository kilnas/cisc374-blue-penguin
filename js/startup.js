var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');


//declare Game object and other globals
var MonsterMystery = {

}

//----------VARIABLES ---------------------//
var w = 800; // game width
//var text = null;
//var text2;
var roundRect;
var spacebar;

var createTextFlag = false;
var menuTextGroup;
var gameOverTextGroup;
var playerX;
var playerY;
var startingGame = true;
var foundPerson = false;
var solvedTurtle = false;
//var grd;

content = ['hello darkness my old friend', "zz zzz zzzz zzzz zzz zzz z z z z z z z z z z zz zzzz zzzz zzzz zzzz zzzzz", 'you found a key', "orange peels"];
var intro = ['It has been 10 years since you have lost Powder, your pet turtle. Recently a string of turdel disappearances has occurred. You have gotten a lead that there has been some tertdl sightings at the Professor Pixel mansion. Unfortuneatly all the wanted pictures of missing turtuls are all distorted. It is up to you to match the tertols you find to their rightful owners.'];
var intro2 = ['It has been 10 years since you have lost Powder, your pet turtle.', "Recently a string of turdel disappearances has occured.", 'You have gotten a lead that there has been some tertdl sightings at the Professor Pixel mansion.', "Unfortuneatly all the wanted pictures of missing turtuls are all distorted.", 'It is up to you to match the tertols you find to their rightful owners'];

var sonictalk = ['HEY HAVE YOU SEEN MY MISSING TURTLE. I SAW TSOME TURNTLES. HELP.'];



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
var speech1;

var puzzle;
var completedPuzzle1 = false;


//-----------------HELPER FUNCTIONS---------------//
function collisionHandler (obj1, obj2) {

    if(foundPerson){
    player.tint = 0xdd0c39;

  //if(createTextFlag === false){
    //createText();
  //}

  // turtleText = new Textbox(game.camera.width / 2, game.camera.height / 2, obj2.message);
  // turtleText.createText();


  obj2.hitTurtle();
    }
    else{
        console.log("you havent talked to da person yet!");
    }

  //console.log(player.x);
}

function collisionHandler2 (obj1, obj2) {
  console.log('wall hit');
}

function collidePerson(obj1, obj2){
    if(!foundPerson){
        foundPerson = true;
        console.log("found sonic!");

        speech1 = new DialogueBox(game.camera.width/2, game.camera.height/2, sonictalk);
        speech1.createText();

        turtle.visible = true;
    }
}


function listener(){
  testImage.toggle();
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
    if (puzzle == null) {
        puzzle = new filterClass(game, 'turtlePic1');
        puzzle.setup();
    }

}


//-----------STATES-----------------//

game.state.add("Boot", bootState);
game.state.add("Preload", preloadState);
game.state.add("GameTitle", gameTitleState);
game.state.add("Intro", introState);
game.state.add("Main", mainState);
game.state.add("Image", imageState);
game.state.add("GameOver", gameOverState);
game.state.start("Boot");
