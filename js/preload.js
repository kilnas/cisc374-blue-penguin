var preloadState = {

  //preload function where we load all assets in assets folder
  preload: function(){
    game.load.image('phaser', 'assets/sprites/phaser2.png');
    game.load.script('filterX', 'js/lib/filters/BlurX.js');
    game.load.script('filterY', 'js/lib/filters/BlurY.js');
    game.load.script('gray', 'js/lib/filters/Gray.js');

    game.load.image('background','images/darkback.jpg');
    game.load.image('npc','assets/sprites/sonic_havok_sanity.png');
    game.load.image('player','assets/sprites/phaser-dude.png');


    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.image('pic', 'assets/skies/underwater3.png');
    game.load.audio('noir1', 'images/DancesandDames.mp3');
    game.load.image('wall','images/wall.jpg');
    game.load.image('turtle','images/turtle.png');
  },

  //sends us to the main menu
  create: function(){
    game.state.start("GameTitle");
  }

}
