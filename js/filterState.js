var imageState = {

  create: function(){
    var name = game.add.text(80, 80, 'Try to solve the clue', { font: '50px Arial', fill: '#ffffff' });

    //text to show how to start the game
    var startLabel = game.add.text(80, 520,
                    "press the W key to go to game", {font: "25px Arial", fill: "#ffffff" });

    var puzzle = new filterClass(game, 'turtlePic1');
    puzzle.setup();

    //ensure text will be on top
    /*
    menuTextGroup = game.add.group();
    menuTextGroup.add(name);
    menuTextGroup.add(startLabel);
    game.world.bringToTop(menuTextGroup);

    console.log(menuTextGroup);
    */

    //define key
    var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

    //when player hits the key, call start function
    wKey.onDown.addOnce(this.toGame, this);
  },

  update: function(){

  },

  toGame: function(){
    game.state.start('GameOver');
    console.log('hello');
  }

}
