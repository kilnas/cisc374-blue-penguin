var introState = {
  textIndex: 0,
  textBoxLength: null,
  introSlideText: null,


  create: function(){
    var labelButton = new LabelButton(game, 80, 520, "emptyButton", "Next", this.changeText, this);

    introSlideText = game.add.text(80, 80, intro2[0], {font: "25px Arial", fill: "#ffffff" });
    this.textBoxLength = intro2.length;
  },

  toMain: function(){
    // game.state.start("Main");
    console.log("fuck");
    game.state.start("Level1");

  },

  changeText: function(){
    console.log(this.textBoxLength);
    console.log(this.textIndex);
    if(this.textIndex == (this.textBoxLength-1)){
      // game.state.start("Main");
      console.log("fuck");

      game.state.start("Level1");

    }
    else{
      this.textIndex += 1;
      introSlideText.setText(intro2[this.textIndex]);
    }
  }

}
