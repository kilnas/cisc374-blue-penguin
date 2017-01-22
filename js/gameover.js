var gameOverState = {
  create: function(){

    //reset starting game variable to true, so we start from the beginning
    startingGame = true;
    
    //display the title of the game
    var name = game.add.text(80, 80, 'You Win!', { font: '50px Arial', fill: '#ffffff' });

    //text to show how to start the game
    var startLabel = game.add.text(80, 520,
                    "press the W key to play again", { font: "25px Arial", fill: "#ffffff" });
    var menuLabel = game.add.text(80, 440,
                    "press the X key to go to the main menu", { font: "25px Arial", fill: "#ffffff" });

    //ensure group is on top
    /*
    gameOverTextGroup = game.add.group();
    gameOverTextGroup.add(name);
    gameOverTextGroup.add(startLabel);
    gameOverTextGroup.add(menuLabel);
    game.world.bringToTop(gameOverTextGroup);

    console.log(gameOverTextGroup);
    */

    //define key
    var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    var xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);

    //when player hits the key, call start function
    wKey.onDown.addOnce(this.start, this);
    xKey.onDown.addOnce(this.menu, this);
  },

  start: function(){
    game.state.start('Main');
  },

  menu: function(){
    game.state.start('GameTitle');
  }
}
