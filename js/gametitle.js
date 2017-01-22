var gameTitleState = {

  create: function(){
    //display the title of the game
    var name = game.add.text(80, 80, 'Turtle Adventure', { font: '50px Arial', fill: '#ffffff' });

    //text to show how to start the game
    var startLabel = game.add.text(80, 520,
                    "press the W key to start", {font: "25px Arial", fill: "#ffffff" });

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
