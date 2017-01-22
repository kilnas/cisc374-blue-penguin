var gameTitleState = {

  create: function(){
    //display the title of the game
    var name = game.add.text(80, 80, 'Turtle Adventure', { font: '50px Arial', fill: '#ffffff' });

    //text to show how to start the game
    var startLabel = game.add.text(80, 520,
                    "Press button to start!", {font: "25px Arial", fill: "#ffffff" });

    var startButton = new LabelButton(game, game.math.roundTo(game.width/2), game.math.roundTo(game.height/2), "emptyButton", "START", this.start, startButton);
    startButton.scale.setTo(2.0, 2.0);

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
    wKey.onDown.addOnce(this.start, this);
  },

  start: function(){
    game.state.start('Intro');
  }

}
