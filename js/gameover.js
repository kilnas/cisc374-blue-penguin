var gameOverState = {
  create: function(){

    //reset starting game variable to true, so we start from the beginning
    startingGame = true;

    //display the title of the game
    var name = game.add.text(80, 80, 'You Win!', { font: '50px Arial', fill: '#ffffff' });

    var againButton = new LabelButton(game, game.math.roundTo(game.width/2), game.math.roundTo(game.height/2), "emptyButton", "Play Again", this.start, againButton);
    againButton.scale.setTo(2.0, 2.0);

    var menuButton = new LabelButton(game, game.math.roundTo(game.width/2), game.math.roundTo(game.height/2) - 100, "emptyButton", "Main Menu", this.menu, menuButton);
    menuButton.scale.setTo(2.0, 2.0);


  },

  start: function(){
    startingGame = true;
    solvedTurtle = false;
    completedPuzzle1 = false;
    foundPerson = false;
    game.state.start('Level0');
  },

  menu: function(){
    startingGame = true;
    solvedTurtle = false;
    completedPuzzle1 = false;
    foundPerson = false;
    game.state.start('GameTitle');
  }
}
