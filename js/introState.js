var introState = {
  textIndex: 0,
  textBoxLength: null,
  introSlideText: null,


  create: function(){
    var labelButton = new LabelButton(game, 80, 520, "emptyButton", "Next", this.toMain, this); //changeText



    var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 700, align: "center", backgroundColor: "#ffff00" };
    //text2 = game.add.text(game.world.centerX - 40, game.world.centerY -50, "PRESS SPACE", style);
    //introSlideText = game.add.text(80, 80, intro2[0], {font: "25px Arial", fill: "#ffffff" });
    introSlideText = game.add.text(game.world.centerX - 40, game.world.centerY - 50, intro, style);
    introSlideText.anchor.set(0.5);
    //this.textBoxLength = intro.length;

  },

  toMain: function(){
    // game.state.start("Main");
    console.log(intro);
    solvedTurtle = false;
    completedPuzzle1 = false;
    foundPerson = false;
    game.state.start("Level0");

  },

  changeText: function(){
    console.log(this.textBoxLength);
    console.log(this.textIndex);
    if(this.textIndex == (this.textBoxLength-1)){
      // game.state.start("Main");

      game.state.start("Level0");

    }
    else{
      this.textIndex += 1;
      introSlideText.setText(intro2[this.textIndex]);
    }
  }

}
